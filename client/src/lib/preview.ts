import { useState, useEffect, useRef, useCallback } from 'react';
import { transform } from 'sucrase';

/**
 * import 文と export キーワードを除去し、プレビュー用に整形する
 */
function stripModuleSyntax(code: string): string {
  return code
    .replace(/^import\s+.*$/gm, '')
    .replace(/^export\s+default\s+/gm, '')
    .replace(/^export\s+/gm, '');
}

/**
 * コードから最初の PascalCase 関数コンポーネント名を検出する
 */
function detectComponentName(code: string): string {
  const match = code.match(/function\s+([A-Z][A-Za-z0-9]*)/);
  return match?.[1] ?? 'App';
}

/**
 * JSX/TSX コードを iframe 用 HTML に変換する
 */
export function buildPreviewHtml(jsxCode: string, cssCode: string, isDark = false): string {
  const cleanedCode = stripModuleSyntax(jsxCode);
  const componentName = detectComponentName(cleanedCode);

  let transpiledCode = '';
  let errorMessage = '';

  try {
    const result = transform(cleanedCode, {
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
<script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Work Sans',system-ui,sans-serif;padding:20px;background:${isDark ? '#1e1e2e' : '#fff'};color:${isDark ? '#cdd6f4' : '#1f2937'};line-height:1.6;}
${cssCode}
</style></head><body>
<div id="root"></div>
<script>
try{
  var {useState,useEffect,useRef,useCallback,useMemo,useReducer,useContext,createContext}=React;
  ${transpiledCode}
  if(typeof ${componentName}!=='undefined'){
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${componentName}));
  }
}catch(e){
  document.getElementById('root').innerHTML=
    '<div style="color:#ef4444;padding:16px;font-size:13px;font-family:monospace;">'+
    '<strong>Error:</strong> '+e.message.replace(/</g,'&lt;')+'</div>';
}
<\/script></body></html>`;
}

/**
 * プレビュー HTML を blob URL で管理するフック
 * useMemo 内の副作用を排除し、useEffect で安全に管理する
 */
export function useBlobUrl(html: string): string {
  const [blobUrl, setBlobUrl] = useState('');
  const blobUrlRef = useRef('');

  useEffect(() => {
    if (!html) {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = '';
      }
      setBlobUrl('');
      return;
    }
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    // 前の URL を revoke
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = url;
    setBlobUrl(url);

    return () => {
      URL.revokeObjectURL(url);
      blobUrlRef.current = '';
    };
  }, [html]);

  return blobUrl;
}

/**
 * デバウンス付きプレビュー生成フック
 */
export function useDebouncedPreview(
  code: string,
  css: string,
  canPreview: boolean,
  delay = 300,
  isDark = false,
): string {
  const [previewHtml, setPreviewHtml] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const build = useCallback(() => {
    if (!canPreview) {
      setPreviewHtml('');
      return;
    }
    setPreviewHtml(buildPreviewHtml(code, css, isDark));
  }, [code, css, canPreview, isDark]);

  // 初回即時実行
  useEffect(() => {
    build();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 以降はデバウンス
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(build, delay);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [build, delay]);

  return previewHtml;
}
