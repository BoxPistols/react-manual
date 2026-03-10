import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Copy, Check, Eye, Code2, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import { transform } from 'sucrase';

interface CodePreviewProps {
  /** 初期コード文字列 */
  code: string;
  /** コードの言語 (tsx, css, html) */
  language?: string;
  /** タイトル */
  title?: string;
  /** 追加 CSS */
  css?: string;
  /** プレビューの高さ */
  previewHeight?: number;
  /** レイアウト方向 */
  layout?: 'horizontal' | 'vertical';
}

const languageMap: Record<string, Language> = {
  ts: 'typescript', tsx: 'tsx', js: 'javascript', jsx: 'jsx',
  html: 'markup', css: 'css', json: 'json', bash: 'bash',
};

function resolveLanguage(lang: string): Language {
  return languageMap[lang.toLowerCase()] ?? (lang.toLowerCase() as Language);
}

function buildHtml(jsxCode: string, cssCode: string): string {
  let transpiledCode = '';
  let errorMessage = '';

  try {
    const result = transform(jsxCode, {
      transforms: ['jsx', 'typescript'],
      jsxRuntime: 'classic',
      production: false,
    });
    transpiledCode = result.code;
  } catch (e: unknown) {
    errorMessage = e instanceof Error ? e.message : String(e);
  }

  if (errorMessage) {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>body{font-family:system-ui;margin:0;padding:16px;background:#1e1e2e;color:#f38ba8;}
pre{white-space:pre-wrap;font-size:13px;line-height:1.5;}</style></head>
<body><pre>${errorMessage.replace(/</g, '&lt;')}</pre></body></html>`;
  }

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Work Sans',system-ui,sans-serif;padding:16px;background:#fff;color:#1f2937;line-height:1.6;}
${cssCode}
</style></head><body>
<div id="root"></div>
<script>
try{
  ${transpiledCode}
  if(typeof App!=='undefined'){
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
  }
}catch(e){
  document.getElementById('root').innerHTML=
    '<div style="color:#ef4444;padding:16px;font-size:13px;font-family:monospace;">'+
    '<strong>Error:</strong> '+e.message.replace(/</g,'&lt;')+'</div>';
}
</script></body></html>`;
}

export default function CodePreview({
  code,
  language = 'tsx',
  title,
  css = '',
  previewHeight = 320,
  layout = 'horizontal',
}: CodePreviewProps) {
  const [editableCode, setEditableCode] = useState(code);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'both' | 'code' | 'preview'>('both');
  const blobUrlRef = useRef('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [previewHtml, setPreviewHtml] = useState('');
  const highlightRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isModified = editableCode !== code;
  const prismLanguage = resolveLanguage(language);
  const canPreview = language === 'tsx' || language === 'jsx';
  const isHorizontal = layout === 'horizontal';

  // デバウンス付きプレビュー生成
  const buildPreview = useCallback(() => {
    if (language === 'css' || language === 'html') {
      setPreviewHtml('');
      return;
    }
    setPreviewHtml(buildHtml(editableCode, css));
  }, [editableCode, css, language]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(buildPreview, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [buildPreview]);

  useEffect(() => { buildPreview(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  // Blob URL 管理
  const blobUrl = useMemo(() => {
    if (!previewHtml) return '';
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    const url = URL.createObjectURL(new Blob([previewHtml], { type: 'text/html' }));
    blobUrlRef.current = url;
    return url;
  }, [previewHtml]);

  useEffect(() => {
    return () => { if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current); };
  }, []);

  const handleReset = () => setEditableCode(code);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // textarea ↔ highlight のスクロール同期
  const handleScroll = () => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Tab キーでインデント挿入
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = editableCode.substring(0, start) + '  ' + editableCode.substring(end);
      setEditableCode(newCode);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  };

  // コードエディタパネル
  const codePanel = viewMode !== 'preview' ? (
    <div className={`${viewMode === 'both' && isHorizontal ? (isExpanded ? 'w-1/2' : 'lg:w-1/2') : 'w-full'} flex flex-col min-w-0`}>
      <div
        className="relative flex-1"
        style={!isExpanded ? { height: previewHeight, maxHeight: previewHeight } : { flex: 1 }}
      >
        {/* シンタックスハイライト層 */}
        <div
          ref={highlightRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <Highlight theme={themes.vsDark} code={editableCode} language={prismLanguage}>
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className="p-4 font-mono text-[13px] leading-[1.6] m-0 bg-[#1e1e2e] min-h-full" style={{ tabSize: 2 }}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });
                  return (
                    <div key={i} {...lineProps}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        </div>
        {/* 編集可能 textarea 層 */}
        <textarea
          ref={textareaRef}
          value={editableCode}
          onChange={(e) => setEditableCode(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="absolute inset-0 w-full h-full p-4 font-mono text-[13px] leading-[1.6] bg-transparent text-transparent caret-white resize-none focus:outline-none selection:bg-blue-500/30 overflow-auto z-10"
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  ) : null;

  // プレビューパネル
  const previewPanel = canPreview && viewMode !== 'code' ? (
    <div className={`${viewMode === 'both' && isHorizontal ? (isExpanded ? 'w-1/2 border-l' : 'lg:w-1/2 lg:border-l border-t lg:border-t-0') : 'border-t'} border-[#313244] flex flex-col min-w-0`}>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f8fafc] dark:bg-[#1e1e2e] border-b border-border dark:border-[#313244] shrink-0">
        <Eye size={11} className="text-muted-foreground" />
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Result</span>
      </div>
      <div className="bg-white flex-1" style={!isExpanded ? { height: previewHeight } : undefined}>
        <iframe
          src={blobUrl}
          title="プレビュー"
          className="w-full h-full border-0"
          style={{ minHeight: isExpanded ? undefined : previewHeight }}
        />
      </div>
    </div>
  ) : null;

  const headerBar = (
    <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-[#313244]">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f9e2af]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
        </div>
        {title && (
          <span className="text-xs font-medium text-[#cdd6f4] ml-2">{title}</span>
        )}
        {language && (
          <span className="text-[10px] font-mono text-[#cdd6f4]/40 uppercase">{language}</span>
        )}
      </div>
      <div className="flex items-center gap-1">
        {canPreview && (
          <>
            <button
              onClick={() => setViewMode(viewMode === 'code' ? 'both' : 'code')}
              className={`p-1 rounded hover:bg-[#313244] transition-colors ${viewMode === 'code' ? 'text-blue-400' : 'text-[#cdd6f4]/40'}`}
              title="コード"
            >
              <Code2 size={13} />
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'preview' ? 'both' : 'preview')}
              className={`p-1 rounded hover:bg-[#313244] transition-colors ${viewMode === 'preview' ? 'text-blue-400' : 'text-[#cdd6f4]/40'}`}
              title="プレビュー"
            >
              <Eye size={13} />
            </button>
          </>
        )}
        {isModified && (
          <button
            onClick={handleReset}
            className="p-1 rounded hover:bg-[#313244] text-[#f9e2af] hover:text-[#f9e2af] transition-colors"
            title="リセット"
          >
            <RotateCcw size={13} />
          </button>
        )}
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-[#313244] transition-colors"
          title="コピー"
        >
          {copied ? <Check size={13} className="text-[#a6e3a1]" /> : <Copy size={13} className="text-[#cdd6f4]/40" />}
        </button>
        {canPreview && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-[#313244] text-[#cdd6f4]/40 hover:text-[#cdd6f4] transition-colors"
            title={isExpanded ? '縮小' : '拡大'}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        )}
      </div>
    </div>
  );

  const mainArea = (
    <div className={`flex ${isExpanded ? 'flex-1 min-h-0' : ''} ${
      isHorizontal && viewMode === 'both'
        ? (isExpanded ? 'flex-row' : 'flex-col lg:flex-row')
        : 'flex-col'
    }`}>
      {codePanel}
      {previewPanel}
    </div>
  );

  return (
    <>
      {/* 通常表示 */}
      <div className="rounded-xl overflow-hidden border border-border my-6">
        {headerBar}
        {!isExpanded && mainArea}
      </div>

      {/* ダイアログ（拡大時） */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" onClick={() => setIsExpanded(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-7xl h-[90vh] rounded-xl overflow-hidden border border-[#313244] bg-[#1e1e2e] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {headerBar}
            {mainArea}
          </div>
        </div>
      )}
    </>
  );
}
