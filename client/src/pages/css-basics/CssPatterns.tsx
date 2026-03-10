import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function CssPatterns() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 21</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">CSS 設計パターン</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          規模が大きくなっても破綻しない CSS を書くための設計パターンを学びます。
          BEM、SMACSS、デザイントークン、レスポンシブデザインなど、
          実践で役立つ考え方を網羅します。
        </p>

        <WhyNowBox tags={['BEM', 'SMACSS', 'デザイントークン', 'レスポンシブ', '設計']}>
          <p>
            CSS のツール（CSS Modules, styled-components, Emotion）を学んできましたが、
            ツールだけでは大規模なプロジェクトの CSS は管理しきれません。
            設計パターンを知ることで、どのツールを使っても一貫性のある保守しやすい CSS を書けるようになります。
            デザイナーにとって、この知識はデザインシステムの構築にも直結します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: BEM */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">BEM（Block Element Modifier）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              BEM は最も広く使われている CSS 命名規則です。
              クラス名を <strong>Block（ブロック）</strong>、<strong>Element（要素）</strong>、
              <strong>Modifier（修飾子）</strong> の3つの概念で構造化します。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-foreground mb-3">BEM の命名規則</h3>
              <div className="space-y-2 text-foreground/80 text-sm font-mono">
                <p><strong>.block</strong> — 独立したコンポーネント（例: <code>.card</code>）</p>
                <p><strong>.block__element</strong> — ブロック内の構成要素（例: <code>.card__title</code>）</p>
                <p><strong>.block--modifier</strong> — ブロックのバリエーション（例: <code>.card--featured</code>）</p>
                <p><strong>.block__element--modifier</strong> — 要素のバリエーション（例: <code>.card__title--large</code>）</p>
              </div>
            </div>

            <CodeBlock
              language="css"
              title="BEM によるカードコンポーネント"
              code={`/* Block: カード */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Modifier: 特集カード */
.card--featured {
  border: 2px solid #3b82f6;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
}

/* Modifier: コンパクトカード */
.card--compact {
  padding: 16px;
}

/* Element: カードヘッダー */
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

/* Element: カードタイトル */
.card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

/* Element + Modifier: 大きなタイトル */
.card__title--large {
  font-size: 1.5rem;
}

/* Element: カード本文 */
.card__body {
  color: #64748b;
  line-height: 1.6;
}

/* Element: カードフッター */
.card__footer {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

/* Element: カードアクション */
.card__action {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.card__action--primary {
  background: #3b82f6;
  color: white;
  border: none;
}

.card__action--secondary {
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="BEM を React で使う"
              code={`// CSS Modules と組み合わせると、BEM の長い名前は不要になる
// しかし、BEM の「構造化して考える」アプローチは CSS Modules でも役立つ

// プレーン CSS + BEM の場合
import './Card.css';

function Card({ featured, title, children }: {
  featured?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={\`card \${featured ? 'card--featured' : ''}\`}>
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
      </div>
      <div className="card__body">
        {children}
      </div>
      <div className="card__footer">
        <button className="card__action card__action--primary">詳細</button>
        <button className="card__action card__action--secondary">共有</button>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="CSS Modules を使うなら BEM は不要？">
              <p>
                CSS Modules を使えばスコープの問題は解決するため、BEM の命名規則は必須ではありません。
                しかし、BEM の「ブロック・要素・修飾子」という考え方は、
                コンポーネントの構造を設計する際に非常に役立ちます。
                命名規則としてではなく、設計のフレームワークとして取り入れることをおすすめします。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: SMACSS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">SMACSS（Scalable and Modular Architecture for CSS）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              SMACSS はCSSをカテゴリに分類して管理する設計方法論です。
              Jonathan Snook によって提唱されました。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-foreground mb-3">SMACSS の5つのカテゴリ</h3>
              <div className="space-y-3 text-foreground/80 text-sm">
                <div>
                  <strong className="text-foreground">1. Base（ベース）</strong>
                  <p className="ml-4">要素セレクタのデフォルトスタイル。リセット CSS や基本スタイル。</p>
                </div>
                <div>
                  <strong className="text-foreground">2. Layout（レイアウト）</strong>
                  <p className="ml-4">ページの大枠の構造。ヘッダー、フッター、サイドバー、メインコンテンツなど。</p>
                </div>
                <div>
                  <strong className="text-foreground">3. Module（モジュール）</strong>
                  <p className="ml-4">再利用可能な UI コンポーネント。カード、ボタン、ナビゲーションなど。</p>
                </div>
                <div>
                  <strong className="text-foreground">4. State（ステート）</strong>
                  <p className="ml-4">コンポーネントの状態を表すスタイル。is-active、is-hidden、is-loading など。</p>
                </div>
                <div>
                  <strong className="text-foreground">5. Theme（テーマ）</strong>
                  <p className="ml-4">色やフォントなどの見た目に関するスタイル。テーマの切り替えに使う。</p>
                </div>
              </div>
            </div>

            <CodeBlock
              language="css"
              title="SMACSS に基づくファイル構成"
              code={`/* === 1. Base === */
/* base/_reset.css */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* base/_typography.css */
body {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  color: #1e293b;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.2;
  font-weight: 600;
}

/* === 2. Layout === */
/* layout/_header.css */
.l-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.l-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.l-sidebar {
  width: 280px;
  flex-shrink: 0;
}

/* === 3. Module === */
/* modules/_button.css */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

/* === 4. State === */
/* state/_state.css */
.is-active {
  font-weight: bold;
  color: #3b82f6;
}

.is-hidden {
  display: none !important;
}

.is-loading {
  opacity: 0.5;
  pointer-events: none;
}

.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* === 5. Theme === */
/* theme/_dark.css */
.theme-dark {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
  --color-primary: #60a5fa;
}`}
            />

            <CodeBlock
              language="text"
              title="SMACSS のディレクトリ構成例"
              code={`src/styles/
├── base/
│   ├── _reset.css
│   ├── _typography.css
│   └── _variables.css
├── layout/
│   ├── _header.css
│   ├── _footer.css
│   └── _grid.css
├── modules/
│   ├── _button.css
│   ├── _card.css
│   ├── _nav.css
│   └── _form.css
├── state/
│   └── _state.css
├── theme/
│   ├── _light.css
│   └── _dark.css
└── main.css            ← すべてをインポートするエントリーファイル`}
            />

            <InfoBox type="info" title="React と SMACSS">
              <p>
                React ではコンポーネント単位でスタイルを管理するのが一般的なので、
                SMACSS をそのまま適用する場面は少ないです。
                しかし、Base（リセット）、Layout（レイアウト）、State（状態）の分類は
                React プロジェクトでも有用な考え方です。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: Atomic Design と CSS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Atomic Design と CSS</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Brad Frost が提唱した Atomic Design は、UI をレベルに分けて構築する手法です。
              React のコンポーネント設計と非常に相性が良いです。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-foreground mb-3">5つのレベル</h3>
              <div className="space-y-3 text-foreground/80 text-sm">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0">Atoms</span>
                  <span>最小の UI 要素。ボタン、入力フィールド、ラベル、アイコンなど。</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0">Molecules</span>
                  <span>複数の Atoms を組み合わせた要素。検索フォーム（入力 + ボタン）など。</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0">Organisms</span>
                  <span>複雑な UI セクション。ヘッダー（ロゴ + ナビ + 検索）など。</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0">Templates</span>
                  <span>ページのレイアウト構造。コンテンツの配置を定義。</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0">Pages</span>
                  <span>実際のコンテンツを流し込んだ最終的なページ。</span>
                </div>
              </div>
            </div>

            <CodeBlock
              language="text"
              title="Atomic Design に基づくディレクトリ構成"
              code={`src/components/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.module.css
│   ├── Input/
│   │   ├── Input.tsx
│   │   └── Input.module.css
│   ├── Label/
│   ├── Badge/
│   └── Avatar/
├── molecules/
│   ├── SearchForm/       ← Input + Button の組み合わせ
│   ├── UserInfo/         ← Avatar + テキスト
│   └── MenuItem/
├── organisms/
│   ├── Header/           ← Logo + Navigation + SearchForm
│   ├── Sidebar/
│   └── Footer/
├── templates/
│   ├── DashboardLayout/
│   └── ArticleLayout/
└── pages/
    ├── Home/
    └── Profile/`}
            />

            <CodeBlock
              language="tsx"
              title="Atomic Design の実装例"
              code={`// ===== Atom: Button =====
// atoms/Button/Button.tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  return (
    <button
      className={\`\${styles.button} \${styles[variant]} \${styles[size]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


// ===== Atom: Input =====
// atoms/Input/Input.tsx
import styles from './Input.module.css';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}


// ===== Molecule: SearchForm（Atoms の組み合わせ）=====
// molecules/SearchForm/SearchForm.tsx
import { useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input/Input';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState('');

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSearch(query); }}>
      <Input placeholder="検索..." value={query} onChange={setQuery} />
      <Button variant="primary" size="sm">検索</Button>
    </form>
  );
}


// ===== Organism: Header（Molecules + Atoms の組み合わせ）=====
// organisms/Header/Header.tsx
import { SearchForm } from '@/components/molecules/SearchForm/SearchForm';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyApp</div>
      <nav className={styles.nav}>
        <a href="/">ホーム</a>
        <a href="/about">アバウト</a>
      </nav>
      <SearchForm onSearch={(q) => console.log(q)} />
    </header>
  );
}`}
            />
          </section>

          {/* セクション4: CSS カスタムプロパティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS カスタムプロパティ（変数）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS カスタムプロパティ（CSS Variables）は、どの CSS 手法と組み合わせても使える強力な機能です。
              テーマの管理やデザインの一貫性を保つために不可欠です。
            </p>

            <CodeBlock
              language="css"
              title="CSS カスタムプロパティの基本"
              code={`/* :root でグローバル変数を定義 */
:root {
  /* 色 */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;

  /* スペーシング */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* フォント */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;

  /* 角丸 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* シャドウ */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.12);

  /* トランジション */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}

/* ダークモード */
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-primary-hover: #93bbfd;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-border: #334155;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.5);
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="カスタムプロパティを使ったコンポーネント"
              code={`/* 変数を使えば、テーマの変更に自動で追従する */
.card {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.card-body {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.button {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.button:hover {
  background: var(--color-primary-hover);
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="React でテーマを切り替える"
              code={`import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // data-theme 属性を変更すると CSS 変数が切り替わる
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? 'ダークモード' : 'ライトモード'}に切り替え
    </button>
  );
}

// CSS カスタムプロパティなら、CSS-in-JS のランタイムコストなしでテーマ切替が実現できる！`}
            />

            <InfoBox type="success" title="CSS カスタムプロパティの利点">
              <p>
                CSS カスタムプロパティはブラウザネイティブの機能であり、ランタイムライブラリが不要です。
                CSS Modules、styled-components、Tailwind CSS、どの手法と組み合わせても使えるため、
                デザインシステムの基盤として最適です。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: デザイントークン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザイントークン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザイントークンは、デザインの決定事項（色、スペーシング、タイポグラフィなど）を
              プラットフォームに依存しない形式で定義したものです。
              Figma のスタイル / 変数と直接対応させることで、デザインと実装の一貫性を保ちます。
            </p>

            <CodeBlock
              language="typescript"
              title="src/tokens/tokens.ts"
              code={`// デザイントークンを TypeScript で定義
export const tokens = {
  color: {
    // プリミティブカラー（基本色）
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    // セマンティックカラー（意味を持つ色）
    semantic: {
      primary: '#3b82f6',     // blue.500
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4',
    },
  },

  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  breakpoint: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="typescript"
              title="トークンを CSS カスタムプロパティに変換"
              code={`// トークンから CSS カスタムプロパティを生成するユーティリティ
function tokensToCssVars(tokens: Record<string, any>, prefix = ''): string {
  let css = '';
  for (const [key, value] of Object.entries(tokens)) {
    const varName = prefix ? \`\${prefix}-\${key}\` : key;
    if (typeof value === 'object' && !Array.isArray(value)) {
      css += tokensToCssVars(value, varName);
    } else {
      css += \`  --\${varName}: \${value};\\n\`;
    }
  }
  return css;
}

// 使用例: :root { ... } に展開する`}
            />

            <InfoBox type="info" title="Figma との連携">
              <p>
                デザイントークンを JSON 形式で管理すると、Figma の Variables や Tokens Studio プラグインと
                同期することもできます。デザイナーが Figma で変更したトークンが、
                自動的にコードに反映される仕組みを作ることで、デザインと実装の乖離を防げます。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: レスポンシブデザイン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レスポンシブデザインパターン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              レスポンシブデザインは、画面サイズに応じてレイアウトを最適化するアプローチです。
              モバイルファースト設計が現在の標準です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">モバイルファースト</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              小さい画面用のスタイルをデフォルトで書き、
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">min-width</code> のメディアクエリで
              大きい画面向けに拡張していく手法です。
            </p>

            <CodeBlock
              language="css"
              title="モバイルファースト設計"
              code={`/* ===== モバイルファースト ===== */

/* デフォルト: モバイル向け（小さい画面） */
.container {
  padding: 16px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;  /* 1カラム */
  gap: 16px;
}

.title {
  font-size: 1.5rem;
}

/* タブレット以上（768px〜） */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    max-width: 768px;
    margin: 0 auto;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);  /* 2カラム */
    gap: 24px;
  }

  .title {
    font-size: 2rem;
  }
}

/* デスクトップ以上（1024px〜） */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1200px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);  /* 3カラム */
    gap: 32px;
  }

  .title {
    font-size: 2.5rem;
  }
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">レスポンシブパターン集</h3>
            <CodeBlock
              language="css"
              title="よく使うレスポンシブパターン"
              code={`/* パターン1: Fluid Typography（流動的なフォントサイズ） */
.fluid-title {
  /* clamp(最小値, 推奨値, 最大値) */
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* パターン2: Auto-fit Grid（自動調整グリッド） */
.auto-grid {
  display: grid;
  /* メディアクエリ不要！コンテンツに応じて自動調整 */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* パターン3: Container Query（コンテナクエリ） */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}

/* パターン4: ナビゲーションの切り替え */
.nav-links {
  display: none;  /* モバイルでは非表示 */
}

.nav-hamburger {
  display: block;  /* モバイルではハンバーガー */
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;  /* PC では通常表示 */
    gap: 24px;
  }

  .nav-hamburger {
    display: none;  /* PC ではハンバーガー非表示 */
  }
}

/* パターン5: レスポンシブスペーシング */
.section {
  padding: var(--spacing-md);  /* モバイル: 16px */
}

@media (min-width: 768px) {
  .section {
    padding: var(--spacing-xl);  /* タブレット: 32px */
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--spacing-2xl);  /* デスクトップ: 48px */
  }
}`}
            />

            <InfoBox type="info" title="Container Query">
              <p>
                Container Query（コンテナクエリ）は、親要素のサイズに基づいてスタイルを変更する
                比較的新しい CSS 機能です。2023年以降すべてのモダンブラウザでサポートされており、
                コンポーネントベースのレスポンシブデザインに非常に適しています。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: 実践例 デザインシステム基盤 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: デザインシステムの基盤</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ここまで学んだパターンを組み合わせて、小さなデザインシステムの基盤を構築しましょう。
              CSS カスタムプロパティ + CSS Modules を使った実践的なアプローチです。
            </p>

            <CodeBlock
              language="css"
              title="src/styles/tokens.css — デザイントークン"
              code={`/* デザインシステムの基盤：CSS カスタムプロパティ */
:root {
  /* カラーパレット */
  --ds-color-primary: #3b82f6;
  --ds-color-primary-hover: #2563eb;
  --ds-color-primary-light: #eff6ff;
  --ds-color-secondary: #8b5cf6;
  --ds-color-success: #10b981;
  --ds-color-warning: #f59e0b;
  --ds-color-danger: #ef4444;

  --ds-color-bg: #f8fafc;
  --ds-color-surface: #ffffff;
  --ds-color-text: #1e293b;
  --ds-color-text-secondary: #64748b;
  --ds-color-border: #e2e8f0;

  /* スペーシングスケール（4px ベース） */
  --ds-space-1: 4px;
  --ds-space-2: 8px;
  --ds-space-3: 12px;
  --ds-space-4: 16px;
  --ds-space-5: 20px;
  --ds-space-6: 24px;
  --ds-space-8: 32px;
  --ds-space-10: 40px;
  --ds-space-12: 48px;

  /* タイポグラフィ */
  --ds-font-family: 'Inter', -apple-system, sans-serif;
  --ds-font-size-xs: 0.75rem;
  --ds-font-size-sm: 0.875rem;
  --ds-font-size-base: 1rem;
  --ds-font-size-lg: 1.125rem;
  --ds-font-size-xl: 1.25rem;
  --ds-font-size-2xl: 1.5rem;
  --ds-font-size-3xl: 2rem;

  /* 角丸 */
  --ds-radius-sm: 4px;
  --ds-radius-md: 8px;
  --ds-radius-lg: 12px;
  --ds-radius-full: 9999px;

  /* シャドウ */
  --ds-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
  --ds-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --ds-shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);

  /* トランジション */
  --ds-duration-fast: 100ms;
  --ds-duration-normal: 200ms;
  --ds-duration-slow: 300ms;
  --ds-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ダークモード */
[data-theme="dark"] {
  --ds-color-primary: #60a5fa;
  --ds-color-primary-hover: #93bbfd;
  --ds-color-primary-light: #1e3a5f;
  --ds-color-bg: #0f172a;
  --ds-color-surface: #1e293b;
  --ds-color-text: #f1f5f9;
  --ds-color-text-secondary: #94a3b8;
  --ds-color-border: #334155;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="src/components/atoms/DSButton.module.css"
              code={`/* デザインシステム ボタン */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-space-2);
  font-family: var(--ds-font-family);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all var(--ds-duration-normal) var(--ds-easing);
}

.button:focus-visible {
  outline: 2px solid var(--ds-color-primary);
  outline-offset: 2px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* サイズ */
.sm {
  padding: var(--ds-space-1) var(--ds-space-3);
  font-size: var(--ds-font-size-xs);
  border-radius: var(--ds-radius-sm);
}

.md {
  padding: var(--ds-space-2) var(--ds-space-4);
  font-size: var(--ds-font-size-sm);
  border-radius: var(--ds-radius-md);
}

.lg {
  padding: var(--ds-space-3) var(--ds-space-6);
  font-size: var(--ds-font-size-base);
  border-radius: var(--ds-radius-md);
}

/* バリアント */
.primary {
  background: var(--ds-color-primary);
  color: white;
}
.primary:hover:not(:disabled) {
  background: var(--ds-color-primary-hover);
}

.secondary {
  background: var(--ds-color-surface);
  color: var(--ds-color-text);
  border: 1px solid var(--ds-color-border);
}
.secondary:hover:not(:disabled) {
  background: var(--ds-color-bg);
}

.outline {
  background: transparent;
  color: var(--ds-color-primary);
  border: 2px solid var(--ds-color-primary);
}
.outline:hover:not(:disabled) {
  background: var(--ds-color-primary-light);
}

.ghost {
  background: transparent;
  color: var(--ds-color-text-secondary);
}
.ghost:hover:not(:disabled) {
  background: var(--ds-color-bg);
  color: var(--ds-color-text);
}

.danger {
  background: var(--ds-color-danger);
  color: white;
}
.danger:hover:not(:disabled) {
  filter: brightness(0.9);
}

/* 全幅 */
.fullWidth {
  width: 100%;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/components/atoms/DSButton.tsx"
              code={`import clsx from 'clsx';
import styles from './DSButton.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface DSButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function DSButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...rest
}: DSButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

// 使用例:
// <DSButton variant="primary" size="lg">保存</DSButton>
// <DSButton variant="outline" size="sm">キャンセル</DSButton>
// <DSButton variant="danger" fullWidth>アカウント削除</DSButton>`}
            />
          </section>

          {/* セクション8: まとめ アプローチの選び方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ: プロジェクトに合った CSS アプローチの選び方</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-3 py-3 text-left font-semibold">プロジェクトの特徴</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">おすすめアプローチ</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">理由</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr>
                    <td className="border border-border px-3 py-2">小規模・個人プロジェクト</td>
                    <td className="border border-border px-3 py-2 font-medium">CSS Modules or Tailwind</td>
                    <td className="border border-border px-3 py-2">設定不要、学習コスト低</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2">中〜大規模チーム開発</td>
                    <td className="border border-border px-3 py-2 font-medium">Tailwind + デザイントークン</td>
                    <td className="border border-border px-3 py-2">一貫性を保ちやすい</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2">コンポーネントライブラリ</td>
                    <td className="border border-border px-3 py-2 font-medium">CSS-in-JS or CSS Modules</td>
                    <td className="border border-border px-3 py-2">スコープとカプセル化が重要</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2">パフォーマンス最優先</td>
                    <td className="border border-border px-3 py-2 font-medium">CSS Modules or Tailwind</td>
                    <td className="border border-border px-3 py-2">ランタイムコストゼロ</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2">動的スタイルが多い SPA</td>
                    <td className="border border-border px-3 py-2 font-medium">styled-components or Emotion</td>
                    <td className="border border-border px-3 py-2">JS で動的に制御</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2">Next.js App Router</td>
                    <td className="border border-border px-3 py-2 font-medium">Tailwind or CSS Modules</td>
                    <td className="border border-border px-3 py-2">Server Components 対応</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2">MUI を使う</td>
                    <td className="border border-border px-3 py-2 font-medium">Emotion（MUI 内蔵）</td>
                    <td className="border border-border px-3 py-2">MUI v5 のデフォルト</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2">デザイナーが CSS を書く</td>
                    <td className="border border-border px-3 py-2 font-medium">CSS Modules</td>
                    <td className="border border-border px-3 py-2">標準の CSS 知識で書ける</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-3">CSS 設計のチェックリスト</h3>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>デザイントークン（色、スペーシング、フォント）が定義されているか</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>コンポーネントのスタイルはスコープされているか（名前衝突しないか）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>モバイルファースト設計になっているか</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>ダークモード対応の仕組みが用意されているか</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>共通コンポーネント（ボタン、カード等）が再利用可能な形で設計されているか</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>チームメンバーが理解・保守できるアプローチか</span>
                </li>
              </ul>
            </div>

            <InfoBox type="success" title="CSS スタイリング基礎セクション完了">
              <p>
                このセクションでは、プレーン CSS から CSS Modules、styled-components、Emotion、
                そして CSS 設計パターンまで幅広く学びました。
                どのアプローチにも長所と短所があり、「唯一の正解」はありません。
                プロジェクトの規模、チーム構成、パフォーマンス要件に応じて最適なものを選びましょう。
                次のセクションでは、今最も人気のある CSS フレームワーク「Tailwind CSS」を深く学びます。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
