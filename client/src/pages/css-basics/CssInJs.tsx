import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function CssInJs() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 18</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">CSS-in-JS の考え方</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          JavaScript の中に CSS を書く「CSS-in-JS」という考え方を学びます。
          なぜ生まれたのか、どんなメリット・デメリットがあるのかを他のアプローチと比較しながら理解しましょう。
        </p>

        <WhyNowBox tags={['CSS-in-JS', 'styled-components', 'Emotion', '設計思想']}>
          <p>
            前のステップでプレーン CSS と CSS Modules を学びました。
            しかし、React のコンポーネント指向と CSS を完全に統合するアプローチとして CSS-in-JS が生まれました。
            コンポーネントのロジック・構造・スタイルを1つのファイルに凝集させるこの考え方は、
            React エコシステムで広く採用されています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: CSS-in-JS とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS-in-JS とは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS-in-JS は、JavaScript（または TypeScript）のコード内にスタイルを記述するアプローチの総称です。
              スタイルはコンポーネントと同じファイル内に書かれ、JavaScript の力を使って動的にスタイルを生成します。
            </p>

            <CodeBlock
              language="tsx"
              title="CSS-in-JS の基本的なイメージ"
              code={`import styled from 'styled-components';

// JavaScript の中で CSS を書く
const Button = styled.button\`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: \${(props) => props.$primary ? '#3b82f6' : '#e2e8f0'};
  color: \${(props) => props.$primary ? 'white' : '#334155'};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
\`;

// スタイル付きコンポーネントとして使う
function App() {
  return (
    <div>
      <Button>通常ボタン</Button>
      <Button $primary>プライマリボタン</Button>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">CSS-in-JS が生まれた背景</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              2014年、Facebook の Christopher Chedeau（vjeux）が「CSS の7つの問題」を提唱しました。
              これが CSS-in-JS ムーブメントのきっかけです。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-3">CSS の7つの問題</h4>
              <ol className="space-y-2 text-foreground/80 text-sm list-decimal list-inside">
                <li><strong>グローバルスコープ</strong> — すべてのスタイルがグローバルに適用される</li>
                <li><strong>依存関係</strong> — コンポーネントとスタイルの依存関係が不明確</li>
                <li><strong>デッドコードの除去</strong> — 使われていないスタイルの検出が困難</li>
                <li><strong>圧縮</strong> — クラス名の圧縮が難しい</li>
                <li><strong>定数の共有</strong> — CSS と JS で値を共有できない</li>
                <li><strong>非決定的な解決</strong> — スタイルの適用順序が予測不能</li>
                <li><strong>分離</strong> — スタイルの分離・カプセル化が困難</li>
              </ol>
            </div>
          </section>

          {/* セクション2: 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS アプローチ比較</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React で使える主要な CSS アプローチを比較します。
              それぞれの特徴を理解して、プロジェクトに最適なアプローチを選びましょう。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-3 py-3 text-left font-semibold">特徴</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">プレーン CSS</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">CSS Modules</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">CSS-in-JS</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">Utility-first (Tailwind)</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">スコープ</td>
                    <td className="border border-border px-3 py-2">グローバル</td>
                    <td className="border border-border px-3 py-2">ファイル単位</td>
                    <td className="border border-border px-3 py-2">コンポーネント単位</td>
                    <td className="border border-border px-3 py-2">ユーティリティクラス</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">記述場所</td>
                    <td className="border border-border px-3 py-2">.css ファイル</td>
                    <td className="border border-border px-3 py-2">.module.css ファイル</td>
                    <td className="border border-border px-3 py-2">.tsx ファイル内</td>
                    <td className="border border-border px-3 py-2">className 属性</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">動的スタイル</td>
                    <td className="border border-border px-3 py-2">CSS 変数のみ</td>
                    <td className="border border-border px-3 py-2">クラス切替</td>
                    <td className="border border-border px-3 py-2">JS で自由自在</td>
                    <td className="border border-border px-3 py-2">クラス切替</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">TypeScript 対応</td>
                    <td className="border border-border px-3 py-2">なし</td>
                    <td className="border border-border px-3 py-2">型定義が必要</td>
                    <td className="border border-border px-3 py-2">ネイティブ対応</td>
                    <td className="border border-border px-3 py-2">なし</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">テーマ対応</td>
                    <td className="border border-border px-3 py-2">CSS 変数</td>
                    <td className="border border-border px-3 py-2">CSS 変数</td>
                    <td className="border border-border px-3 py-2">ThemeProvider</td>
                    <td className="border border-border px-3 py-2">設定ファイル</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">ランタイムコスト</td>
                    <td className="border border-border px-3 py-2">なし</td>
                    <td className="border border-border px-3 py-2">なし</td>
                    <td className="border border-border px-3 py-2">あり（一部ゼロランタイムも）</td>
                    <td className="border border-border px-3 py-2">なし</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">バンドルサイズ</td>
                    <td className="border border-border px-3 py-2">CSS のみ</td>
                    <td className="border border-border px-3 py-2">CSS のみ</td>
                    <td className="border border-border px-3 py-2">ライブラリ + CSS</td>
                    <td className="border border-border px-3 py-2">最適化された CSS</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">SSR 対応</td>
                    <td className="border border-border px-3 py-2">問題なし</td>
                    <td className="border border-border px-3 py-2">問題なし</td>
                    <td className="border border-border px-3 py-2">追加設定が必要</td>
                    <td className="border border-border px-3 py-2">問題なし</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">学習コスト</td>
                    <td className="border border-border px-3 py-2">低い</td>
                    <td className="border border-border px-3 py-2">低い</td>
                    <td className="border border-border px-3 py-2">中程度</td>
                    <td className="border border-border px-3 py-2">中程度</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">デザイナーとの連携</td>
                    <td className="border border-border px-3 py-2">容易</td>
                    <td className="border border-border px-3 py-2">容易</td>
                    <td className="border border-border px-3 py-2">JS 知識が必要</td>
                    <td className="border border-border px-3 py-2">クラス名の理解が必要</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション3: メリット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS-in-JS のメリット</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. コロケーション（同じ場所にまとめる）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コンポーネントのロジック、マークアップ、スタイルがすべて1つのファイルにまとまります。
              コンポーネントを削除すれば、関連するスタイルも自動的に消えます。
            </p>

            <CodeBlock
              language="tsx"
              title="すべてが1ファイルに凝集"
              code={`import styled from 'styled-components';
import { useState } from 'react';

// スタイル定義
const Wrapper = styled.div\`
  padding: 24px;
  border-radius: 12px;
  background: white;
\`;

const Counter = styled.span<{ $isNegative: boolean }>\`
  font-size: 3rem;
  font-weight: bold;
  color: \${(props) => (props.$isNegative ? '#ef4444' : '#10b981')};
\`;

// ロジック + マークアップ + スタイルが1つのファイルに
export default function CounterCard() {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
      <Counter $isNegative={count < 0}>{count}</Counter>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </Wrapper>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2. 動的スタイル</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              JavaScript の変数や props を使って、スタイルを動的に変更できます。
              CSS だけでは実現が難しい条件分岐やアニメーションも自然に書けます。
            </p>

            <CodeBlock
              language="tsx"
              title="props に基づく動的スタイル"
              code={`import styled from 'styled-components';

interface ProgressBarProps {
  value: number;     // 0-100
  color?: string;
}

const Track = styled.div\`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
\`;

const Fill = styled.div<{ $value: number; $color: string }>\`
  height: 100%;
  width: \${(props) => props.$value}%;
  background: \${(props) => props.$color};
  border-radius: 4px;
  transition: width 0.3s ease;
\`;

function ProgressBar({ value, color = '#3b82f6' }: ProgressBarProps) {
  return (
    <Track>
      <Fill $value={Math.min(100, Math.max(0, value))} $color={color} />
    </Track>
  );
}

// 使用例
<ProgressBar value={75} />
<ProgressBar value={30} color="#10b981" />
<ProgressBar value={90} color="#f59e0b" />`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3. テーミング</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              アプリケーション全体のテーマ（色、フォント、スペーシングなど）を
              JavaScript オブジェクトとして定義し、すべてのコンポーネントから参照できます。
            </p>

            <CodeBlock
              language="tsx"
              title="テーマを使ったスタイリング"
              code={`import { ThemeProvider } from 'styled-components';

// テーマを JavaScript オブジェクトとして定義
const lightTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    text: '#1e293b',
    muted: '#64748b',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
};

const darkTheme = {
  ...lightTheme,
  colors: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    background: '#0f172a',
    text: '#f1f5f9',
    muted: '#94a3b8',
  },
};

// テーマを参照するコンポーネント
const Card = styled.div\`
  background: \${(props) => props.theme.colors.background};
  color: \${(props) => props.theme.colors.text};
  padding: \${(props) => props.theme.spacing.lg};
  border-radius: \${(props) => props.theme.borderRadius.lg};
\`;

// ThemeProvider でテーマを注入
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Card>テーマに応じてスタイルが変わる</Card>
    </ThemeProvider>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4. TypeScript との統合</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS-in-JS では、スタイルの props に型を付けられます。
              存在しない props を渡そうとするとコンパイルエラーになるため、安全です。
            </p>

            <CodeBlock
              language="tsx"
              title="型安全なスタイル props"
              code={`import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyleProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
}

const sizeMap: Record<ButtonSize, { padding: string; fontSize: string }> = {
  sm: { padding: '6px 12px', fontSize: '0.75rem' },
  md: { padding: '8px 16px', fontSize: '0.875rem' },
  lg: { padding: '12px 24px', fontSize: '1rem' },
};

const colorMap: Record<ButtonVariant, { bg: string; hover: string }> = {
  primary: { bg: '#3b82f6', hover: '#2563eb' },
  secondary: { bg: '#6b7280', hover: '#4b5563' },
  danger: { bg: '#ef4444', hover: '#dc2626' },
};

// TypeScript で props の型を定義
const StyledButton = styled.button<ButtonStyleProps>\`
  padding: \${(props) => sizeMap[props.$size].padding};
  font-size: \${(props) => sizeMap[props.$size].fontSize};
  background-color: \${(props) => colorMap[props.$variant].bg};
  color: white;
  border: none;
  border-radius: 6px;
  width: \${(props) => (props.$fullWidth ? '100%' : 'auto')};
  cursor: pointer;

  &:hover {
    background-color: \${(props) => colorMap[props.$variant].hover};
  }
\`;

// 使用時に型チェックが効く
<StyledButton $variant="primary" $size="md">OK</StyledButton>
<StyledButton $variant="danger" $size="lg" $fullWidth>削除</StyledButton>
// ❌ TypeScript エラー: "huge" は ButtonSize に存在しない
// <StyledButton $variant="primary" $size="huge">NG</StyledButton>`}
            />
          </section>

          {/* セクション4: デメリット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS-in-JS のデメリット</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. ランタイムコスト</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components や Emotion はランタイムでスタイルを生成します。
              コンポーネントがレンダリングされるたびに CSS を解析し、
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;style&gt;</code> タグに挿入するため、パフォーマンスに影響があります。
            </p>

            <CodeBlock
              language="tsx"
              title="ランタイムコストのイメージ"
              code={`// レンダリングごとにこの処理が走る:
// 1. テンプレートリテラルを解析
// 2. props を展開して CSS 文字列を生成
// 3. CSS をハッシュ化してクラス名を生成
// 4. <style> タグに CSS を挿入
// 5. コンポーネントにクラス名を適用

const Box = styled.div\`
  padding: \${(props) => props.$padding}px;  // レンダリングごとに評価
  color: \${(props) => props.theme.colors.text};  // テーマ変更で再評価
\`;`}
            />

            <InfoBox type="warning" title="パフォーマンスへの影響">
              <p>
                大量のコンポーネントが頻繁に再レンダリングされるアプリケーション（データテーブル、アニメーションなど）では、
                ランタイム CSS-in-JS がボトルネックになることがあります。
                ベンチマークでは、CSS Modules や Tailwind と比べて数倍遅いケースも報告されています。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2. バンドルサイズ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS-in-JS ライブラリ自体のサイズがバンドルに追加されます。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-3">ライブラリサイズの目安（gzip 圧縮後）</h4>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li><strong>styled-components:</strong> 約 12.7 kB</li>
                <li><strong>@emotion/react + @emotion/styled:</strong> 約 11.2 kB</li>
                <li><strong>CSS Modules:</strong> 0 kB（ビルド時に処理）</li>
                <li><strong>Tailwind CSS:</strong> 0 kB（CSS のみ、JS ライブラリ不要）</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3. 学習コスト</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Tagged Template Literals、props ベースのスタイリング、テーマの設定など、
              CSS だけの知識では使いこなせない概念が必要です。
              特にデザイナーがコードに触れる場合、学習のハードルになることがあります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4. SSR との相性</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              サーバーサイドレンダリング（Next.js など）では、追加の設定が必要です。
              ランタイム CSS-in-JS はサーバーでスタイルを抽出してHTMLに埋め込む処理が必要で、
              React Server Components との互換性にも制約があります。
            </p>

            <InfoBox type="info" title="React Server Components との関係">
              <p>
                Next.js の App Router で使われる React Server Components は、
                ランタイム CSS-in-JS（styled-components, Emotion）と直接は互換性がありません。
                Client Components 内でのみ使用する必要があります。
                これが近年ゼロランタイム CSS-in-JS や Tailwind CSS への移行が進む背景です。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: ライブラリ概観 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">主要な CSS-in-JS ライブラリ</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">ランタイム CSS-in-JS</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ブラウザ上（ランタイム）でスタイルを生成するライブラリです。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h4 className="font-bold text-foreground mb-2">styled-components</h4>
                <p className="text-sm text-foreground/80 mb-3">
                  最も人気のある CSS-in-JS ライブラリ。Tagged Template Literals を使ったAPIで、
                  CSS の書き心地をそのままにコンポーネントを作れます。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">人気No.1</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">豊富なドキュメント</span>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h4 className="font-bold text-foreground mb-2">Emotion</h4>
                <p className="text-sm text-foreground/80 mb-3">
                  styled-components と似た API に加え、css prop というシンプルな記法も提供。
                  柔軟性が高く、ライブラリのサイズも若干小さいです。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">柔軟な API</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">css prop</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">ゼロランタイム CSS-in-JS</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ビルド時にスタイルを静的な CSS ファイルに変換するライブラリです。
              ランタイムコストがゼロで、パフォーマンスと開発体験の両立を目指します。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h4 className="font-bold text-foreground mb-2">vanilla-extract</h4>
                <p className="text-sm text-foreground/80 mb-3">
                  TypeScript でスタイルを書き、ビルド時に CSS ファイルを生成。
                  完全な型安全性とゼロランタイムを両立します。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">ゼロランタイム</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">型安全</span>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h4 className="font-bold text-foreground mb-2">Panda CSS</h4>
                <p className="text-sm text-foreground/80 mb-3">
                  CSS-in-JS の開発体験と Tailwind の軽量さを組み合わせた新世代ツール。
                  ビルド時に最適化された CSS を生成します。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">ゼロランタイム</span>
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">新世代</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">各ライブラリの API 比較</h3>
            <CodeBlock
              language="tsx"
              title="同じコンポーネントを各ライブラリで書いた場合"
              code={`// === styled-components ===
import styled from 'styled-components';

const Card = styled.div\`
  padding: 24px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
\`;


// === Emotion (styled) ===
import styled from '@emotion/styled';

const Card = styled.div\`
  padding: 24px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
\`;


// === Emotion (css prop) ===
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Card({ children }) {
  return (
    <div css={css\`
      padding: 24px;
      border-radius: 12px;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    \`}>
      {children}
    </div>
  );
}


// === vanilla-extract ===
// Card.css.ts（.css.ts 拡張子が必要）
import { style } from '@vanilla-extract/css';

export const card = style({
  padding: 24,
  borderRadius: 12,
  background: 'white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

// Card.tsx
import { card } from './Card.css';

function Card({ children }) {
  return <div className={card}>{children}</div>;
}


// === Panda CSS ===
import { css } from '../styled-system/css';

function Card({ children }) {
  return (
    <div className={css({
      padding: '24px',
      borderRadius: '12px',
      background: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    })}>
      {children}
    </div>
  );
}`}
            />
          </section>

          {/* セクション6: いつ CSS-in-JS を使うか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS-in-JS を選ぶべき場面</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">CSS-in-JS が向いている場合</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>コンポーネントライブラリの開発</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>複雑な動的スタイルが多い</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>テーマの切り替え機能が必要</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>TypeScript との統合を重視</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>SPA（Single Page Application）</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">他のアプローチが良い場合</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>パフォーマンスが最優先</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>Next.js App Router（Server Components）がメイン</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>バンドルサイズを極力抑えたい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>デザイナーが直接 CSS を編集する体制</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>スタイルが静的でほとんど変化しない</span>
                  </li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="業界のトレンド">
              <p>
                2024-2025年のトレンドとしては、ランタイム CSS-in-JS から Tailwind CSS やゼロランタイム CSS-in-JS への移行が進んでいます。
                しかし、styled-components や Emotion は依然として多くのプロジェクトで使われており、
                既存コードの保守や理解のために学ぶ価値は十分にあります。
                次のステップでは、最も人気のある styled-components を実際に使ってみましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>

            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">1.</span>
                  <span><strong>CSS-in-JS</strong> は JavaScript 内に CSS を書くアプローチで、コンポーネントとスタイルの完全な統合を実現する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">2.</span>
                  <span><strong>メリット:</strong> コロケーション、動的スタイル、テーミング、TypeScript 対応</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">3.</span>
                  <span><strong>デメリット:</strong> ランタイムコスト、バンドルサイズ増加、学習コスト、SSR との複雑さ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">4.</span>
                  <span><strong>ランタイム</strong>（styled-components, Emotion）と<strong>ゼロランタイム</strong>（vanilla-extract, Panda CSS）の2種類がある</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">5.</span>
                  <span>プロジェクトの要件（パフォーマンス、チーム構成、フレームワーク）に応じて最適なアプローチを選ぶ</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
