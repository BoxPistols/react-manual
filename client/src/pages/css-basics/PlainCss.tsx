import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function PlainCss() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 17</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">プレーン CSS と CSS Modules</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React でスタイリングを始める最もシンプルな方法、プレーン CSS と CSS Modules を学びます。
          グローバル CSS の問題点を理解し、CSS Modules がどのように解決するかを見ていきましょう。
        </p>

        <WhyNowBox tags={['CSS', 'CSS Modules', 'スコープ', 'Vite']}>
          <p>
            ここまでで React のコンポーネント設計や状態管理を学んできました。
            しかし、見た目を整えなければアプリケーションは完成しません。
            デザイナーにとって CSS は最も馴染みのあるツールです。
            まずは React でプレーン CSS をどう使うか、そしてその課題を CSS Modules がどう解決するかを理解しましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: React でのプレーン CSS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React でプレーン CSS を使う</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React でプレーン CSS を使う方法は非常にシンプルです。
              CSS ファイルを作成し、コンポーネントから <code className="bg-muted px-1.5 py-0.5 rounded text-sm">import</code> するだけです。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">CSS ファイルの作成</h3>
            <CodeBlock
              language="css"
              title="src/styles/App.css"
              code={`/* グローバルに適用される CSS */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1a1a1a;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
}

.button:hover {
  background-color: #2563eb;
}`}
            />

            <div className="mt-4" />

            <h3 className="text-lg font-semibold text-foreground mb-3">コンポーネントでのインポート</h3>
            <CodeBlock
              language="tsx"
              title="src/App.tsx"
              code={`import './styles/App.css';

function App() {
  return (
    <div className="container">
      <h1 className="title">こんにちは React</h1>
      <div className="card">
        <p>カードコンテンツ</p>
        <button className="button">クリック</button>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="class ではなく className">
              <p>
                HTML では <code className="bg-muted px-1.5 py-0.5 rounded text-sm">class</code> 属性を使いますが、
                React (JSX) では <code className="bg-muted px-1.5 py-0.5 rounded text-sm">className</code> を使います。
                これは <code className="bg-muted px-1.5 py-0.5 rounded text-sm">class</code> が JavaScript の予約語であるためです。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: プレーン CSS の問題点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プレーン CSS の問題点</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              プレーン CSS は手軽ですが、React のコンポーネント設計と組み合わせると問題が生じます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">問題1: グローバルスコープ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS はすべてグローバルに適用されます。異なるコンポーネントで同じクラス名を使うと衝突します。
            </p>

            <CodeBlock
              language="css"
              title="src/components/Header.css"
              code={`/* Header コンポーネント用の .title */
.title {
  font-size: 1.5rem;
  color: white;
  background: #1e293b;
  padding: 16px;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="src/components/Article.css"
              code={`/* Article コンポーネント用の .title - 衝突！ */
.title {
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 16px;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="どちらの .title が適用される？"
              code={`// Header.tsx
import './Header.css';

function Header() {
  // .title のスタイルが Article.css で上書きされるかも！
  return <header className="title">サイトタイトル</header>;
}

// Article.tsx
import './Article.css';

function Article() {
  return <h1 className="title">記事タイトル</h1>;
}`}
            />

            <InfoBox type="warning" title="CSS の読み込み順に依存する">
              <p>
                どちらの CSS が「勝つ」かは、ファイルの読み込み順序に依存します。
                これは予測が難しく、コンポーネントが増えるにつれて管理が困難になります。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">問題2: 不要なスタイルの残存</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コンポーネントを削除しても、対応する CSS が残りがちです。
              使われていないスタイルがプロジェクト内に蓄積し、CSS ファイルが肥大化します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">問題3: 命名規則の負担</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              衝突を避けるために、BEM のような命名規則を導入する必要が出てきます。
              クラス名が長くなり、開発効率が下がることもあります。
            </p>

            <CodeBlock
              language="css"
              title="BEM で衝突を回避する例"
              code={`/* 衝突を避けるために長い名前になりがち */
.header__title { ... }
.header__title--large { ... }
.article__title { ... }
.article__title--highlighted { ... }
.sidebar__title { ... }
.sidebar__title--collapsed { ... }`}
            />
          </section>

          {/* セクション3: CSS Modules とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS Modules とは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules は、CSS クラス名を自動的にユニークな名前に変換する仕組みです。
              ファイル単位でスコープが生成されるため、クラス名の衝突を完全に防ぎます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">仕組み</h3>
            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <div className="space-y-3 text-foreground/80">
                <p><strong>1. ファイル名の規約:</strong> <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.module.css</code> という拡張子を使う</p>
                <p><strong>2. ビルド時の変換:</strong> <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.title</code> → <code className="bg-muted px-1.5 py-0.5 rounded text-sm">._title_x7h3k_1</code> のように変換される</p>
                <p><strong>3. JavaScript オブジェクト:</strong> クラス名をオブジェクトとしてインポートできる</p>
              </div>
            </div>

            <CodeBlock
              language="css"
              title="src/components/Card.module.css"
              code={`/* CSS Modules: .module.css という拡張子がポイント */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.description {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/components/Card.tsx"
              code={`// CSS Modules をオブジェクトとしてインポート
import styles from './Card.module.css';

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

function Card({ title, description, children }: CardProps) {
  return (
    // styles.card → "_card_x7h3k_1" のような一意のクラス名に変換される
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {children && (
        <div className={styles.footer}>{children}</div>
      )}
    </div>
  );
}

export default Card;`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="html"
              title="実際に生成される HTML（開発者ツールで確認）"
              code={`<!-- ユニークなクラス名が自動生成される -->
<div class="_card_x7h3k_1">
  <h3 class="_title_x7h3k_5">カードタイトル</h3>
  <p class="_description_x7h3k_12">カードの説明文...</p>
</div>`}
            />

            <InfoBox type="success" title="同じ .title でも衝突しない">
              <p>
                Header.module.css の <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.title</code> と
                Card.module.css の <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.title</code> は、
                ビルド後にそれぞれ異なるクラス名に変換されます。
                もう命名規則で悩む必要はありません。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: Vite での CSS Modules */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Vite での CSS Modules セットアップ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vite は CSS Modules をビルトインでサポートしています。追加の設定は一切不要です。
            </p>

            <CodeBlock
              language="tsx"
              title="設定不要！ファイル名を .module.css にするだけ"
              code={`// Vite では .module.css ファイルを import するだけで自動的に CSS Modules として扱われる
import styles from './Button.module.css';

// ✅ styles はオブジェクトとして使える
console.log(styles);
// → { button: "_button_a1b2c_1", primary: "_primary_a1b2c_8", ... }`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">TypeScript の型定義（オプション）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              TypeScript で CSS Modules を使う場合、型定義を追加すると補完が効くようになります。
            </p>

            <CodeBlock
              language="typescript"
              title="src/vite-env.d.ts（または global.d.ts）"
              code={`/// <reference types="vite/client" />

// CSS Modules の型定義
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}`}
            />

            <InfoBox type="info" title="Vite のデフォルト設定">
              <p>
                Vite は <code className="bg-muted px-1.5 py-0.5 rounded text-sm">vite/client</code> の型定義に
                CSS Modules の型が含まれています。通常は追加の設定なしで TypeScript と組み合わせて使えます。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Vite の CSS Modules 設定をカスタマイズ</h3>
            <CodeBlock
              language="typescript"
              title="vite.config.ts（必要な場合のみ）"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // クラス名の生成パターンをカスタマイズ
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // ローカルスコープをデフォルトにする（通常はデフォルト）
      scopeBehaviour: 'local',
    },
  },
});`}
            />
          </section>

          {/* セクション5: className の扱い方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">className の扱い方</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules では、クラス名をオブジェクトのプロパティとしてアクセスします。
              複数のクラスを組み合わせたり、条件付きで適用する方法を見ていきましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">基本的な className バインディング</h3>
            <CodeBlock
              language="tsx"
              title="単一クラス"
              code={`import styles from './Button.module.css';

// 単一クラスの適用
<button className={styles.button}>クリック</button>

// ハイフン付きクラス名はブラケット記法で
<button className={styles['primary-button']}>クリック</button>`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">複数クラスの結合</h3>
            <CodeBlock
              language="tsx"
              title="テンプレートリテラルで結合"
              code={`import styles from './Button.module.css';

// テンプレートリテラルで複数クラスを結合
<button className={\`\${styles.button} \${styles.primary}\`}>
  プライマリボタン
</button>

// 条件付きクラス
<button className={\`\${styles.button} \${isActive ? styles.active : ''}\`}>
  条件付きクラス
</button>

// 配列 + join でも可能
<button className={[styles.button, styles.large, styles.primary].join(' ')}>
  複数クラス
</button>`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">clsx / classnames ライブラリ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              複雑な条件付きクラスには、<code className="bg-muted px-1.5 py-0.5 rounded text-sm">clsx</code> や
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">classnames</code> ライブラリが便利です。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`npm install clsx`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="clsx を使った例"
              code={`import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

function Button({ variant = 'primary', size = 'md', disabled, children }: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,           // 常に適用
        styles[variant],         // variant に応じたクラス
        styles[size],            // size に応じたクラス
        disabled && styles.disabled  // disabled の時だけ適用
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}`}
            />
          </section>

          {/* セクション6: composes（スタイルの合成） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">composes でスタイルを合成する</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules には <code className="bg-muted px-1.5 py-0.5 rounded text-sm">composes</code> という独自の機能があり、
              他のクラスのスタイルを継承（合成）できます。
            </p>

            <CodeBlock
              language="css"
              title="src/components/Button.module.css"
              code={`/* ベーススタイル */
.base {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* composes でベーススタイルを継承 */
.primary {
  composes: base;
  background-color: #3b82f6;
  color: white;
}

.primary:hover {
  background-color: #2563eb;
}

.secondary {
  composes: base;
  background-color: #f1f5f9;
  color: #334155;
}

.secondary:hover {
  background-color: #e2e8f0;
}

.danger {
  composes: base;
  background-color: #ef4444;
  color: white;
}

.danger:hover {
  background-color: #dc2626;
}

/* 別ファイルからの合成も可能 */
.specialButton {
  composes: base;
  composes: shadow from './shared.module.css';
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="composes を使ったコンポーネント"
              code={`import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  variant?: Variant;
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  // composes により、styles.primary には base のスタイルも含まれる
  // 追加で base を指定する必要がない
  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}`}
            />

            <InfoBox type="info" title="composes はビルド時に解決される">
              <p>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">composes</code> はランタイムではなくビルド時に処理されます。
                生成される HTML には複数のクラス名が付与されるため、パフォーマンスへの影響はありません。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プレーン CSS vs CSS Modules 比較</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left text-sm font-semibold">特徴</th>
                    <th className="border border-border px-4 py-3 text-left text-sm font-semibold">プレーン CSS</th>
                    <th className="border border-border px-4 py-3 text-left text-sm font-semibold">CSS Modules</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-foreground/80">
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">スコープ</td>
                    <td className="border border-border px-4 py-3">グローバル</td>
                    <td className="border border-border px-4 py-3">ローカル（自動）</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-3 font-medium">クラス名の衝突</td>
                    <td className="border border-border px-4 py-3">起きる</td>
                    <td className="border border-border px-4 py-3">起きない</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">学習コスト</td>
                    <td className="border border-border px-4 py-3">なし</td>
                    <td className="border border-border px-4 py-3">ほぼなし</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-3 font-medium">ツール設定</td>
                    <td className="border border-border px-4 py-3">不要</td>
                    <td className="border border-border px-4 py-3">Vite では不要</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">命名規則</td>
                    <td className="border border-border px-4 py-3">BEM 等が必要</td>
                    <td className="border border-border px-4 py-3">自由に命名可能</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-3 font-medium">デバッグ</td>
                    <td className="border border-border px-4 py-3">直感的</td>
                    <td className="border border-border px-4 py-3">ハッシュ付きクラス名</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">動的スタイル</td>
                    <td className="border border-border px-4 py-3">CSS 変数のみ</td>
                    <td className="border border-border px-4 py-3">CSS 変数 + クラス切替</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-3 font-medium">コンポーネントとの結合</td>
                    <td className="border border-border px-4 py-3">弱い</td>
                    <td className="border border-border px-4 py-3">強い（同一ディレクトリに配置）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション8: 実践例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: カードコンポーネント</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules を使って、実際のプロジェクトで使えるカードコンポーネントを作ってみましょう。
            </p>

            <CodeBlock
              language="css"
              title="src/components/ProfileCard.module.css"
              code={`/* プロフィールカードのスタイル */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 320px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e2e8f0;
  margin-bottom: 16px;
}

.name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.role {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 16px;
}

.bio {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
}

.tag {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #eff6ff;
  color: #3b82f6;
}

.actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.followButton {
  flex: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: #3b82f6;
  color: white;
}

.followButton:hover {
  background-color: #2563eb;
}

.messageButton {
  flex: 1;
  padding: 10px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
  color: #334155;
}

.messageButton:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

/* レスポンシブ対応 */
@media (max-width: 640px) {
  .card {
    padding: 24px 16px;
  }

  .actions {
    flex-direction: column;
  }
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/components/ProfileCard.tsx"
              code={`import styles from './ProfileCard.module.css';

interface ProfileCardProps {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  tags: string[];
  onFollow?: () => void;
  onMessage?: () => void;
}

function ProfileCard({
  name,
  role,
  bio,
  avatarUrl,
  tags,
  onFollow,
  onMessage,
}: ProfileCardProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.avatar}
        src={avatarUrl}
        alt={\`\${name}のアバター\`}
      />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
      <p className={styles.bio}>{bio}</p>

      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.followButton} onClick={onFollow}>
          フォロー
        </button>
        <button className={styles.messageButton} onClick={onMessage}>
          メッセージ
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="使用例"
              code={`import ProfileCard from './components/ProfileCard';

function App() {
  return (
    <ProfileCard
      name="田中 花子"
      role="UI/UX デザイナー"
      bio="ユーザー体験を大切にしたデザインを心がけています。Figma と React が好きです。"
      avatarUrl="/avatar.jpg"
      tags={['Figma', 'React', 'TypeScript', 'UI デザイン']}
      onFollow={() => console.log('フォローしました')}
      onMessage={() => console.log('メッセージ画面を開く')}
    />
  );
}`}
            />
          </section>

          {/* セクション9: ファイル構成のベストプラクティス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ファイル構成のベストプラクティス</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules を使う場合、コンポーネントとスタイルを同じディレクトリに置くのが推奨されます。
            </p>

            <CodeBlock
              language="text"
              title="推奨ディレクトリ構成"
              code={`src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx          # コンポーネント
│   │   ├── Button.module.css   # スタイル
│   │   └── index.ts            # エクスポート
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.module.css
│   │   └── index.ts
│   └── Header/
│       ├── Header.tsx
│       ├── Header.module.css
│       └── index.ts
├── styles/
│   └── global.css              # リセット CSS やグローバルスタイル
└── App.tsx`}
            />

            <InfoBox type="info" title="グローバル CSS は使い分けよう">
              <p>
                リセット CSS、フォントの読み込み、CSS カスタムプロパティの定義など、
                本当にグローバルに適用したいスタイルはプレーン CSS（<code className="bg-muted px-1.5 py-0.5 rounded text-sm">global.css</code>）に書きます。
                コンポーネント固有のスタイルは CSS Modules を使いましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション10: いつどちらを使うか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">いつどちらを使うか</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">プレーン CSS を使う場面</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>CSS リセット / ノーマライズ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>フォントの読み込み（@font-face）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>CSS カスタムプロパティ（変数）の定義</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>非常に小規模なプロジェクト</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>プロトタイプ / 学習目的</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">CSS Modules を使う場面</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>コンポーネント固有のスタイリング</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>チーム開発（命名衝突を防ぎたい）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>中〜大規模プロジェクト</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>CSS を書く技術は活かしたい場合</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>ランタイムコストをゼロにしたい場合</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6" />

            <InfoBox type="success" title="まとめ">
              <p>
                プレーン CSS はグローバルなスタイルに、CSS Modules はコンポーネントのスタイルに使いましょう。
                CSS Modules は追加のライブラリが不要で、既存の CSS の知識がそのまま活かせる最もシンプルなスコープ付き CSS ソリューションです。
                次のステップでは、JavaScript でスタイルを書く CSS-in-JS というアプローチを学びます。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
