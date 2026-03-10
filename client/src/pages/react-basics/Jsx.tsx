import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function Jsx() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 4
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          JSX を理解する
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React のコードに登場する「HTML のようなもの」、それが JSX です。
          HTML との違いを知り、使いこなせるようになりましょう。
        </p>

        <WhyNowBox tags={['JSX', 'HTML との違い', '式の埋め込み', '条件分岐']}>
          <p>
            React のコードを読み書きするうえで、JSX の理解は絶対に避けて通れません。
            見た目は HTML そっくりですが、実は JavaScript です。
            この違いを理解しないと、「なぜ <code className="bg-violet-100 dark:bg-violet-900/60 px-1 rounded text-xs">class</code> じゃなくて
            <code className="bg-violet-100 dark:bg-violet-900/60 px-1 rounded text-xs">className</code> なの？」
            という疑問が解消されません。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* JSX とは何か */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">JSX とは何か？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX は <strong>JavaScript XML</strong> の略で、JavaScript の中に HTML のような構文を書ける拡張構文です。
              React のコンポーネントが「見た目」を定義するために使います。
            </p>

            <CodeBlock
              code={`// これが JSX
function Greeting() {
  return <h1>こんにちは、React！</h1>
}

// JSX は実際にはこう変換される（知識として知っておくだけでOK）
function Greeting() {
  return React.createElement('h1', null, 'こんにちは、React！')
}`}
              language="tsx"
              title="JSX の正体"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;h1&gt;こんにちは&lt;/h1&gt;</code> と書くと、
              裏側では <code className="bg-muted px-1 py-0.5 rounded text-xs">React.createElement('h1', null, 'こんにちは')</code>
              に変換されます。つまり JSX は HTML ではなく、<strong>JavaScript の関数呼び出しの糖衣構文（ショートカット）</strong>です。
            </p>

            <div className="mt-4">
              <InfoBox type="info" title="なぜ JSX を使うのか？">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">React.createElement</code> を毎回書くのは大変です。
                  JSX のおかげで、HTML を書く感覚で UI を定義できます。
                  デザイナーにとっても、JSX は HTML の知識を活かしやすい構文です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* HTML との違い */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">HTML との違い</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              JSX は HTML に似ていますが、いくつか重要な違いがあります。
              デザイナーが HTML を書いた経験があるなら、以下の点だけ気をつければ大丈夫です。
            </p>

            {/* className */}
            <h3 className="text-xl font-bold text-foreground mb-4">1. class → className</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              HTML の <code className="bg-muted px-1 py-0.5 rounded text-xs">class</code> 属性は、
              JSX では <code className="bg-muted px-1 py-0.5 rounded text-xs">className</code> と書きます。
              JavaScript に <code className="bg-muted px-1 py-0.5 rounded text-xs">class</code> という予約語があるためです。
            </p>
            <CodeBlock
              code={`// HTML
<div class="container">...</div>

// JSX
<div className="container">...</div>`}
              language="tsx"
              title="class → className"
            />

            {/* htmlFor */}
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. for → htmlFor</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              label タグの <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code> 属性は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">htmlFor</code> と書きます。
              こちらも JavaScript の予約語 <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code> との衝突を避けるためです。
            </p>
            <CodeBlock
              code={`// HTML
<label for="email">メールアドレス</label>
<input id="email" type="email" />

// JSX
<label htmlFor="email">メールアドレス</label>
<input id="email" type="email" />`}
              language="tsx"
              title="for → htmlFor"
            />

            {/* キャメルケース */}
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. ケバブケース → キャメルケース</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              HTML ではハイフン区切り（ケバブケース）で書く属性名が、JSX ではキャメルケースになります。
            </p>
            <CodeBlock
              code={`// HTML
<div tabindex="0" onclick="handleClick()"></div>
<input maxlength="100" />

// JSX
<div tabIndex={0} onClick={handleClick}></div>
<input maxLength={100} />`}
              language="tsx"
              title="属性名のキャメルケース化"
            />

            {/* 自己閉じタグ */}
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">4. 自己閉じタグは必須</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              HTML では <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;img&gt;</code> や
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;br&gt;</code> は閉じタグなしで書けますが、
              JSX では必ず閉じる必要があります。
            </p>
            <CodeBlock
              code={`// HTML（閉じなくてもOK）
<img src="photo.jpg">
<br>
<input type="text">
<hr>

// JSX（必ず閉じる）
<img src="photo.jpg" />
<br />
<input type="text" />
<hr />`}
              language="tsx"
              title="自己閉じタグ"
            />

            <div className="mt-6">
              <InfoBox type="warning" title="よくあるエラー">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">class</code> と書いてしまうのが初心者が最もよくやるミスです。
                  エラーにはならず警告が出るだけなので気づきにくいですが、必ず
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">className</code> を使いましょう。
                  VS Code の ESLint 拡張を入れていれば、自動で指摘してくれます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 式の埋め込み */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">{'{ } で式を埋め込む'}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX の最大の特徴は、波括弧 <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{ }'}</code> を使って
              JavaScript の式（値を返す表現）を埋め込めることです。
            </p>

            <CodeBlock
              code={`function Profile() {
  const name = "田中太郎"
  const age = 28
  const skills = ["Figma", "Photoshop", "React"]

  return (
    <div>
      {/* 変数の埋め込み */}
      <h1>{name}</h1>

      {/* 計算式の埋め込み */}
      <p>{age}歳（来年は{age + 1}歳）</p>

      {/* 関数の呼び出し結果を埋め込み */}
      <p>スキル: {skills.join(', ')}</p>

      {/* テンプレートリテラルの埋め込み */}
      <p>{name}さんは{skills.length}つのスキルを持っています</p>
    </div>
  )
}`}
              language="tsx"
              title="式の埋め込み例"
              showLineNumbers
            />

            <div className="mt-4">
              <InfoBox type="info" title="「式」と「文」の違い">
                <p>
                  波括弧の中には「式」（値を返すもの）だけ書けます。
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">if</code> 文や
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code> 文のような「文」は書けません。
                  代わりに三項演算子や <code className="bg-muted px-1 py-0.5 rounded text-xs">map</code> メソッドを使います（後述）。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 条件分岐 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">条件分岐（条件付きレンダリング）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「ログインしている場合はユーザー名を表示、していない場合はログインボタンを表示」
              のように、条件によって表示を切り替えたい場面は頻繁にあります。
              JSX では主に2つの方法を使います。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">三項演算子（条件 ? A : B）</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              「Aか、さもなければB」を表現する方法です。
            </p>
            <CodeBlock
              code={`function UserGreeting() {
  const isLoggedIn = true

  return (
    <div>
      {isLoggedIn ? (
        <p>おかえりなさい！</p>
      ) : (
        <p>ログインしてください。</p>
      )}
    </div>
  )
}`}
              language="tsx"
              title="三項演算子による条件分岐"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">{'&&'}（論理AND）演算子</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              「条件がtrue のときだけ表示する」パターンに使います。false の場合は何も表示されません。
            </p>
            <CodeBlock
              code={`function Notification() {
  const hasNewMessage = true
  const messageCount = 3

  return (
    <div>
      <h1>マイページ</h1>

      {/* hasNewMessage が true のときだけ表示 */}
      {hasNewMessage && (
        <div className="notification">
          {messageCount}件の新しいメッセージがあります
        </div>
      )}
    </div>
  )
}`}
              language="tsx"
              title="&& による条件付き表示"
              showLineNumbers
            />

            <div className="mt-4">
              <InfoBox type="warning" title="&& 演算子の注意点">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">{'0 && <p>表示</p>'}</code> と書くと、
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">0</code> がそのまま画面に表示されてしまいます。
                  数値を条件にする場合は
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">{'messageCount > 0 && <p>...</p>'}</code>
                  のように比較式にしましょう。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* Fragment */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">{'フラグメント（<> </>）'}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX には「1つのルート要素で囲む」というルールがあります。
              複数の要素を並べて返したい場合、余計な <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;div&gt;</code> で囲むと
              不要な DOM 要素が増えてしまいます。そこで使うのが<strong>フラグメント</strong>です。
            </p>

            <CodeBlock
              code={`// NG: 複数の要素をそのまま返せない
function App() {
  return (
    <h1>タイトル</h1>
    <p>本文</p>
  )
  // エラー: JSX expressions must have one parent element
}

// OK: div で囲む（でも余計な div が増える）
function App() {
  return (
    <div>
      <h1>タイトル</h1>
      <p>本文</p>
    </div>
  )
}

// ベスト: フラグメントを使う（DOMに余計な要素が追加されない）
function App() {
  return (
    <>
      <h1>タイトル</h1>
      <p>本文</p>
    </>
  )
}`}
              language="tsx"
              title="フラグメントの使い方"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;&gt; &lt;/&gt;</code> は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;React.Fragment&gt;</code> の省略形です。
              実際の DOM にはフラグメントは残らないので、レイアウトに影響を与えません。
            </p>

            <div className="mt-4">
              <InfoBox type="info" title="div とフラグメント、どっちを使う？">
                <p>
                  迷ったら、まずフラグメント <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;&gt; &lt;/&gt;</code> を使いましょう。
                  スタイリングのために囲む要素が必要な場合（flexbox のコンテナなど）は
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;div&gt;</code> を使います。
                  「この div は見た目のために必要か？」を判断基準にするとよいでしょう。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* JSX の中のコメント */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">JSX の中のコメント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              HTML のコメント <code className="bg-muted px-1 py-0.5 rounded text-xs">{'<!-- -->'}</code> は JSX では使えません。
              代わりに JavaScript のコメントを波括弧の中に書きます。
            </p>

            <CodeBlock
              code={`function App() {
  return (
    <div>
      {/* JSX の中のコメントはこう書く */}
      <h1>タイトル</h1>

      {/*
        複数行のコメントも
        このように書ける
      */}
      <p>本文</p>
    </div>
  )
}`}
              language="tsx"
              title="JSX のコメント"
              showLineNumbers
            />
          </section>

          {/* スタイルの書き方 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">インラインスタイルの書き方</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX でインラインスタイルを指定する場合は、文字列ではなく JavaScript オブジェクトで渡します。
              プロパティ名はキャメルケースで書きます。
            </p>

            <CodeBlock
              code={`// HTML のインラインスタイル
// <div style="background-color: blue; font-size: 16px; margin-top: 20px;">

// JSX のインラインスタイル
<div style={{
  backgroundColor: 'blue',
  fontSize: '16px',
  marginTop: '20px',
}}>
  スタイル付きの要素
</div>`}
              language="tsx"
              title="インラインスタイルの違い"
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              二重の波括弧 <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{{}}'}</code> に見えますが、
              外側は「JSX の式埋め込み」、内側は「JavaScript オブジェクトのリテラル」です。
            </p>

            <div className="mt-4">
              <InfoBox type="info" title="インラインスタイルは推奨されない">
                <p>
                  実際の開発では、インラインスタイルはあまり使いません。
                  CSS Modules、Tailwind CSS、styled-components など、より良いスタイリング手法を STEP 17 以降で学びます。
                  今は「JSX ではこう書く」ということだけ知っておけば十分です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* まとめ表 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">HTML と JSX の違い まとめ</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/30">項目</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/30">HTML</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/30">JSX</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">CSS クラス</td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">class</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">className</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">label の for</td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">for</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">htmlFor</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">属性名</td>
                    <td className="py-3 px-4">ケバブケース</td>
                    <td className="py-3 px-4">キャメルケース</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">自己閉じタグ</td>
                    <td className="py-3 px-4">省略可</td>
                    <td className="py-3 px-4">必須 <code className="bg-muted px-1 rounded text-xs">/&gt;</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">スタイル</td>
                    <td className="py-3 px-4">文字列</td>
                    <td className="py-3 px-4">オブジェクト</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">コメント</td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">{'<!-- -->'}</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">{'{/* */}'}</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">値の埋め込み</td>
                    <td className="py-3 px-4">不可</td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">{'{変数}'}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* このステップのまとめ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>JSX は <strong>HTML ではなく JavaScript の拡張構文</strong>である</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><code className="bg-muted px-1 py-0.5 rounded">class</code> → <code className="bg-muted px-1 py-0.5 rounded">className</code>、
                  自己閉じタグ必須など、HTML との違いを理解した</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>波括弧 <code className="bg-muted px-1 py-0.5 rounded">{'{ }'}</code> で JavaScript の式を埋め込める</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>条件分岐は<strong>三項演算子</strong>と <strong>{'&&'} 演算子</strong>で行う</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>フラグメント <code className="bg-muted px-1 py-0.5 rounded">&lt;&gt; &lt;/&gt;</code> で余計な DOM 要素を減らせる</span>
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
