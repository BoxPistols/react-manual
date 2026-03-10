import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-slate-900 text-slate-100">
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            {language && (
              <span className="text-xs font-mono text-slate-200 uppercase">{language}</span>
            )}
            {title && <span className="text-sm font-medium text-slate-200">{title}</span>}
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-slate-700 transition-colors"
            title="コードをコピー"
          >
            {copied ? (
              <Check size={16} className="text-secondary" />
            ) : (
              <Copy size={16} className="text-slate-200" />
            )}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <pre className="p-4 font-mono text-sm leading-relaxed">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="inline-block w-8 text-right pr-4 text-slate-400 select-none">
                  {index + 1}
                </span>
              )}
              <code>{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
