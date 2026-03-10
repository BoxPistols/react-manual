import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function HelloReact() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 3
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          Hello React
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React とは何か？を理解し、プロジェクトの構成を把握して、
          最初のコード変更を行いましょう。
        </p>

        <WhyNowBox tags={['React', 'UI ライブラリ', 'コンポーネント指向', 'SPA']}>
          <p>
            React は Meta（旧 Facebook）が開発した UI ライブラリで、
            Instagram、Netflix、Airbnb、Notion など、世界中の主要なWebサービスで使われています。
            求人サイトで「フロントエンドエンジニア」を検索すると、ほぼ全てで React のスキルが求められるほど、
            業界標準の技術です。デザイナーが React を学ぶことは、デザインと実装の橋渡し能力を手に入れることを意味します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* React とは何か？ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">React とは何か？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React を一言で言うと、<strong>UI（ユーザーインターフェース）を構築するための JavaScript ライブラリ</strong>です。
              デザイナーにとって馴染みのある言葉で説明すると、以下の3つが React の核心です。
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-3">
                  <span className="text-blue-600 dark:text-blue-400 text-lg font-bold">1</span>
                </div>
                <h4 className="font-bold text-foreground mb-2 text-sm">コンポーネント指向</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Figma でボタンやカードを「コンポーネント」として作るように、
                  React でも UI をコンポーネント単位で構築します。
                  再利用でき、組み合わせて画面を作ります。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-3">
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg font-bold">2</span>
                </div>
                <h4 className="font-bold text-foreground mb-2 text-sm">宣言的</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  「この状態のとき、UIはこう見える」と宣言するだけ。
                  データが変わったときのDOM操作は React が自動でやってくれます。
                  デザイナーが「状態A のときのデザイン」を作るのと同じ発想です。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-3">
                  <span className="text-violet-600 dark:text-violet-400 text-lg font-bold">3</span>
                </div>
                <h4 className="font-bold text-foreground mb-2 text-sm">仮想 DOM</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  React は画面の変更点だけを効率的に更新します。
                  全体を再描画するのではなく、変わった部分だけを更新するので高速です。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="ライブラリ vs フレームワーク">
              <p>
                React は「ライブラリ」であり、Vue.js や Angular のような「フレームワーク」とは少し違います。
                React 自体は UI の描画に特化しており、ルーティングや状態管理は別のライブラリと組み合わせます。
                この柔軟さが React の強みですが、選択肢が多すぎて迷うこともあります。
                このマニュアルでは迷わないよう、おすすめの構成をガイドします。
              </p>
            </InfoBox>
          </section>

          {/* プロジェクト構造 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">プロジェクト構造を理解する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 2 で作成した React プロジェクトの中で、特に重要な3つのファイルを見ていきましょう。
              React アプリがどのように動いているかを理解する鍵になります。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">index.html - すべての起点</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              プロジェクトのルートにある <code className="bg-muted px-1 py-0.5 rounded text-xs">index.html</code> を開いてみてください。
            </p>
            <CodeBlock
              code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`}
              language="html"
              title="index.html"
              showLineNumbers
            />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              注目すべきは2つ。<code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;div id="root"&gt;&lt;/div&gt;</code> という空の div と、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">src/main.tsx</code> を読み込む script タグです。
              React はこの空の div の中に、JavaScript で UI を組み立てていきます。
            </p>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">main.tsx - React のエントリーポイント</h3>
            <CodeBlock
              code={`import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`}
              language="tsx"
              title="src/main.tsx"
              showLineNumbers
            />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              このファイルが最初に実行されます。やっていることはシンプルです。
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside ml-2">
              <li><code className="bg-muted px-1 py-0.5 rounded text-xs">document.getElementById('root')</code> で index.html の空の div を取得</li>
              <li><code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;App /&gt;</code> コンポーネントをその中に描画（レンダリング）</li>
            </ul>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">App.tsx - メインのコンポーネント</h3>
            <CodeBlock
              code={`import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App`}
              language="tsx"
              title="src/App.tsx"
              showLineNumbers
            />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              これが実際にブラウザに表示されているコンポーネントです。
              今は全てを理解する必要はありません。HTML のような見た目のコードが書かれていることだけ確認してください。
              この「HTML のようなもの」が <strong>JSX</strong> と呼ばれ、次の STEP 4 で詳しく学びます。
            </p>
          </section>

          {/* 最初のコード変更 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">最初のコード変更 - Hello React!</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              では、実際にコードを変更してみましょう。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">src/App.tsx</code> を開き、内容を以下のように書き換えてください。
            </p>

            <CodeBlock
              code={`function App() {
  return (
    <div>
      <h1>Hello React!</h1>
      <p>はじめての React アプリケーションです。</p>
    </div>
  )
}

export default App`}
              language="tsx"
              title="src/App.tsx（書き換え後）"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              ファイルを保存すると（<code className="bg-muted px-1 py-0.5 rounded text-xs">Cmd + S</code>）、
              ブラウザが<strong>自動的に更新</strong>されて「Hello React!」と表示されるはずです。
            </p>

            <InfoBox type="success" title="HMR（ホットモジュールリプレースメント）">
              <p>
                この「保存すると自動で更新される」機能を <strong>HMR</strong>（Hot Module Replacement）と呼びます。
                Vite の HMR は非常に高速で、変更した部分だけを瞬時に反映します。
                ページ全体をリロードする必要がないため、開発効率が大幅に上がります。
                デザインツールのプレビューが即座に更新されるのと同じ感覚です。
              </p>
            </InfoBox>
          </section>

          {/* レンダリングの流れ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">レンダリングの流れを理解する</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              React アプリが画面に表示されるまでの流れを整理しましょう。
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">ブラウザが index.html を読み込む</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    空の <code className="bg-muted px-1 py-0.5 rounded">&lt;div id="root"&gt;</code> と main.tsx への参照が含まれている
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground text-lg">&#8595;</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">main.tsx が実行される</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <code className="bg-muted px-1 py-0.5 rounded">ReactDOM.createRoot</code> で root 要素を取得し、App コンポーネントを描画
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground text-lg">&#8595;</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-violet-600 dark:text-violet-400 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">App.tsx がレンダリングされる</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    App 関数が返す JSX が HTML に変換され、root div の中に表示される
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground text-lg">&#8595;</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">ブラウザに表示される</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    「Hello React!」がブラウザに表示される。以降、コードを変更すると HMR が差分だけ更新
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InfoBox type="info" title="SPA とは">
                <p>
                  React アプリは <strong>SPA</strong>（Single Page Application）と呼ばれます。
                  ページ遷移のたびにサーバーから新しい HTML を取得するのではなく、
                  1つの HTML ページ上で JavaScript が画面を切り替えます。
                  そのため画面遷移が非常にスムーズで、ネイティブアプリのような体験を提供できます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* もう少し変更してみる */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">もう少し変更してみよう</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コードを書き換える感覚に慣れるため、もう少し変更を加えてみましょう。
              以下のように App.tsx を編集してみてください。
            </p>

            <CodeBlock
              code={`function App() {
  const name = "あなたの名前"
  const today = new Date().toLocaleDateString('ja-JP')

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>こんにちは、{name} さん！</h1>
      <p>今日は {today} です。</p>
      <p>React の学習をはじめましょう。</p>
    </div>
  )
}

export default App`}
              language="tsx"
              title="src/App.tsx"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{name}'}</code> のように波括弧で囲むと、
              JavaScript の変数をHTMLの中に埋め込むことができます。これが JSX の強力な機能の一つです。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">"あなたの名前"</code> の部分を自分の名前に変えて、
              保存してブラウザを確認してみてください。
            </p>

            <div className="mt-4">
              <InfoBox type="warning" title="style の書き方に注意">
                <p>
                  HTML では <code className="bg-muted px-1 py-0.5 rounded text-xs">style="text-align: center"</code> と書きますが、
                  JSX では <code className="bg-muted px-1 py-0.5 rounded text-xs">style={'{'}{'{'} textAlign: 'center' {'}'}{'}'}
                  </code> と書きます。
                  ケバブケース（text-align）ではなくキャメルケース（textAlign）を使い、オブジェクト形式で指定します。
                  CSS スタイリングの詳細は STEP 17 以降で学びます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* このステップのまとめ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>React は <strong>コンポーネント指向</strong> の UI ライブラリである</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>レンダリングの流れ: <strong>index.html → main.tsx → App.tsx → ブラウザ</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>App.tsx のコードを変更して「Hello React!」を表示できた</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><strong>HMR</strong> により、保存するだけでブラウザが自動更新される</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>JSX の中で <code className="bg-muted px-1 py-0.5 rounded">{'{ }'}</code> を使って JavaScript の値を埋め込める</span>
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
