import { useState, useEffect, useRef } from 'react';
import { Code2, CheckCircle2, Lightbulb, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { useBlobUrl, buildPreviewHtml } from '@/lib/preview';

interface CodingChallengeProps {
  title: string;
  description: string;
  initialCode: string;
  answer: string;
  hints?: string[];
  /** 重要なキーワード: これらが含まれていれば正解とみなす */
  keywords?: string[];
  validator?: (input: string) => boolean;
  /** プレビューを表示するか（tsx/jsx コードの場合） */
  preview?: boolean;
  css?: string;
}

/**
 * キーワードベースの緩い判定
 * - コード内の空白・改行を正規化
 * - 指定キーワードがすべて含まれているか
 * - キーワード未指定の場合は模範解答から重要トークンを自動抽出
 */
function fuzzyCheck(code: string, answer: string, keywords?: string[]): boolean {
  const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
  const normalizedCode = normalize(code);
  const normalizedAnswer = normalize(answer);

  // 完全一致ならもちろん正解
  if (normalizedCode === normalizedAnswer) return true;

  // キーワードが明示されている場合
  if (keywords && keywords.length > 0) {
    return keywords.every((kw) => normalizedCode.includes(kw));
  }

  // キーワード未指定: 模範解答から重要トークンを自動抽出
  // interface/type の宣言、関数名、型名、プロパティ名などを抽出
  const importantPatterns = [
    /interface\s+\w+/g,
    /type\s+\w+/g,
    /:\s*(?:string|number|boolean|ReactNode)/g,
    /\?\s*:/g,
    /'\w+'\s*\|/g,
    /\|\s*'\w+'/g,
  ];

  const tokens = new Set<string>();
  for (const pattern of importantPatterns) {
    const matches = answer.match(pattern);
    if (matches) matches.forEach((m) => tokens.add(normalize(m)));
  }

  // 抽出できなかった場合は模範解答の行を比較（50%以上一致で正解）
  if (tokens.size === 0) {
    const answerLines = normalizedAnswer.split(/[;\n]/).map(normalize).filter(Boolean);
    const matchCount = answerLines.filter((line) => normalizedCode.includes(line)).length;
    return matchCount >= Math.ceil(answerLines.length * 0.5);
  }

  // トークンの80%以上が含まれていれば正解
  const matchCount = Array.from(tokens).filter((t) => normalizedCode.includes(t)).length;
  return matchCount >= Math.ceil(tokens.size * 0.8);
}

export default function CodingChallenge({
  title,
  description,
  initialCode,
  answer,
  hints = [],
  keywords,
  validator,
  preview = false,
  css = '',
}: CodingChallengeProps) {
  const [code, setCode] = useState(initialCode);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [previewHtml, setPreviewHtml] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // プレビュー用 HTML をデバウンス生成
  useEffect(() => {
    if (!preview) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPreviewHtml(buildPreviewHtml(code, css));
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, css, preview]);

  // 初回プレビュー
  useEffect(() => {
    if (preview) setPreviewHtml(buildPreviewHtml(code, css));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blobUrl = useBlobUrl(previewHtml);

  const handleCheck = () => {
    if (validator) {
      setIsCorrect(validator(code));
    } else {
      setIsCorrect(fuzzyCheck(code, answer, keywords));
    }
  };

  const handleNextHint = () => {
    if (hintIndex < hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
    setShowHint(true);
  };

  const handleReset = () => {
    setCode(initialCode);
    setShowAnswer(false);
    setShowHint(false);
    setHintIndex(0);
    setIsCorrect(null);
  };

  return (
    <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 my-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
          <Code2 className="text-white" size={16} />
        </div>
        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
          コーディングチャレンジ
        </span>
      </div>

      <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>

      {/* エディタ + プレビュー */}
      <div className={`flex ${preview ? 'flex-col lg:flex-row' : 'flex-col'} gap-0 rounded-lg overflow-hidden border border-border bg-[#1e1e2e] mb-4`}>
        {/* エディタ */}
        <div className={`flex flex-col ${preview ? 'lg:w-1/2' : 'w-full'} min-w-0`}>
          <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-[#313244]">
            <span className="text-xs font-mono text-[#cdd6f4]/60 uppercase">エディタ</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setIsCorrect(null);
            }}
            spellCheck={false}
            wrap="off"
            className="w-full p-4 font-mono text-sm leading-relaxed bg-transparent text-[#cdd6f4] resize-none focus:outline-none min-h-[160px] overflow-auto whitespace-pre"
            rows={Math.max(6, code.split('\n').length + 1)}
          />
        </div>

        {/* プレビュー */}
        {preview && (
          <div className="flex flex-col min-w-0 lg:w-1/2 border-t lg:border-t-0 lg:border-l border-[#313244]">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-[#f8fafc] dark:bg-[#181825] border-b border-border dark:border-[#313244]">
              <Eye size={12} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Result</span>
            </div>
            <div className="bg-white flex-1 min-h-[160px]">
              <iframe
                src={blobUrl}
                sandbox="allow-scripts"
                title="プレビュー"
                className="w-full h-full border-0"
                style={{ minHeight: 160 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 結果表示 */}
      {isCorrect !== null && (
        <div
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg mb-4 ${
            isCorrect
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
          }`}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 size={18} />
              <span className="text-sm font-semibold">正解！素晴らしい！</span>
            </>
          ) : (
            <>
              <Code2 size={18} />
              <span className="text-sm font-semibold">もう少し！ヒントを確認してみましょう。</span>
            </>
          )}
        </div>
      )}

      {/* ヒント */}
      {showHint && hints.length > 0 && (
        <div className="px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb size={14} className="text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              ヒント {hintIndex + 1} / {hints.length}
            </span>
          </div>
          <p className="text-sm text-foreground/80">{hints[hintIndex]}</p>
        </div>
      )}

      {/* 模範解答 */}
      {showAnswer && (
        <div className="rounded-lg overflow-hidden border border-border bg-[#1e1e2e] mb-4">
          <div className="px-4 py-2 bg-[#181825] border-b border-[#313244]">
            <span className="text-xs font-mono text-emerald-400 uppercase">模範解答</span>
          </div>
          <pre className="p-4 font-mono text-sm leading-relaxed text-[#cdd6f4] overflow-x-auto whitespace-pre">
            {answer}
          </pre>
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCheck}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          チェックする
        </button>

        {hints.length > 0 && (
          <button
            onClick={handleNextHint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-sm hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
          >
            <Lightbulb size={14} />
            {showHint && hintIndex < hints.length - 1 ? '次のヒント' : 'ヒントを見る'}
          </button>
        )}

        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm hover:bg-muted transition-colors"
        >
          {showAnswer ? <EyeOff size={14} /> : <Eye size={14} />}
          {showAnswer ? '模範解答を隠す' : '模範解答を見る'}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <RotateCcw size={14} />
          リセット
        </button>
      </div>
    </div>
  );
}
