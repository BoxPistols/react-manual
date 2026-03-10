import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function ResponsiveDark() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 23</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">レスポンシブとダークモード</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Tailwind CSS のレスポンシブブレイクポイントとダークモードを活用して、あらゆるデバイスと環境に対応する UI を作りましょう。
        </p>

        <WhyNowBox tags={['レスポンシブ', 'ダークモード', 'モバイルファースト', 'アニメーション']}>
          <p>
            現代の Web サイトでは、スマートフォンからデスクトップまで対応するレスポンシブデザインと、ダークモードへの対応が必須です。
            Tailwind CSS なら、メディアクエリを CSS ファイルに書く必要はありません。
            クラス名にプレフィックスを付けるだけで、画面サイズやカラーモードに応じたスタイルを適用できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: レスポンシブブレイクポイント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レスポンシブブレイクポイント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind には5つのブレイクポイントが用意されています。各プレフィックスは<strong>「その幅以上」</strong>を意味します。
            </p>

            <CodeBlock
              language="tsx"
              title="ブレイクポイント一覧"
              code={`// sm: 640px 以上  → スマートフォン横向き / 小型タブレット
// md: 768px 以上  → タブレット
// lg: 1024px 以上 → ノートPC
// xl: 1280px 以上 → デスクトップ
// 2xl: 1536px 以上 → 大画面ディスプレイ

// プレフィックスなし = モバイル（全画面サイズ）
// ↓ 画面が広くなるにつれて上書きされていく

<div className="text-sm md:text-base lg:text-lg">
  モバイル: 14px → タブレット: 16px → PC: 18px
</div>`}
            />

            <InfoBox type="info" title="モバイルファーストの考え方">
              <p>
                Tailwind はモバイルファーストです。プレフィックスなしのクラスがモバイルに適用され、
                <code>md:</code> や <code>lg:</code> をつけたクラスが大きな画面で上書きします。
                まずモバイルのデザインを書き、そこから画面が広くなったときの調整を追加していくのが正しい使い方です。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: レスポンシブの実践パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レスポンシブの実践パターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              実際の UI でよく使うレスポンシブパターンを見ていきましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="レスポンシブなグリッドレイアウト"
              code={`// モバイル: 1列 → タブレット: 2列 → PC: 3列
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <div className="bg-white p-4 rounded-lg shadow">カード 1</div>
  <div className="bg-white p-4 rounded-lg shadow">カード 2</div>
  <div className="bg-white p-4 rounded-lg shadow">カード 3</div>
</div>`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="レスポンシブなナビゲーション"
              code={`function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">MyApp</h1>

        {/* モバイル: ハンバーガーメニュー */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* PC: 横並びナビ */}
        <nav className="hidden md:flex gap-6">
          <a href="/" className="text-gray-600 hover:text-gray-900">ホーム</a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">概要</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">お問い合わせ</a>
        </nav>
      </div>

      {/* モバイルメニュー */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2">
          <a href="/" className="block py-2 text-gray-600">ホーム</a>
          <a href="/about" className="block py-2 text-gray-600">概要</a>
          <a href="/contact" className="block py-2 text-gray-600">お問い合わせ</a>
        </nav>
      )}
    </header>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="レスポンシブなパディングとフォントサイズ"
              code={`// セクションのレスポンシブ調整
<section className="px-4 md:px-8 lg:px-16 py-8 md:py-16">
  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8">
    セクションタイトル
  </h2>
  <p className="text-base md:text-lg leading-relaxed max-w-prose">
    本文テキストもデバイスに合わせてサイズを調整します。
  </p>
</section>

// 表示/非表示の切り替え
<div className="hidden lg:block">PC でのみ表示されるサイドバー</div>
<div className="block lg:hidden">モバイルでのみ表示される要素</div>`}
            />
          </section>

          {/* セクション3: ダークモード */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ダークモード</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind のダークモードは <code>dark:</code> プレフィックスで実現します。
              ライトモードとダークモードのスタイルを1つの要素に同時に記述できます。
            </p>

            <CodeBlock
              language="tsx"
              title="ダークモードの基本"
              code={`// ライトモード → ダークモード
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">
    タイトル
  </h1>
  <p className="text-gray-600 dark:text-gray-400">
    説明テキスト
  </p>
</div>

// ボーダーも対応
<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
  <p className="text-gray-800 dark:text-gray-200">
    ボーダー付きカード
  </p>
</div>`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="class 戦略の設定（CSS ファイル）"
              code={`/* src/index.css */
@import "tailwindcss";

/* class 戦略: <html class="dark"> で切り替え */
@custom-variant dark (&:where(.dark, .dark *));`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="ダークモードの切り替え機能"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // ローカルストレージから復元、なければシステム設定を参照
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((prev) => !prev) };
}

// 使い方
function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-colors"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}`}
            />
          </section>

          {/* セクション4: CSS 変数によるカスタムカラー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS 変数によるカスタムカラー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind v4 では CSS 変数（カスタムプロパティ）を使って、独自のカラーパレットを定義できます。
              ダークモードとの組み合わせで、テーマの切り替えも簡単です。
            </p>

            <CodeBlock
              language="css"
              title="CSS 変数でカスタムテーマを定義"
              code={`/* src/index.css */
@import "tailwindcss";

@theme {
  /* ブランドカラー */
  --color-brand-50: #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;

  /* セマンティックカラー */
  --color-surface: #ffffff;
  --color-surface-secondary: #f9fafb;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
}

/* ダークモード用のカラー */
.dark {
  --color-surface: #111827;
  --color-surface-secondary: #1f2937;
  --color-text-primary: #f9fafb;
  --color-text-secondary: #9ca3af;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="カスタムカラーの使用"
              code={`// @theme で定義したカラーはクラス名として使える
<div className="bg-surface text-text-primary">
  <h1 className="text-brand-600">ブランドカラーの見出し</h1>
  <p className="text-text-secondary">セカンダリカラーのテキスト</p>
  <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded">
    ブランドボタン
  </button>
</div>`}
            />

            <InfoBox type="success" title="デザインシステムとの相性">
              <p>
                CSS 変数を使ったカスタムカラーは、Figma のデザイントークンと1対1で対応させることができます。
                デザインシステムで定義した色をそのまま Tailwind のクラス名として使えるため、
                デザインとコードの間の翻訳作業が大幅に削減されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: アニメーションユーティリティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">アニメーションユーティリティ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind には基本的なアニメーションとトランジションのユーティリティが用意されています。
              マイクロインタラクションの実装に便利です。
            </p>

            <CodeBlock
              language="tsx"
              title="トランジションとアニメーション"
              code={`// トランジション
<button className="bg-blue-500 hover:bg-blue-600
                   transition-colors duration-200 ease-in-out">
  色のトランジション
</button>

<div className="hover:scale-105 transition-transform duration-300">
  ホバーで拡大
</div>

<div className="opacity-0 hover:opacity-100 transition-opacity duration-500">
  フェードイン
</div>

// 複数のプロパティをトランジション
<div className="hover:scale-105 hover:shadow-xl
                transition-all duration-300 ease-out">
  すべてのプロパティが滑らかに変化
</div>

// 組み込みアニメーション
<div className="animate-spin">回転</div>
<div className="animate-ping">ピン</div>
<div className="animate-pulse">パルス</div>
<div className="animate-bounce">バウンス</div>

// 読み込みインジケーターの例
<div className="flex items-center gap-2">
  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent
                  rounded-full animate-spin" />
  <span className="text-gray-600">読み込み中...</span>
</div>`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="カスタムアニメーションの定義"
              code={`/* src/index.css */
@import "tailwindcss";

@theme {
  --animate-fade-in: fade-in 0.5s ease-out;
  --animate-slide-up: slide-up 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}
            />

            <CodeBlock
              language="tsx"
              title="カスタムアニメーションの使用"
              code={`// @theme で定義したアニメーションを使う
<div className="animate-fade-in">フェードインする要素</div>
<div className="animate-slide-up">下からスライドする要素</div>`}
            />
          </section>

          {/* セクション6: 実践 — レスポンシブレイアウト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：レスポンシブなプロフィールページ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまで学んだレスポンシブ、ダークモード、アニメーションを組み合わせた実践的な例を作りましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="ProfilePage.tsx"
              showLineNumbers
              code={`interface Skill {
  name: string;
  level: number; // 0-100
}

interface ProfileProps {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: Skill[];
}

export default function ProfilePage({
  name, role, avatar, bio, skills,
}: ProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900
                    transition-colors duration-300">
      {/* ヘッダーセクション */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row
                        items-center gap-6 md:gap-10">
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full
                       border-4 border-white/30 shadow-xl"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white">
              {name}
            </h1>
            <p className="text-blue-100 text-lg mt-1">{role}</p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12
                      grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 自己紹介 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl
                          shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              自己紹介
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {bio}
            </p>
          </div>
        </div>

        {/* スキル */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl
                          shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              スキル
            </h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700
                                  rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full
                                 transition-all duration-500 ease-out"
                      style={{ width: \`\${skill.level}%\` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="success" title="レスポンシブ・ダークモードのポイント">
              <p>
                このコンポーネントは、モバイルでは縦並び、PC では横並びのレイアウトになります。
                ダークモードにも対応し、トランジションで切り替えアニメーションも付けています。
                実際のプロジェクトでも、この「モバイルファースト + <code>dark:</code> プレフィックス」のパターンを基本にすれば、
                あらゆるデバイスとテーマに対応できます。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
