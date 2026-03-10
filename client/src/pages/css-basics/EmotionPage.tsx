import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function EmotionPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 20</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Emotion</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          もう一つの人気 CSS-in-JS ライブラリ「Emotion」を学びます。
          styled-components との違いや、Emotion 独自の css prop アプローチを理解しましょう。
        </p>

        <WhyNowBox tags={['Emotion', 'css prop', 'styled', 'テーマ']}>
          <p>
            styled-components を学んだ今、もう一つの主要な CSS-in-JS ライブラリである Emotion を知ることで、
            プロジェクトに最適なツールを選択できるようになります。
            Emotion は styled-components と似た API に加え、より柔軟な「css prop」というアプローチを提供します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: インストール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">インストールとセットアップ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion は主に2つのパッケージから構成されています。
              用途に応じて必要なパッケージをインストールします。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`# css prop を使う場合（推奨）
npm install @emotion/react

# styled API も使う場合（styled-components 風の書き方）
npm install @emotion/react @emotion/styled`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Vite でのセットアップ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion の css prop を使うには、JSX の変換方法を設定する必要があります。
              方法は2つあります。
            </p>

            <CodeBlock
              language="typescript"
              title="方法1: vite.config.ts で設定（推奨）"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',  // Emotion の JSX 変換を使用
      babel: {
        plugins: ['@emotion/babel-plugin'],  // オプション: 追加最適化
      },
    }),
  ],
});`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="typescript"
              title="方法2: tsconfig.json で設定"
              code={`{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="方法3: ファイル単位で設定（JSX pragma）"
              code={`// ファイルの先頭にこのコメントを追加
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

// このファイル内で css prop が使える
function App() {
  return (
    <div css={css\`padding: 24px;\`}>
      こんにちは
    </div>
  );
}`}
            />

            <InfoBox type="info" title="どの方法を選ぶ？">
              <p>
                プロジェクト全体で Emotion を使う場合は方法1（vite.config.ts）がおすすめです。
                部分的にだけ使う場合や、試しに使ってみたい場合は方法3（JSX pragma）が手軽です。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: css prop */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">css prop アプローチ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion の最大の特徴は <code className="bg-muted px-1.5 py-0.5 rounded text-sm">css</code> prop です。
              既存の HTML 要素やコンポーネントに直接スタイルを渡せます。
              新しいコンポーネントを作成する必要がないのが大きな利点です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">テンプレートリテラル記法</h3>
            <CodeBlock
              language="tsx"
              title="css prop + テンプレートリテラル"
              code={`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Card() {
  return (
    <div
      css={css\`
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

        &:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
      \`}
    >
      <h3
        css={css\`
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 8px;
        \`}
      >
        カードタイトル
      </h3>
      <p
        css={css\`
          color: #64748b;
          line-height: 1.6;
        \`}
      >
        カードの説明文です。
      </p>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">オブジェクト記法</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS をオブジェクトとして書く方法もあります。TypeScript との相性が良く、
              プロパティ名の補完が効きます。
            </p>

            <CodeBlock
              language="tsx"
              title="css prop + オブジェクト記法"
              code={`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Card() {
  return (
    <div
      css={{
        background: 'white',
        borderRadius: 12,        // 数値は px に変換される
        padding: 24,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {             // ネストもオブジェクトで
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
        '@media (max-width: 768px)': {  // メディアクエリ
          padding: 16,
        },
      }}
    >
      <h3 css={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>
        カードタイトル
      </h3>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">スタイルを変数に抽出</h3>
            <CodeBlock
              language="tsx"
              title="スタイルの分離"
              code={`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// スタイルを変数として定義
const cardStyle = css\`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
\`;

const titleStyle = css\`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
\`;

// 動的スタイルは関数で
const statusStyle = (isActive: boolean) => css\`
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: \${isActive ? '#dcfce7' : '#fee2e2'};
  color: \${isActive ? '#16a34a' : '#dc2626'};
\`;

function StatusCard({ title, isActive }: { title: string; isActive: boolean }) {
  return (
    <div css={cardStyle}>
      <h3 css={titleStyle}>{title}</h3>
      <span css={statusStyle(isActive)}>
        {isActive ? 'アクティブ' : '非アクティブ'}
      </span>
    </div>
  );
}`}
            />
          </section>

          {/* セクション3: styled アプローチ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">styled アプローチ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@emotion/styled</code> を使うと、
              styled-components とほぼ同じ API でスタイルコンポーネントを作成できます。
            </p>

            <CodeBlock
              language="tsx"
              title="@emotion/styled の使い方"
              code={`import styled from '@emotion/styled';

// styled-components とほぼ同じ API
const Container = styled.div\`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
\`;

const Title = styled.h1\`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
\`;

// props ベースの動的スタイル
const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>\`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  background: \${(props) => (props.$variant === 'primary' ? '#3b82f6' : '#f1f5f9')};
  color: \${(props) => (props.$variant === 'primary' ? 'white' : '#334155')};

  &:hover {
    opacity: 0.9;
  }
\`;

// スタイルの拡張
const RoundButton = styled(Button)\`
  border-radius: 9999px;
\`;

// オブジェクト記法も可能
const Badge = styled.span({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: 9999,
  fontSize: '0.75rem',
  fontWeight: 500,
  backgroundColor: '#eff6ff',
  color: '#3b82f6',
});`}
            />

            <InfoBox type="info" title="styled-components からの移行">
              <p>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@emotion/styled</code> は
                styled-components と API がほぼ同じです。
                import 文を <code className="bg-muted px-1.5 py-0.5 rounded text-sm">import styled from '@emotion/styled'</code>
                に変更するだけで、多くのコードがそのまま動きます。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: スタイルの合成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スタイルの合成（Composition）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion の大きな強みの一つが、スタイルの合成です。
              複数のスタイルを組み合わせて、新しいスタイルを作れます。
            </p>

            <CodeBlock
              language="tsx"
              title="配列でスタイルを合成"
              code={`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// ベーススタイル
const baseButton = css\`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
\`;

// バリアントスタイル
const primaryStyle = css\`
  background: #3b82f6;
  color: white;
  &:hover { background: #2563eb; }
\`;

const secondaryStyle = css\`
  background: #f1f5f9;
  color: #334155;
  &:hover { background: #e2e8f0; }
\`;

const outlineStyle = css\`
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  &:hover { background: #eff6ff; }
\`;

// サイズスタイル
const smallSize = css\`
  padding: 6px 12px;
  font-size: 0.8rem;
\`;

const largeSize = css\`
  padding: 14px 28px;
  font-size: 1rem;
\`;

// 配列で合成！後のスタイルが優先される
type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variantMap = { primary: primaryStyle, secondary: secondaryStyle, outline: outlineStyle };
const sizeMap = { sm: smallSize, md: css\`\`, lg: largeSize };

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
}

function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
  return (
    <button css={[baseButton, variantMap[variant], sizeMap[size]]}>
      {children}
    </button>
  );
}

// 使用例
function App() {
  return (
    <div>
      <Button variant="primary" size="lg">大きなプライマリ</Button>
      <Button variant="outline" size="sm">小さなアウトライン</Button>
      <Button variant="secondary">セカンダリ</Button>
    </div>
  );
}`}
            />

            <InfoBox type="success" title="合成の利点">
              <p>
                スタイルの合成により、基本スタイルとバリアントスタイルを明確に分離できます。
                配列の後ろのスタイルが前のスタイルを上書きするため、
                スタイルの優先順位が直感的で予測可能です。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: テーミング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テーミング</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion にも ThemeProvider があり、styled-components と同様にテーマを管理できます。
              さらに、css prop と組み合わせることもできます。
            </p>

            <CodeBlock
              language="tsx"
              title="Emotion のテーミング"
              code={`/** @jsxImportSource @emotion/react */
import { css, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

// テーマの型定義
interface AppTheme {
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  spacing: (factor: number) => string;
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Emotion のテーマ型を拡張
declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}

// テーマ定義
const lightTheme: AppTheme = {
  colors: {
    primary: '#3b82f6',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textMuted: '#64748b',
    border: '#e2e8f0',
  },
  spacing: (factor: number) => \`\${factor * 8}px\`,
  radius: { sm: '4px', md: '8px', lg: '12px' },
};

const darkTheme: AppTheme = {
  ...lightTheme,
  colors: {
    primary: '#60a5fa',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: '#334155',
  },
};

// styled で使う場合
const Card = styled.div\`
  background: \${(props) => props.theme.colors.surface};
  color: \${(props) => props.theme.colors.text};
  border: 1px solid \${(props) => props.theme.colors.border};
  border-radius: \${(props) => props.theme.radius.lg};
  padding: \${(props) => props.theme.spacing(3)};
\`;

// css prop で使う場合（useTheme フック）
function ThemedContent() {
  const theme = useTheme();

  return (
    <div
      css={css\`
        background: \${theme.colors.surface};
        padding: \${theme.spacing(3)};
        border-radius: \${theme.radius.lg};
      \`}
    >
      <p css={{ color: theme.colors.text }}>テーマから色を取得</p>
      <p css={{ color: theme.colors.textMuted }}>ミュートテキスト</p>
    </div>
  );
}

// css prop + theme コールバック（useTheme 不要）
function ThemedButton() {
  return (
    <button
      css={(theme) => ({
        padding: theme.spacing(1.5) + ' ' + theme.spacing(3),
        background: theme.colors.primary,
        color: 'white',
        border: 'none',
        borderRadius: theme.radius.md,
        fontWeight: 600,
        cursor: 'pointer',
      })}
    >
      テーマボタン
    </button>
  );
}

// アプリ
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Card>
        <ThemedContent />
        <ThemedButton />
        <button onClick={() => setIsDark(!isDark)}>テーマ切替</button>
      </Card>
    </ThemeProvider>
  );
}`}
            />
          </section>

          {/* セクション6: styled-components との比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">styled-components との比較</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left font-semibold">特徴</th>
                    <th className="border border-border px-4 py-3 text-left font-semibold">styled-components</th>
                    <th className="border border-border px-4 py-3 text-left font-semibold">Emotion</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">styled API</td>
                    <td className="border border-border px-4 py-2">対応</td>
                    <td className="border border-border px-4 py-2">対応（@emotion/styled）</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">css prop</td>
                    <td className="border border-border px-4 py-2">v6 で対応（限定的）</td>
                    <td className="border border-border px-4 py-2">完全対応（主要機能）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">オブジェクト記法</td>
                    <td className="border border-border px-4 py-2">対応</td>
                    <td className="border border-border px-4 py-2">対応</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">テンプレートリテラル</td>
                    <td className="border border-border px-4 py-2">対応</td>
                    <td className="border border-border px-4 py-2">対応</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">スタイルの合成</td>
                    <td className="border border-border px-4 py-2">拡張のみ</td>
                    <td className="border border-border px-4 py-2">配列で合成可能</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">バンドルサイズ</td>
                    <td className="border border-border px-4 py-2">約 12.7 kB</td>
                    <td className="border border-border px-4 py-2">約 11.2 kB</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">パフォーマンス</td>
                    <td className="border border-border px-4 py-2">良好</td>
                    <td className="border border-border px-4 py-2">やや良好（ベンチマーク上）</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">コミュニティ</td>
                    <td className="border border-border px-4 py-2">非常に大きい</td>
                    <td className="border border-border px-4 py-2">大きい</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">MUI との関係</td>
                    <td className="border border-border px-4 py-2">MUI v4 で使用</td>
                    <td className="border border-border px-4 py-2">MUI v5 のデフォルト</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">SSR</td>
                    <td className="border border-border px-4 py-2">ServerStyleSheet が必要</td>
                    <td className="border border-border px-4 py-2">extractCritical が必要</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">同じコンポーネントを両方で書く</h3>
            <CodeBlock
              language="tsx"
              title="styled-components 版"
              code={`// styled-components
import styled from 'styled-components';

const Alert = styled.div<{ $type: 'info' | 'warning' | 'error' }>\`
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
  background-color: \${(props) =>
    props.$type === 'error' ? '#fef2f2' :
    props.$type === 'warning' ? '#fffbeb' : '#eff6ff'};
  border-color: \${(props) =>
    props.$type === 'error' ? '#ef4444' :
    props.$type === 'warning' ? '#f59e0b' : '#3b82f6'};
  color: \${(props) =>
    props.$type === 'error' ? '#991b1b' :
    props.$type === 'warning' ? '#92400e' : '#1e40af'};
\`;

// 使用: <Alert $type="error">エラーメッセージ</Alert>`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="Emotion css prop 版"
              code={`// Emotion (css prop)
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const alertColors = {
  info: { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af' },
  warning: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e' },
  error: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
};

function Alert({ type, children }: { type: 'info' | 'warning' | 'error'; children: React.ReactNode }) {
  const colors = alertColors[type];

  return (
    <div
      css={css\`
        padding: 16px;
        border-radius: 8px;
        border-left: 4px solid \${colors.border};
        background-color: \${colors.bg};
        color: \${colors.text};
      \`}
    >
      {children}
    </div>
  );
}

// 使用: <Alert type="error">エラーメッセージ</Alert>`}
            />
          </section>

          {/* セクション7: Emotion を選ぶ理由 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Emotion を選ぶ場面</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Emotion が向いている場合</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>css prop で手軽にスタイルを当てたい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>スタイルの合成（配列による合成）を多用する</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>MUI（Material UI）v5 を使う予定がある</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>styled と css prop を混在させたい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>バンドルサイズを少しでも抑えたい</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">styled-components が向いている場合</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>styled API のみで統一したい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>より大きなコミュニティ・エコシステムを求める</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>学習リソースが豊富な方が良い</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>チームに styled-components 経験者が多い</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>JSX pragma の設定を避けたい</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* セクション8: 実践例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: レスポンシブレイアウト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion の css prop を使って、レスポンシブなレイアウトコンポーネントを作ります。
              実際のプロジェクトでよく使われるパターンを紹介します。
            </p>

            <CodeBlock
              language="tsx"
              title="レスポンシブグリッドレイアウト"
              code={`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// ===== ブレイクポイント定義 =====
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// メディアクエリヘルパー
const mq = {
  sm: \`@media (min-width: \${breakpoints.sm}px)\`,
  md: \`@media (min-width: \${breakpoints.md}px)\`,
  lg: \`@media (min-width: \${breakpoints.lg}px)\`,
  xl: \`@media (min-width: \${breakpoints.xl}px)\`,
};

// ===== 共通スタイル =====
const containerStyle = css\`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;

  \${mq.md} {
    padding: 0 24px;
  }

  \${mq.lg} {
    padding: 0 32px;
  }
\`;

// ===== グリッドコンポーネント =====
interface GridProps {
  columns?: { sm?: number; md?: number; lg?: number };
  gap?: number;
  children: React.ReactNode;
}

function Grid({ columns = { sm: 1, md: 2, lg: 3 }, gap = 24, children }: GridProps) {
  return (
    <div
      css={css\`
        display: grid;
        gap: \${gap}px;
        grid-template-columns: 1fr;

        \${mq.sm} {
          grid-template-columns: repeat(\${columns.sm || 1}, 1fr);
        }

        \${mq.md} {
          grid-template-columns: repeat(\${columns.md || 2}, 1fr);
        }

        \${mq.lg} {
          grid-template-columns: repeat(\${columns.lg || 3}, 1fr);
        }
      \`}
    >
      {children}
    </div>
  );
}

// ===== カードコンポーネント =====
const cardStyle = css\`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
\`;

const cardImageStyle = css\`
  width: 100%;
  height: 200px;
  object-fit: cover;
\`;

const cardBodyStyle = css\`
  padding: 20px;
\`;

const cardTitleStyle = css\`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
\`;

const cardDescStyle = css\`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
\`;

interface PortfolioCardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
}

function PortfolioCard({ image, title, description, tags }: PortfolioCardProps) {
  return (
    <div css={cardStyle}>
      <img css={cardImageStyle} src={image} alt={title} />
      <div css={cardBodyStyle}>
        <h3 css={cardTitleStyle}>{title}</h3>
        <p css={cardDescStyle}>{description}</p>
        <div
          css={css\`
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 12px;
          \`}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              css={css\`
                padding: 2px 10px;
                border-radius: 9999px;
                font-size: 0.7rem;
                font-weight: 500;
                background: #eff6ff;
                color: #3b82f6;
              \`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== ページコンポーネント =====
const projects = [
  {
    image: '/project1.jpg',
    title: 'ECサイトリデザイン',
    description: 'ユーザー体験を改善するためのECサイト全体のリデザイン',
    tags: ['UI/UX', 'Figma', 'React'],
  },
  {
    image: '/project2.jpg',
    title: 'ダッシュボード設計',
    description: 'データ可視化ダッシュボードのUI設計と実装',
    tags: ['Dashboard', 'D3.js', 'TypeScript'],
  },
  {
    image: '/project3.jpg',
    title: 'モバイルアプリUI',
    description: 'フィットネスアプリのモバイルUI設計',
    tags: ['Mobile', 'React Native', 'UI'],
  },
];

export default function PortfolioPage() {
  return (
    <div css={containerStyle}>
      <h1
        css={css\`
          font-size: 2rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 32px;

          \${mq.md} {
            font-size: 2.5rem;
          }
        \`}
      >
        ポートフォリオ
      </h1>
      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={24}>
        {projects.map((project) => (
          <PortfolioCard key={project.title} {...project} />
        ))}
      </Grid>
    </div>
  );
}`}
            />
          </section>

          {/* セクション9: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>

            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">1.</span>
                  <span><strong>Emotion</strong> は css prop と styled の2つのアプローチを提供する CSS-in-JS ライブラリ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">2.</span>
                  <span><strong>css prop</strong> は新しいコンポーネントを作らずに既存要素にスタイルを適用でき、手軽さが魅力</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">3.</span>
                  <span><strong>スタイルの合成</strong>（配列での結合）は Emotion の大きな強み</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">4.</span>
                  <span><strong>テンプレートリテラル</strong>と<strong>オブジェクト記法</strong>の両方が使えるため、好みに応じて選択可能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">5.</span>
                  <span><strong>MUI v5</strong> が Emotion をデフォルトのスタイリングエンジンとして採用しているため、MUI と組み合わせる場合に特に有力</span>
                </li>
              </ul>
            </div>

            <div className="mt-6" />

            <InfoBox type="success" title="次のステップ">
              <p>
                ここまでで主要な CSS-in-JS ライブラリを学びました。
                次のステップでは、CSS 設計パターン（BEM、SMACSS、Atomic Design など）を学び、
                どのアプローチを選んでもスケーラブルな CSS を書くための設計指針を身につけます。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
