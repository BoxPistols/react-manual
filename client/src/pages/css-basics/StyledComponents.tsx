import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function StyledComponents() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 19</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">styled-components</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          最も人気のある CSS-in-JS ライブラリ「styled-components」を実践的に学びます。
          インストールから、動的スタイル、テーマ、アニメーションまで幅広くカバーします。
        </p>

        <WhyNowBox tags={['styled-components', 'CSS-in-JS', 'テーマ', 'アニメーション']}>
          <p>
            前のステップで CSS-in-JS の概念を学びました。
            ここでは実際に styled-components を使って、コンポーネントにスタイルを適用する方法を体験します。
            多くの React プロジェクトで採用されているため、コードを読む場面でも必ず役に立ちます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: インストールとセットアップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">インストールとセットアップ</h2>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`# npm の場合
npm install styled-components

# TypeScript の型定義（styled-components v6 では不要、v5 以前は必要）
npm install -D @types/styled-components`}
            />

            <div className="mt-4" />

            <InfoBox type="info" title="styled-components v6">
              <p>
                styled-components v6 からは TypeScript の型定義が本体に含まれています。
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@types/styled-components</code> は不要です。
                また、v6 では transient props（$接頭辞）がデフォルトで推奨されるようになりました。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Vite での設定</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vite プロジェクトでは、特別な設定なしで styled-components を使えます。
              ただし、開発体験を向上させるプラグインを追加すると便利です。
            </p>

            <CodeBlock
              language="bash"
              title="Babel プラグイン（推奨）"
              code={`npm install -D babel-plugin-styled-components`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="typescript"
              title="vite.config.ts"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,  // コンポーネント名をクラス名に含める（デバッグ用）
              fileName: false,    // ファイル名は含めない
            },
          ],
        ],
      },
    }),
  ],
});`}
            />

            <InfoBox type="info" title="displayName の効果">
              <p>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">displayName: true</code> にすると、
                開発者ツールで <code className="bg-muted px-1.5 py-0.5 rounded text-sm">sc-bdVTJa</code> の代わりに
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">Button-sc-bdVTJa</code> のようにコンポーネント名が表示され、
                デバッグが格段にしやすくなります。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: 基本的な使い方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">基本的な使い方</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components では、<code className="bg-muted px-1.5 py-0.5 rounded text-sm">styled.要素名</code> に
              テンプレートリテラルで CSS を渡してコンポーネントを作ります。
            </p>

            <CodeBlock
              language="tsx"
              title="基本的なスタイルコンポーネント"
              code={`import styled from 'styled-components';

// styled.div でスタイル付き <div> を作成
const Container = styled.div\`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
\`;

// styled.h1 でスタイル付き <h1> を作成
const Title = styled.h1\`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 16px;
  line-height: 1.2;
\`;

// styled.p でスタイル付き <p> を作成
const Description = styled.p\`
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.8;
  max-width: 640px;
\`;

// styled.button でスタイル付き <button> を作成
const Button = styled.button\`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:active {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
\`;

// 使い方：通常のコンポーネントと同じ
function HeroSection() {
  return (
    <Container>
      <Title>React でスタイリングを学ぼう</Title>
      <Description>
        styled-components を使えば、CSS の知識をそのまま活かして
        コンポーネントにスタイルを適用できます。
      </Description>
      <Button>はじめる</Button>
    </Container>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">ネストと擬似要素</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              SCSS のようなネスト記法が使えます。<code className="bg-muted px-1.5 py-0.5 rounded text-sm">&</code> は現在の要素を参照します。
            </p>

            <CodeBlock
              language="tsx"
              title="ネストと擬似要素の例"
              code={`const Card = styled.div\`
  background: white;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;

  /* ホバー時のスタイル */
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  /* 擬似要素 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  }

  /* 子要素のスタイル */
  & h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
  }

  & p {
    color: #64748b;
    line-height: 1.6;
  }

  /* 隣接セレクタ */
  & + & {
    margin-top: 16px;
  }

  /* メディアクエリ */
  @media (max-width: 768px) {
    padding: 16px;
  }
\`;`}
            />
          </section>

          {/* セクション3: Props ベースの動的スタイル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props ベースの動的スタイル</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components の最大の強みの一つは、props に基づいてスタイルを動的に変更できることです。
              v6 では、DOM に渡さない props には <code className="bg-muted px-1.5 py-0.5 rounded text-sm">$</code> 接頭辞（transient props）を使います。
            </p>

            <CodeBlock
              language="tsx"
              title="動的スタイルの基本"
              code={`import styled from 'styled-components';

// $primary は DOM に渡されない（transient prop）
const Button = styled.button<{ $primary?: boolean }>\`
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  /* props に基づいてスタイルを切り替え */
  background-color: \${(props) => (props.$primary ? '#3b82f6' : 'transparent')};
  color: \${(props) => (props.$primary ? 'white' : '#3b82f6')};
  border: 2px solid #3b82f6;

  &:hover {
    background-color: \${(props) => (props.$primary ? '#2563eb' : '#eff6ff')};
  }
\`;

// 使用例
function App() {
  return (
    <div>
      <Button $primary>プライマリ</Button>
      <Button>アウトライン</Button>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">複数の props を使う例</h3>
            <CodeBlock
              language="tsx"
              title="サイズとバリアントの組み合わせ"
              code={`import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant?: Variant;
  $size?: Size;
  $fullWidth?: boolean;
}

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  primary: css\`
    background-color: #3b82f6;
    color: white;
    border: none;
    &:hover { background-color: #2563eb; }
  \`,
  secondary: css\`
    background-color: #6b7280;
    color: white;
    border: none;
    &:hover { background-color: #4b5563; }
  \`,
  outline: css\`
    background-color: transparent;
    color: #3b82f6;
    border: 2px solid #3b82f6;
    &:hover { background-color: #eff6ff; }
  \`,
  ghost: css\`
    background-color: transparent;
    color: #374151;
    border: none;
    &:hover { background-color: #f3f4f6; }
  \`,
};

const sizeStyles: Record<Size, ReturnType<typeof css>> = {
  sm: css\`
    padding: 6px 12px;
    font-size: 0.75rem;
  \`,
  md: css\`
    padding: 10px 20px;
    font-size: 0.875rem;
  \`,
  lg: css\`
    padding: 14px 28px;
    font-size: 1rem;
  \`,
};

const StyledButton = styled.button<StyledButtonProps>\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: \${(props) => (props.$fullWidth ? '100%' : 'auto')};

  /* variant スタイルを適用 */
  \${(props) => variantStyles[props.$variant || 'primary']}

  /* size スタイルを適用 */
  \${(props) => sizeStyles[props.$size || 'md']}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
\`;

// 使用例
function App() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <StyledButton $variant="primary" $size="sm">小さいボタン</StyledButton>
      <StyledButton $variant="secondary" $size="md">中ボタン</StyledButton>
      <StyledButton $variant="outline" $size="lg">大きいアウトライン</StyledButton>
      <StyledButton $variant="ghost">ゴースト</StyledButton>
      <StyledButton $variant="primary" $fullWidth>全幅ボタン</StyledButton>
    </div>
  );
}`}
            />

            <InfoBox type="warning" title="$ 接頭辞を忘れずに">
              <p>
                styled-components v6 では、スタイリング専用の props には
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">$</code> を付けましょう。
                付けないと、その props が実際の DOM 要素に HTML 属性として渡されてしまい、
                コンソールに警告が表示されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: スタイルの拡張 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スタイルの拡張（Extending Styles）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              既存のスタイルコンポーネントを拡張して、新しいコンポーネントを作れます。
              CSS のカスケードのように、ベースのスタイルを継承しつつ追加・上書きができます。
            </p>

            <CodeBlock
              language="tsx"
              title="スタイルの拡張"
              code={`import styled from 'styled-components';

// ベースボタン
const BaseButton = styled.button\`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
\`;

// BaseButton を拡張してプライマリボタンを作成
const PrimaryButton = styled(BaseButton)\`
  background-color: #3b82f6;
  color: white;

  &:hover {
    background-color: #2563eb;
  }
\`;

// BaseButton を拡張してデンジャーボタンを作成
const DangerButton = styled(BaseButton)\`
  background-color: #ef4444;
  color: white;

  &:hover {
    background-color: #dc2626;
  }
\`;

// PrimaryButton をさらに拡張してラウンドボタンを作成
const RoundPrimaryButton = styled(PrimaryButton)\`
  border-radius: 9999px;
  padding: 10px 24px;
\`;

// 使用例
function App() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <BaseButton>ベース</BaseButton>
      <PrimaryButton>プライマリ</PrimaryButton>
      <DangerButton>デンジャー</DangerButton>
      <RoundPrimaryButton>ラウンド</RoundPrimaryButton>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">as prop でタグを変更</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">as</code> prop を使うと、
              スタイルはそのままにレンダリングされる HTML タグを変更できます。
            </p>

            <CodeBlock
              language="tsx"
              title="as prop の活用"
              code={`const Button = styled.button\`
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
\`;

function Navigation() {
  return (
    <nav>
      {/* button として描画 */}
      <Button onClick={() => console.log('click')}>ボタン</Button>

      {/* a タグとして描画（リンクとして使う） */}
      <Button as="a" href="/about">アバウト</Button>

      {/* Link コンポーネントとして描画（React Router 等） */}
      <Button as={Link} to="/contact">お問い合わせ</Button>
    </nav>
  );
}`}
            />
          </section>

          {/* セクション5: グローバルスタイル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">グローバルスタイル</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">createGlobalStyle</code> を使うと、
              アプリケーション全体に適用されるグローバルスタイルを定義できます。
              リセット CSS やフォントの設定に使います。
            </p>

            <CodeBlock
              language="tsx"
              title="グローバルスタイルの定義"
              code={`import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle\`
  /* リセット */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ベーススタイル */
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
    line-height: 1.5;
    color: \${(props) => props.theme.colors.text};
    background-color: \${(props) => props.theme.colors.background};
  }

  /* リンク */
  a {
    color: \${(props) => props.theme.colors.primary};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* 画像 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
\`;

// App のルートで使用
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />  {/* ← ここに配置 */}
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}`}
            />
          </section>

          {/* セクション6: テーミング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テーミング（ThemeProvider）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">ThemeProvider</code> を使うと、
              アプリケーション全体で共有するデザイントークン（色、スペーシング、フォントなど）を定義できます。
            </p>

            <CodeBlock
              language="tsx"
              title="テーマの定義と適用"
              code={`import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useState } from 'react';

// テーマの型定義
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// ライトテーマ
const lightTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textMuted: '#64748b',
    border: '#e2e8f0',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
};

// ダークテーマ
const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: '#334155',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.5)',
  },
};

// styled-components の DefaultTheme を拡張（型補完用）
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// テーマを使ったコンポーネント
const Card = styled.div\`
  background: \${(props) => props.theme.colors.surface};
  color: \${(props) => props.theme.colors.text};
  border: 1px solid \${(props) => props.theme.colors.border};
  border-radius: \${(props) => props.theme.borderRadius.lg};
  padding: \${(props) => props.theme.spacing.lg};
  box-shadow: \${(props) => props.theme.shadows.md};
\`;

const ToggleButton = styled.button\`
  padding: \${(props) => props.theme.spacing.sm} \${(props) => props.theme.spacing.md};
  background: \${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: \${(props) => props.theme.borderRadius.md};
  cursor: pointer;
\`;

// テーマを切り替えるアプリ
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Card>
        <h2>テーマの切り替え</h2>
        <p>ボタンを押してテーマを変更できます。</p>
        <ToggleButton onClick={() => setIsDark(!isDark)}>
          {isDark ? 'ライトモード' : 'ダークモード'}に切り替え
        </ToggleButton>
      </Card>
    </ThemeProvider>
  );
}`}
            />
          </section>

          {/* セクション7: css ヘルパー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">css ヘルパー</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">css</code> ヘルパーを使うと、
              再利用可能なスタイルの断片を作成できます。
              複数のコンポーネントで共通するスタイルを抽出するのに便利です。
            </p>

            <CodeBlock
              language="tsx"
              title="css ヘルパーの活用"
              code={`import styled, { css } from 'styled-components';

// 再利用可能なスタイルの断片
const flexCenter = css\`
  display: flex;
  align-items: center;
  justify-content: center;
\`;

const truncate = css\`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
\`;

const hoverEffect = css\`
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
\`;

// 条件付きスタイル
const visuallyHidden = css\`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
\`;

// 共通スタイルを使ったコンポーネント
const Avatar = styled.div\`
  \${flexCenter}
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  font-weight: 600;
\`;

const Badge = styled.span\`
  \${flexCenter}
  \${truncate}
  max-width: 120px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  background: #eff6ff;
  color: #3b82f6;
\`;

const CardHoverable = styled.div\`
  \${hoverEffect}
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
\`;`}
            />
          </section>

          {/* セクション8: アニメーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">アニメーション（keyframes）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">keyframes</code> ヘルパーを使うと、
              CSS アニメーションを定義できます。自動的にユニークな名前が生成されるため、衝突の心配がありません。
            </p>

            <CodeBlock
              language="tsx"
              title="アニメーションの定義と使用"
              code={`import styled, { keyframes } from 'styled-components';

// フェードイン
const fadeIn = keyframes\`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
\`;

// スピナー回転
const spin = keyframes\`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
\`;

// パルス
const pulse = keyframes\`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
\`;

// スケルトンシマー
const shimmer = keyframes\`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
\`;

// フェードインするカード
const AnimatedCard = styled.div\`
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: \${fadeIn} 0.3s ease-out;
\`;

// ローディングスピナー
const Spinner = styled.div\`
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: \${spin} 0.8s linear infinite;
\`;

// スケルトンローディング
const Skeleton = styled.div<{ $width?: string; $height?: string }>\`
  width: \${(props) => props.$width || '100%'};
  height: \${(props) => props.$height || '20px'};
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #e2e8f0 25%,
    #f1f5f9 50%,
    #e2e8f0 75%
  );
  background-size: 200% 100%;
  animation: \${shimmer} 1.5s ease-in-out infinite;
\`;

// 使用例
function LoadingExample() {
  return (
    <div>
      <Spinner />
      <Skeleton $width="60%" $height="24px" />
      <Skeleton $width="100%" $height="16px" />
      <Skeleton $width="80%" $height="16px" />
    </div>
  );
}`}
            />
          </section>

          {/* セクション9: 実践例 ボタンシステム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: ボタンシステム</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ここまでの知識を使って、実際のプロジェクトで使えるボタンコンポーネントシステムを構築しましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="src/components/Button.tsx - 完全なボタンシステム"
              code={`import styled, { css, keyframes } from 'styled-components';
import { ComponentPropsWithoutRef } from 'react';

// ===== 型定義 =====
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ===== スタイル定義 =====
const spin = keyframes\`
  to { transform: rotate(360deg); }
\`;

const variantMap: Record<Variant, ReturnType<typeof css>> = {
  primary: css\`
    background: #3b82f6;
    color: white;
    &:hover:not(:disabled) { background: #2563eb; }
    &:active:not(:disabled) { background: #1d4ed8; }
  \`,
  secondary: css\`
    background: #f1f5f9;
    color: #334155;
    &:hover:not(:disabled) { background: #e2e8f0; }
    &:active:not(:disabled) { background: #cbd5e1; }
  \`,
  outline: css\`
    background: transparent;
    color: #3b82f6;
    border: 2px solid #3b82f6;
    &:hover:not(:disabled) { background: #eff6ff; }
  \`,
  ghost: css\`
    background: transparent;
    color: #374151;
    &:hover:not(:disabled) { background: #f3f4f6; }
  \`,
  danger: css\`
    background: #ef4444;
    color: white;
    &:hover:not(:disabled) { background: #dc2626; }
    &:active:not(:disabled) { background: #b91c1c; }
  \`,
};

const sizeMap: Record<ButtonSize, ReturnType<typeof css>> = {
  xs: css\` padding: 4px 8px; font-size: 0.7rem; \`,
  sm: css\` padding: 6px 12px; font-size: 0.8rem; \`,
  md: css\` padding: 10px 20px; font-size: 0.875rem; \`,
  lg: css\` padding: 14px 28px; font-size: 1rem; \`,
  xl: css\` padding: 18px 36px; font-size: 1.125rem; \`,
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $loading: boolean;
}>\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  width: \${(p) => (p.$fullWidth ? '100%' : 'auto')};

  \${(p) => variantMap[p.$variant]}
  \${(p) => sizeMap[p.$size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  \${(p) =>
    p.$loading &&
    css\`
      color: transparent;
      pointer-events: none;
    \`}
\`;

const LoadingSpinner = styled.div\`
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: \${spin} 0.6s linear infinite;
\`;

// ===== コンポーネント =====
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <LoadingSpinner />}
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </StyledButton>
  );
}

// ===== 使用例 =====
// <Button variant="primary" size="lg">保存</Button>
// <Button variant="outline" leftIcon={<PlusIcon />}>追加</Button>
// <Button variant="danger" loading>削除中...</Button>
// <Button variant="ghost" size="sm">キャンセル</Button>`}
            />
          </section>

          {/* セクション10: ベストプラクティス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ベストプラクティス</h2>

            <div className="space-y-4">
              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">1. コンポーネントファイルの外にスタイルを定義する</h3>
                <p className="text-sm text-foreground/80">
                  スタイルコンポーネントはレンダリングのたびに再生成されないよう、
                  コンポーネント関数の外（ファイルのトップレベル）に定義しましょう。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">2. transient props（$接頭辞）を使う</h3>
                <p className="text-sm text-foreground/80">
                  スタイリング専用の props には <code className="bg-muted px-1 rounded">$</code> を付けて、
                  DOM に不要な属性が渡るのを防ぎましょう。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">3. テーマを活用する</h3>
                <p className="text-sm text-foreground/80">
                  ハードコードされた色やスペーシングではなく、テーマの値を参照しましょう。
                  デザインの一貫性が保たれ、テーマの切り替えも容易になります。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">4. css ヘルパーで共通スタイルを抽出する</h3>
                <p className="text-sm text-foreground/80">
                  複数のコンポーネントで繰り返されるスタイルパターンは
                  <code className="bg-muted px-1 rounded">css</code> ヘルパーで抽出して再利用しましょう。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">5. 過度なネストを避ける</h3>
                <p className="text-sm text-foreground/80">
                  ネストは2〜3段階までに留めましょう。深いネストは可読性を下げます。
                  子要素にもスタイルコンポーネントを作ることを検討してください。
                </p>
              </div>
            </div>

            <div className="mt-6" />

            <CodeBlock
              language="tsx"
              title="よくある間違いと正しい書き方"
              code={`// ❌ コンポーネント内でスタイルを定義（レンダリングごとに再生成される）
function Card() {
  const Wrapper = styled.div\`
    padding: 24px;
  \`;
  return <Wrapper>...</Wrapper>;
}

// ✅ コンポーネントの外で定義
const Wrapper = styled.div\`
  padding: 24px;
\`;
function Card() {
  return <Wrapper>...</Wrapper>;
}


// ❌ transient prop なしで DOM に渡される
const Box = styled.div<{ isActive: boolean }>\`
  opacity: \${(p) => (p.isActive ? 1 : 0.5)};
\`;
// <div isActive="true"> ← DOM に不要な属性が渡る

// ✅ $ 接頭辞で DOM への伝播を防ぐ
const Box = styled.div<{ $isActive: boolean }>\`
  opacity: \${(p) => (p.$isActive ? 1 : 0.5)};
\`;
// <div> ← クリーンな DOM`}
            />

            <div className="mt-6" />

            <InfoBox type="success" title="まとめ">
              <p>
                styled-components は CSS の知識をそのまま活かしながら、
                コンポーネントベースのスタイリングを実現する強力なライブラリです。
                次のステップでは、似た API を持ちつつも異なるアプローチを提供する Emotion を学びます。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
