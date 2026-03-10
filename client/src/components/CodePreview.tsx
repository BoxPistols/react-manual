import { useState, useMemo, useEffect, useRef } from 'react';
import { Copy, Check, Eye, Code2, Maximize2, Minimize2 } from 'lucide-react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import { transform } from 'sucrase';

interface CodePreviewProps {
  /** コード文字列 */
  code: string;
  /** コードの言語 (tsx, css, html) */
  language?: string;
  /** タイトル */
  title?: string;
  /** 追加 CSS */
  css?: string;
  /** プレビューの高さ */
  previewHeight?: number;
  /** 行番号を表示するか */
  showLineNumbers?: boolean;
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
  previewHeight = 200,
  showLineNumbers = true,
  layout = 'horizontal',
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'both' | 'code' | 'preview'>('both');
  const blobUrlRef = useRef('');

  const previewHtml = useMemo(() => {
    if (language === 'css' || language === 'html') return '';
    return buildHtml(code, css);
  }, [code, css, language]);

  const blobUrl = useMemo(() => {
    if (!previewHtml) return '';
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    const url = URL.createObjectURL(new Blob([previewHtml], { type: 'text/html' }));
    blobUrlRef.current = url;
    return url;
  }, [previewHtml]);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prismLanguage = resolveLanguage(language);
  const canPreview = language === 'tsx' || language === 'jsx';

  const containerClass = isFullscreen
    ? 'fixed inset-0 z-50 bg-background flex flex-col'
    : 'rounded-xl overflow-hidden border border-border my-6';

  const isHorizontal = layout === 'horizontal' && !isFullscreen;

  return (
    <div className={containerClass}>
      {/* ヘッダー */}
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
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-[#313244] transition-colors"
            title="コピー"
          >
            {copied ? <Check size={13} className="text-[#a6e3a1]" /> : <Copy size={13} className="text-[#cdd6f4]/40" />}
          </button>
          {canPreview && (
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 rounded hover:bg-[#313244] text-[#cdd6f4]/40 hover:text-[#cdd6f4] transition-colors"
              title={isFullscreen ? '縮小' : '拡大'}
            >
              {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
          )}
        </div>
      </div>

      {/* メインエリア */}
      <div className={`flex ${isFullscreen ? 'flex-1' : ''} ${
        isHorizontal && viewMode === 'both' ? 'flex-col lg:flex-row' : 'flex-col'
      }`}>
        {/* コード */}
        {viewMode !== 'preview' && (
          <div className={`${viewMode === 'both' && isHorizontal ? 'lg:w-1/2' : 'w-full'} ${isFullscreen ? 'flex-1 overflow-auto' : ''}`}>
            <Highlight theme={themes.vsDark} code={code.trim()} language={prismLanguage}>
              {({ tokens, getLineProps, getTokenProps }) => (
                <div className="overflow-x-auto bg-[#1e1e2e]">
                  <pre className="p-4 font-mono text-[13px] leading-relaxed m-0" style={!isFullscreen && canPreview ? { maxHeight: previewHeight + 40, overflow: 'auto' } : undefined}>
                    {tokens.map((line, i) => {
                      const lineProps = getLineProps({ line, key: i });
                      return (
                        <div key={i} {...lineProps} className="flex">
                          {showLineNumbers && (
                            <span className="inline-block w-8 text-right pr-3 text-[#6c7086] select-none flex-shrink-0 text-xs leading-relaxed">
                              {i + 1}
                            </span>
                          )}
                          <span className="flex-1">
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                          </span>
                        </div>
                      );
                    })}
                  </pre>
                </div>
              )}
            </Highlight>
          </div>
        )}

        {/* プレビュー */}
        {canPreview && viewMode !== 'code' && (
          <div className={`${viewMode === 'both' && isHorizontal ? 'lg:w-1/2 lg:border-l' : 'border-t'} border-[#313244] ${isFullscreen ? 'flex-1' : ''}`}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f8fafc] dark:bg-[#1e1e2e] border-b border-border dark:border-[#313244]">
              <Eye size={11} className="text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Result</span>
            </div>
            <div className="bg-white" style={!isFullscreen ? { height: previewHeight } : { flex: 1 }}>
              <iframe
                src={blobUrl}
                title="プレビュー"
                className="w-full h-full border-0"
                style={{ minHeight: previewHeight }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
