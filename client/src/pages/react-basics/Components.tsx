import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function Components() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 5
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          コンポーネント
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React の核心、コンポーネント。Figma のコンポーネントと同じ考え方で、
          再利用可能な UI パーツを作る方法を学びましょう。
        </p>

        <WhyNowBox tags={['コンポーネント', 'Figma との類似性', '再利用性', 'PascalCase']}>
          <p>
            デザイナーなら Figma でコンポーネントを作った経験があるはずです。
            ボタン、カード、ヘッダーなどの UI パーツをコンポーネントにして、
            画面全体はそれらの組み合わせで作りますよね。
            React のコンポーネントはまさにその発想です。
            デザインシステムの考え方がそのままコードに活かせる、
            デザイナーにとって最も親しみやすい概念かもしれません。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* コンポーネントとは */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">コンポーネントとは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コンポーネントとは、<strong>再利用可能な UI の部品</strong>です。
              ページ全体を1つの大きな HTML として書くのではなく、
              ボタン、カード、ナビゲーションバーといった部品ごとに分割して作ります。
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-3 text-sm">Figma の場合</h4>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>ボタンを「コンポーネント」として作成</li>
                  <li>カードの中にボタンを「インスタンス」として配置</li>
                  <li>ボタンの色を変更すると全インスタンスに反映</li>
                  <li>コンポーネントに「Variants」を設定できる</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-3 text-sm">React の場合</h4>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>ボタンを「コンポーネント」として定義</li>
                  <li>カードの中にボタンコンポーネントを配置</li>
                  <li>コンポーネントを修正すると全ての使用箇所に反映</li>
                  <li>「Props」でバリエーションを表現できる</li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="コンポーネント思考はデザイナーの強み">
              <p>
                デザインシステムやアトミックデザインの経験があるデザイナーは、
                コンポーネントの粒度（どこで分割するか）を直感的に判断できます。
                「ボタン」「入力フィールド」「カード」「ナビゲーション」という分割は、
                デザインでもコードでも同じです。この感覚はエンジニアが学ぶのに苦労する部分でもあります。
              </p>
            </InfoBox>
          </section>

          {/* 関数コンポーネント */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">関数コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React のコンポーネントは <strong>JavaScript の関数</strong>として定義します。
              関数が JSX を返すだけで、それがコンポーネントになります。
            </p>

            <CodeBlock
              code={`// 最もシンプルなコンポーネント
function Greeting() {
  return <h1>こんにちは！</h1>
}

// アロー関数で書くパターン（どちらでもOK）
const Greeting = () => {
  return <h1>こんにちは！</h1>
}`}
              language="tsx"
              title="コンポーネントの基本形"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              関数名が<strong>大文字で始まる</strong>ことに注目してください。
              React では、大文字で始まる関数がコンポーネントとして認識されます。
              小文字で始めると HTML タグとして解釈されてしまいます。
            </p>

            <div className="mt-4">
              <InfoBox type="warning" title="クラスコンポーネントについて">
                <p>
                  昔の React では <code className="bg-muted px-1 py-0.5 rounded text-xs">class</code> を使ったコンポーネントが主流でした。
                  しかし現在は<strong>関数コンポーネント</strong>がスタンダードです。
                  古いチュートリアルで見かけるかもしれませんが、新しいコードでは使いません。
                  このマニュアルでは全て関数コンポーネントを使います。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 最初のコンポーネントを作る */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">最初のコンポーネントを作ってみよう</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 2 で作ったプロジェクトの <code className="bg-muted px-1 py-0.5 rounded text-xs">src</code> フォルダに
              新しいファイルを作成してみましょう。
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">1. ボタンコンポーネントを作成</p>
                <CodeBlock
                  code={`// src/MyButton.tsx

function MyButton() {
  return (
    <button
      style={{
        backgroundColor: '#2563EB',
        color: 'white',
        padding: '10px 24px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      クリック
    </button>
  )
}

export default MyButton`}
                  language="tsx"
                  title="src/MyButton.tsx"
                  showLineNumbers
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">2. App.tsx でインポートして使う</p>
                <CodeBlock
                  code={`// src/App.tsx
import MyButton from './MyButton'

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>コンポーネントのテスト</h1>
      <MyButton />
      <MyButton />
      <MyButton />
    </div>
  )
}

export default App`}
                  language="tsx"
                  title="src/App.tsx"
                  showLineNumbers
                />
              </div>
            </div>

            <p className="text-muted-foreground mt-4 leading-relaxed">
              保存してブラウザを見ると、同じデザインのボタンが3つ表示されるはずです。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;MyButton /&gt;</code> と書くだけで、
              何度でも同じボタンを配置できます。これがコンポーネントの再利用性です。
            </p>

            <div className="mt-4">
              <InfoBox type="success" title="export default とは？">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">export default MyButton</code> は、
                  このファイルのメイン出力として MyButton を公開するという意味です。
                  他のファイルから <code className="bg-muted px-1 py-0.5 rounded text-xs">import MyButton from './MyButton'</code> で
                  読み込めるようになります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* ファイル構成 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">コンポーネントのファイル構成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コンポーネントのファイル管理には、いくつかの一般的なルールがあります。
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">1ファイル1コンポーネント</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    1つのファイルに1つのコンポーネントを定義するのが基本です。
                    ファイル名はコンポーネント名と一致させます（例: <code className="bg-muted px-1 rounded">MyButton.tsx</code>）。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">PascalCase（パスカルケース）で命名</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    コンポーネント名は大文字始まりのパスカルケースで書きます。
                    <code className="bg-muted px-1 rounded">MyButton</code>、<code className="bg-muted px-1 rounded">UserProfile</code>、
                    <code className="bg-muted px-1 rounded">NavigationBar</code> のように。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-violet-600 dark:text-violet-400 text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">components フォルダにまとめる</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    再利用するコンポーネントは <code className="bg-muted px-1 rounded">src/components/</code> フォルダにまとめるのが一般的です。
                  </p>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`src/
├── components/         # 再利用コンポーネント
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/              # ページコンポーネント（大きな単位）
│   ├── Home.tsx
│   └── About.tsx
├── App.tsx             # ルートコンポーネント
└── main.tsx            # エントリーポイント`}
              language="text"
              title="推奨フォルダ構成"
            />
          </section>

          {/* コンポーネントの合成 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">コンポーネントを組み合わせる（コンポジション）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コンポーネントの真価は「組み合わせ」にあります。
              小さなコンポーネントを組み合わせて、より大きなコンポーネントを作り、
              最終的にページ全体を構成します。Figma でも同じですよね。
            </p>

            <CodeBlock
              code={`// src/components/Avatar.tsx
function Avatar() {
  return (
    <img
      src="https://via.placeholder.com/48"
      alt="ユーザーアバター"
      style={{ width: 48, height: 48, borderRadius: '50%' }}
    />
  )
}
export default Avatar`}
              language="tsx"
              title="src/components/Avatar.tsx"
              showLineNumbers
            />

            <div className="mt-4">
              <CodeBlock
                code={`// src/components/UserInfo.tsx
function UserInfo() {
  return (
    <div>
      <p style={{ fontWeight: 'bold', margin: 0 }}>田中太郎</p>
      <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
        UI デザイナー
      </p>
    </div>
  )
}
export default UserInfo`}
                language="tsx"
                title="src/components/UserInfo.tsx"
                showLineNumbers
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                code={`// src/components/ProfileCard.tsx
import Avatar from './Avatar'
import UserInfo from './UserInfo'

function ProfileCard() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      maxWidth: '320px',
    }}>
      <Avatar />
      <UserInfo />
    </div>
  )
}
export default ProfileCard`}
                language="tsx"
                title="src/components/ProfileCard.tsx"
                showLineNumbers
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                code={`// src/App.tsx
import ProfileCard from './components/ProfileCard'

function App() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>チームメンバー</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  )
}

export default App`}
                language="tsx"
                title="src/App.tsx"
                showLineNumbers
              />
            </div>

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">Avatar</code> と
              <code className="bg-muted px-1 py-0.5 rounded text-xs">UserInfo</code> を組み合わせて
              <code className="bg-muted px-1 py-0.5 rounded text-xs">ProfileCard</code> を作り、
              それを <code className="bg-muted px-1 py-0.5 rounded text-xs">App</code> で並べています。
              まさに Figma でコンポーネントをネストする感覚と同じです。
            </p>
          </section>

          {/* 実践: Card コンポーネント */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">実践: Card コンポーネントを作る</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              デザインでよく使う「カード」コンポーネントを、自分で一から作ってみましょう。
              今はまだ Props（次の STEP で学習）を使わないので、固定の内容になりますが、
              コンポーネントの構造を理解するには十分です。
            </p>

            <CodeBlock
              code={`// src/components/Card.tsx

function Card() {
  return (
    <div style={{
      borderRadius: '16px',
      border: '1px solid #E5E7EB',
      overflow: 'hidden',
      maxWidth: '360px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }}>
      {/* カード画像 */}
      <div style={{
        width: '100%',
        height: '200px',
        backgroundColor: '#F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9CA3AF',
        fontSize: '14px',
      }}>
        画像エリア
      </div>

      {/* カード本文 */}
      <div style={{ padding: '20px' }}>
        <p style={{
          fontSize: '12px',
          color: '#2563EB',
          fontWeight: 'bold',
          marginBottom: '4px',
        }}>
          カテゴリ
        </p>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#1F2937',
        }}>
          カードのタイトル
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#6B7280',
          lineHeight: 1.6,
        }}>
          ここにカードの説明文が入ります。
          コンポーネントとして作ることで、同じデザインのカードを何度でも使い回せます。
        </p>
      </div>
    </div>
  )
}

export default Card`}
              language="tsx"
              title="src/components/Card.tsx"
              showLineNumbers
            />

            <div className="mt-4">
              <CodeBlock
                code={`// src/App.tsx
import Card from './components/Card'

function App() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#FAFBFC' }}>
      <h1 style={{ marginBottom: '24px' }}>プロジェクト一覧</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
      }}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default App`}
                language="tsx"
                title="src/App.tsx"
                showLineNumbers
              />
            </div>

            <p className="text-muted-foreground mt-4 leading-relaxed">
              3枚のカードが同じデザインで表示されます。
              しかし、全てのカードが同じ内容ですよね。
              「カードごとに異なるタイトルや画像を設定したい」と思ったはずです。
              それを可能にするのが次の STEP で学ぶ <strong>Props</strong> です。
            </p>

            <div className="mt-4">
              <InfoBox type="info" title="Props の予告">
                <p>
                  Figma のコンポーネントプロパティ（テキストプロパティ、ブールプロパティなど）に相当するのが
                  React の Props です。次の STEP 6 で、Card コンポーネントにタイトルや説明文を
                  外から渡せるようにします。コンポーネントが本当に「再利用可能」になる瞬間です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* よくある質問 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">よくある疑問</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">Q: コンポーネントはどこで分割すべき？</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A: Figma と同じです。「この部品は別の場所でも使うかもしれない」と思ったら分割のサインです。
                  また、1つのコンポーネントが長くなりすぎたら（目安は100行以上）、分割を検討しましょう。
                  最初から完璧に分ける必要はありません。後からいつでもリファクタリング（分割・統合）できます。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">Q: function と const アロー関数、どちらを使うべき？</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A: どちらでも動作は同じです。チームのコーディング規約に合わせるのが一般的です。
                  このマニュアルでは <code className="bg-muted px-1 rounded">function</code> を使いますが、
                  <code className="bg-muted px-1 rounded">const Name = () =&gt; {'{ }'}</code> も広く使われています。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">Q: .tsx と .jsx の違いは？</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A: <code className="bg-muted px-1 rounded">.tsx</code> は TypeScript + JSX、
                  <code className="bg-muted px-1 rounded">.jsx</code> は JavaScript + JSX です。
                  このマニュアルでは TypeScript を使うので、すべて <code className="bg-muted px-1 rounded">.tsx</code> で作成します。
                  TypeScript の詳細は STEP 7 で学びます。
                </p>
              </div>
            </div>
          </section>

          {/* このステップのまとめ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>コンポーネントは<strong>再利用可能な UI 部品</strong>で、Figma のコンポーネントと同じ発想</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><strong>関数コンポーネント</strong>は、JSX を返す関数として定義する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>コンポーネント名は <strong>PascalCase</strong>（大文字始まり）で命名する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>1ファイル1コンポーネントで、<code className="bg-muted px-1 py-0.5 rounded">export default</code> で公開する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>コンポーネントを<strong>組み合わせて</strong>より大きなUIを構築する（コンポジション）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>次の STEP で学ぶ <strong>Props</strong> により、コンポーネントに動的なデータを渡せるようになる</span>
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
