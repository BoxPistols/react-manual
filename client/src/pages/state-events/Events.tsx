import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function Events() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">
            STEP 9
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          イベントハンドリング
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ユーザーのクリック、入力、送信などの操作に応答する方法を学びます。useState と組み合わせることで、インタラクティブな UI の構築パターンが完成します。
        </p>

        <WhyNowBox tags={['ユーザー操作', 'イベント', 'インタラクション']}>
          <p>
            useState で「データの変更」ができるようになりました。次は「いつ変更するか」、つまりユーザーの操作（イベント）に応答する方法を学びます。
          </p>
          <p>
            ボタンのクリック、テキストの入力、フォームの送信、キーボード操作 ── すべてのインタラクションは「イベント」として React に伝わります。デザインツールでいう「プロトタイプのトリガー」と同じ考え方です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* onClick */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">onClick: クリックイベント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最も基本的なイベントです。ボタンやリンク、カードなど、クリック可能な要素に使います。
            </p>
            <CodePreview
              code={`function ClickExample() {
  const [message, setMessage] = React.useState('ボタンをクリックしてください')
  const [count, setCount] = React.useState(0)

  const handleClick = () => {
    setCount(count + 1)
    setMessage('クリックされました！（' + (count + 1) + '回目）')
  }

  return (
    <div style={{ padding: '16px' }}>
      <p style={{ fontSize: '16px', marginBottom: '12px' }}>{message}</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleClick}
          style={{ padding: '8px 16px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          クリック
        </button>
        <button
          onClick={() => { setMessage('ボタンをクリックしてください'); setCount(0) }}
          style={{ padding: '8px 16px', backgroundColor: '#6B7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          リセット
        </button>
      </div>
    </div>
  )
}

function App() {
  return <ClickExample />
}
`}
              title="onClick の基本 → ボタンをクリックしてみよう"
              previewHeight={120}
            />
            <InfoBox type="warning" title="よくある間違い: 関数の呼び出しを渡してしまう">
              <p>
                <code>onClick={'{handleClick()}'}</code> と書くと、レンダリング時に関数が即座に実行されてしまいます。関数の「参照」を渡す必要があるので、括弧なしの <code>onClick={'{handleClick}'}</code> が正しい書き方です。引数を渡したい場合は <code>onClick={'() => handleClick(id)'}</code> のようにアロー関数で包みます。
              </p>
            </InfoBox>
          </section>

          {/* TypeScriptでのイベント型 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">TypeScript でのイベント型</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScript を使うと、イベントハンドラに正確な型を付けることができます。型を付けることで、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">e.target</code> のプロパティに安全にアクセスでき、エディタの補完も効くようになります。
            </p>
            <CodeBlock
              code={`// よく使うイベント型の一覧

// マウスイベント
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.clientX, e.clientY);  // クリック座標
  console.log(e.currentTarget);       // イベントが設定された要素（button）
};

const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
  // HTMLDivElement を指定すると div 固有のプロパティにもアクセス可
};

// フォームイベント
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// 入力変更イベント（要素ごとに型が異なる）
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);    // string
  console.log(e.target.checked);  // boolean（checkbox の場合）
};

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(e.target.value);
};

const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log(e.target.value);
};

// キーボードイベント
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  console.log(e.key);      // 押されたキー（'Enter', 'Escape' など）
  console.log(e.ctrlKey);  // Ctrl が押されているか
  console.log(e.metaKey);  // Cmd（Mac）が押されているか
  console.log(e.shiftKey); // Shift が押されているか
};

// フォーカスイベント
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  console.log(e.target);         // フォーカスされた要素
  console.log(e.relatedTarget);  // フォーカスが外れた要素
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  console.log('フォーカスが外れました');
};

// ドラッグイベント
const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  e.dataTransfer.setData('text/plain', 'ドラッグ中');
};`}
              language="tsx"
              title="イベント型の一覧と使い方"
              showLineNumbers
            />
            <InfoBox type="success" title="型がわからないときは？">
              <p>
                イベントの型がわからないときは、まずインラインで書いてみましょう。例えば <code>onChange={'{(e) => {}}'}</code> と書くと、エディタ（VS Code）が自動的に <code>e</code> の型を推論してくれます。その型をコピーして関数の引数に使えば OK です。
              </p>
            </InfoBox>

            <CodeBlock
              code={`// よくあるパターン: 型を省略できるケース

// インラインなら型推論が効く
<button onClick={(e) => {
  // e は自動的に React.MouseEvent<HTMLButtonElement> と推論される
  console.log(e.clientX);
}}>クリック</button>

// 関数を別定義するときは型が必要
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.clientX);
};
<button onClick={handleClick}>クリック</button>

// イベントオブジェクトを使わないなら型は不要
const handleSimpleClick = () => {
  console.log('クリックされた');
};
<button onClick={handleSimpleClick}>クリック</button>`}
              language="tsx"
              title="型を省略できるケースとできないケース"
            />
          </section>

          {/* イベントハンドラの命名規則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">イベントハンドラの命名規則</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              イベントハンドラ関数の命名には「handle + 対象 + イベント名」というパターンが広く使われています。
            </p>
            <CodeBlock
              code={`// 命名パターン: handle + 何を + どうする
function FormComponent() {
  // handleClick - 汎用的なクリック
  const handleClick = () => { /* ... */ };

  // handleSubmit - フォーム送信
  const handleSubmit = () => { /* ... */ };

  // handleNameChange - 名前フィールドの変更
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* ... */
  };

  // handleDeleteItem - アイテム削除
  const handleDeleteItem = (id: number) => { /* ... */ };

  // handleToggleMenu - メニューの開閉
  const handleToggleMenu = () => { /* ... */ };

  // handleKeyDown - キー押下
  const handleKeyDown = (e: React.KeyboardEvent) => { /* ... */ };

  return (
    <div>
      <button onClick={handleClick}>クリック</button>
      <input onChange={handleNameChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">送信</button>
      </form>
    </div>
  );
}

// コンポーネントの Props としてイベントハンドラを渡す場合は on + イベント名
interface CardProps {
  onDelete: (id: number) => void;   // Props は onXxx
  onClick: () => void;
}

function Card({ onDelete, onClick }: CardProps) {
  // 内部のハンドラは handleXxx
  const handleDeleteClick = () => {
    if (confirm('削除しますか？')) {
      onDelete(123);
    }
  };

  return (
    <div onClick={onClick}>
      <button onClick={handleDeleteClick}>削除</button>
    </div>
  );
}`}
              language="tsx"
              title="命名規則: handle vs on"
            />
            <InfoBox type="success" title="命名のルール">
              <p>
                コンポーネント内部の関数は <strong>handleXxx</strong>、Props として外部に公開するときは <strong>onXxx</strong> と名付けるのが React のお約束です。HTML のイベント（onClick, onChange）と揃えることで、直感的に理解できます。
              </p>
            </InfoBox>
          </section>

          {/* onChange */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">onChange: 入力の変更イベント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テキスト入力、セレクトボックス、チェックボックスなど、フォーム要素の値が変わったときに発火するイベントです。
            </p>
            <CodePreview
              code={`function InputEvents() {
  const [text, setText] = React.useState('')
  const [color, setColor] = React.useState('red')

  return (
    <div style={{ padding: '16px', maxWidth: '300px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>テキスト</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="入力してみよう"
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', boxSizing: 'border-box' }}
        />
        <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>入力値: {text || '(なし)'}</p>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>色を選択</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
        >
          <option value="red">赤</option>
          <option value="blue">青</option>
          <option value="green">緑</option>
        </select>
        <div style={{ marginTop: '8px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: color }} />
      </div>
    </div>
  )
}

function App() {
  return <InputEvents />
}
`}
              title="onChange でフォーム入力 → 操作してみよう"
              previewHeight={240}
            />
          </section>

          {/* onSubmit と preventDefault */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">onSubmit とデフォルト動作の防止</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              フォームを送信すると、ブラウザはページを再読み込みしようとします。React アプリではこの動作を防いで、JavaScript で処理を行います。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function SearchForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // ページ再読み込みを防止！

    if (!query.trim()) return;

    // 実際のアプリでは API を呼ぶ
    setResults((prev) => [...prev, \`「\${query}」の検索結果\`]);
    setQuery(''); // 入力をクリア
  };

  return (
    <div className="p-6 max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索ワードを入力..."
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          検索
        </button>
      </form>

      <ul className="space-y-2">
        {results.map((result, i) => (
          <li key={i} className="p-2 bg-gray-50 rounded">
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}`}
              language="tsx"
              title="onSubmit と preventDefault"
            />
            <InfoBox type="error" title="e.preventDefault() を忘れると...">
              <p>
                フォームの onSubmit で <code>e.preventDefault()</code> を忘れると、送信するたびにページが再読み込みされ、state がすべてリセットされてしまいます。React のフォーム送信では必ず呼びましょう。
              </p>
            </InfoBox>
          </section>

          {/* イベントハンドラに引数を渡す */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">イベントハンドラに引数を渡す</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              リストの各項目に対してイベントを設定するとき、どのアイテムがクリックされたかを知る必要があります。アロー関数で引数を渡しましょう。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface Notification {
  id: number;
  title: string;
  read: boolean;
}

function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: '新しいメッセージが届きました', read: false },
    { id: 2, title: 'プロジェクトが更新されました', read: false },
    { id: 3, title: 'レビューが完了しました', read: true },
  ]);

  // id を受け取って既読にする
  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // id を受け取って削除する
  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // すべて既読にする
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="p-6 max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">通知</h2>
        <button
          onClick={handleMarkAllAsRead}
          className="text-sm text-blue-600 hover:underline"
        >
          すべて既読にする
        </button>
      </div>

      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={\`p-3 rounded-lg border flex justify-between items-center
              \${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}\`}
          >
            <div>
              <span className={\`text-sm \${notification.read ? 'text-gray-500' : 'font-medium'}\`}>
                {notification.title}
              </span>
            </div>
            <div className="flex gap-2">
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  既読
                </button>
              )}
              <button
                onClick={() => handleDelete(notification.id)}
                className="text-xs text-red-500 hover:underline"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
              language="tsx"
              title="各アイテムに引数付きイベントハンドラを設定"
              showLineNumbers
            />
          </section>

          {/* キーボードイベント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">キーボードイベント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              キーボード入力を検知して、ショートカットや特定のキー操作に応答できます。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function KeyboardEvents() {
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addLog = (message: string) => {
    setLog((prev) => [message, ...prev.slice(0, 9)]); // 最新10件
  };

  // onKeyDown: キーが押されたとき
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter キーで確定
    if (e.key === 'Enter') {
      addLog(\`確定: "\${input}"\`);
      setInput('');
    }

    // Escape キーでクリア
    if (e.key === 'Escape') {
      setInput('');
      addLog('入力をクリアしました');
    }

    // Ctrl/Cmd + Enter で送信
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      addLog('Ctrl+Enter: 送信しました');
    }
  };

  return (
    <div className="p-6 max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          入力してEnterで確定、Escapeでクリア
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="テキストを入力..."
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm font-medium mb-2">ログ:</p>
        {log.length === 0 ? (
          <p className="text-sm text-gray-400">まだ操作がありません</p>
        ) : (
          <ul className="text-sm space-y-1">
            {log.map((entry, i) => (
              <li key={i} className="text-gray-600">
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}`}
              language="tsx"
              title="キーボードイベントの処理"
            />
            <InfoBox type="info" title="よく使うキーボードイベント">
              <p>
                <code>onKeyDown</code>（キーを押したとき）が最も汎用的です。<code>e.key</code> で押されたキー名を取得し、<code>e.ctrlKey</code>、<code>e.shiftKey</code>、<code>e.metaKey</code>（Mac の Cmd）で修飾キーの状態を確認できます。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="次のうち、onClick に正しくイベントハンドラを渡している書き方はどれですか？"
              options={[
                { label: 'onClick={handleClick()}' },
                { label: 'onClick={handleClick}', correct: true },
                { label: 'onClick="handleClick"' },
                { label: 'onClick={handleClick(id)}' },
              ]}
              explanation="onClick には関数の「参照」を渡す必要があります。handleClick() と括弧付きで書くとレンダリング時に即座に実行されてしまいます。引数を渡したい場合は onClick={() => handleClick(id)} のようにアロー関数で包みます。"
            />
          </section>

          {/* イベントバブリングとキャプチャ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">イベントバブリングとキャプチャ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              DOM イベントには「伝播（propagation）」の仕組みがあります。あるイベントが発生すると、その要素だけでなく親要素にも伝わっていきます。これを<strong>バブリング</strong>と呼びます。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function BubblingExample() {
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [message, ...prev.slice(0, 9)]);
  };

  return (
    <div className="p-6 max-w-md space-y-4">
      {/* 親要素の onClick */}
      <div
        onClick={() => addLog('外側の div がクリックされた')}
        className="p-6 bg-blue-100 rounded-lg"
      >
        <p className="text-sm mb-2">外側の div</p>

        {/* 中間要素の onClick */}
        <div
          onClick={() => addLog('内側の div がクリックされた')}
          className="p-4 bg-green-100 rounded-lg"
        >
          <p className="text-sm mb-2">内側の div</p>

          {/* ボタンの onClick */}
          <button
            onClick={() => addLog('ボタンがクリックされた')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            ボタン
          </button>
        </div>
      </div>

      {/* ボタンをクリックすると、3つ全部のハンドラが実行される！ */}
      {/* ボタン → 内側div → 外側div の順（バブリング） */}

      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-sm font-medium mb-1">イベントログ:</p>
        <ul className="text-xs space-y-0.5">
          {log.map((entry, i) => (
            <li key={i} className="text-gray-600">{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="イベントバブリングの挙動"
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              バブリングを止めたい場合は <code className="text-sm bg-muted px-1.5 py-0.5 rounded">e.stopPropagation()</code> を使います。たとえば、カード全体にクリックイベントがあるけど、内部の削除ボタンだけは別の処理をしたい場合に使います。
            </p>

            <CodeBlock
              code={`function CardWithButton() {
  const handleCardClick = () => {
    console.log('カード詳細へ遷移');
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // カードの onClick が実行されるのを防ぐ
    console.log('削除処理を実行');
  };

  return (
    <div onClick={handleCardClick} className="p-4 border rounded-lg cursor-pointer">
      <h3>記事タイトル</h3>
      <p>記事の説明...</p>
      <button
        onClick={handleDeleteClick}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        削除
      </button>
    </div>
  );
}

// キャプチャフェーズ: バブリングの逆（親→子の順）
// onClickCapture を使うとキャプチャフェーズでハンドラを実行できる
// 実務で使うことはほぼないが、知っておくとデバッグに役立つ
<div onClickCapture={() => console.log('キャプチャフェーズで実行')}>
  <button onClick={() => console.log('バブリングフェーズで実行')}>
    クリック
  </button>
</div>`}
              language="tsx"
              title="stopPropagation でバブリングを止める"
            />

            <InfoBox type="info" title="バブリングの流れ">
              <div className="space-y-1">
                <p><strong>キャプチャフェーズ</strong>: window → document → ... → 親 → ターゲット（上から下へ）</p>
                <p><strong>バブリングフェーズ</strong>: ターゲット → 親 → ... → document → window（下から上へ）</p>
                <p>React のイベント（onClick など）はデフォルトでバブリングフェーズです。キャプチャフェーズで処理したい場合は <code>onClickCapture</code> を使います。</p>
              </div>
            </InfoBox>
          </section>

          {/* デバウンスとスロットル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デバウンスとスロットル</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユーザーが高速に操作（入力やスクロールなど）するたびにイベントハンドラが大量に実行されると、パフォーマンスに悪影響を及ぼします。「デバウンス」と「スロットル」は、イベントの発火頻度を制御するテクニックです。
            </p>

            <CodeBlock
              code={`// デバウンス（Debounce）
// 「最後のイベントから一定時間待ってから実行する」
// 用途: 検索入力、ウィンドウリサイズ

import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // 前のタイマーをキャンセル
  }, [value, delay]);

  return debouncedValue;
}

// 使い方: 検索フォーム
function SearchWithDebounce() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300); // 300ms 待つ

  useEffect(() => {
    if (debouncedQuery) {
      console.log('API 呼び出し:', debouncedQuery);
      // ここで実際の検索 API を呼ぶ
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="検索..."
      className="w-full px-3 py-2 border rounded-lg"
    />
  );
  // 「r」「re」「rea」「reac」「react」と入力しても
  // API 呼び出しは最後の「react」の1回だけ！
}`}
              language="tsx"
              title="デバウンスで検索 API の呼び出しを最適化"
              showLineNumbers
            />

            <CodeBlock
              code={`// スロットル（Throttle）
// 「一定間隔ごとに最大1回だけ実行する」
// 用途: スクロール追跡、ウィンドウリサイズ、ドラッグ操作

import { useRef, useCallback } from 'react';

function useThrottle(callback: (...args: unknown[]) => void, delay: number) {
  const lastCall = useRef(0);

  return useCallback((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
}

// 使い方: スクロール位置の追跡
function ScrollTracker() {
  const handleScroll = useThrottle(() => {
    console.log('スクロール位置:', window.scrollY);
    // アナリティクスの送信やUIの更新など
  }, 200); // 200ms に1回だけ実行

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <div>スクロールしてみてください</div>;
}`}
              language="tsx"
              title="スロットルでスクロールイベントを制御"
            />

            <InfoBox type="info" title="デバウンスとスロットルの使い分け">
              <div className="space-y-1">
                <p><strong>デバウンス</strong>: ユーザーが操作を「終えた後」に処理したいとき（検索入力、フォームバリデーション）</p>
                <p><strong>スロットル</strong>: 操作「中」も定期的に処理したいとき（スクロール追跡、ドラッグ、リサイズ）</p>
                <p>実務では lodash の <code>_.debounce()</code> や <code>_.throttle()</code> を使うことも多いです。</p>
              </div>
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="カード全体にクリックイベントがあり、内部の削除ボタンだけカードのクリックを発火させたくない場合、削除ボタンのハンドラで何を呼ぶべきですか？"
              options={[
                { label: 'e.preventDefault()' },
                { label: 'e.stopPropagation()', correct: true },
                { label: 'e.stopImmediatePropagation()' },
                { label: 'return false' },
              ]}
              explanation="e.stopPropagation() はイベントが親要素に伝播（バブリング）するのを防ぎます。e.preventDefault() はブラウザのデフォルト動作（フォーム送信など）を防ぐためのもので、バブリングの制御には使いません。React では return false でイベントを止めることはできません。"
            />
          </section>

          {/* 実践例: カラーピッカー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: インタラクティブ・カラーピッカー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでのイベント処理を組み合わせた、実用的なカラーピッカーを作ります。クリック、入力、キーボードイベントを組み合わせています。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

const PRESET_COLORS = [
  { name: 'レッド', hex: '#EF4444' },
  { name: 'オレンジ', hex: '#F97316' },
  { name: 'アンバー', hex: '#F59E0B' },
  { name: 'グリーン', hex: '#22C55E' },
  { name: 'ブルー', hex: '#3B82F6' },
  { name: 'インディゴ', hex: '#6366F1' },
  { name: 'パープル', hex: '#A855F7' },
  { name: 'ピンク', hex: '#EC4899' },
];

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [customHex, setCustomHex] = useState('#3B82F6');
  const [copiedMessage, setCopiedMessage] = useState('');
  const [savedColors, setSavedColors] = useState<string[]>([]);

  // プリセット色をクリック
  const handlePresetClick = (hex: string) => {
    setSelectedColor(hex);
    setCustomHex(hex);
  };

  // カスタムHEX入力
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomHex(value);
    // 有効なHEXコードなら反映
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setSelectedColor(value);
    }
  };

  // Enter で色を確定
  const handleHexKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && /^#[0-9A-Fa-f]{6}$/.test(customHex)) {
      handleSaveColor();
    }
  };

  // 色をコピー
  const handleCopyColor = () => {
    navigator.clipboard.writeText(selectedColor);
    setCopiedMessage('コピーしました！');
    setTimeout(() => setCopiedMessage(''), 2000);
  };

  // 色を保存
  const handleSaveColor = () => {
    if (!savedColors.includes(selectedColor)) {
      setSavedColors((prev) => [...prev, selectedColor]);
    }
  };

  // 保存した色を削除
  const handleRemoveSaved = (color: string) => {
    setSavedColors((prev) => prev.filter((c) => c !== color));
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-bold">カラーピッカー</h2>

      {/* プレビュー */}
      <div
        className="w-full h-32 rounded-xl shadow-inner transition-colors duration-300"
        style={{ backgroundColor: selectedColor }}
      />

      {/* カラーコード表示 */}
      <div className="flex items-center gap-2">
        <code className="text-lg font-mono font-bold">{selectedColor}</code>
        <button
          onClick={handleCopyColor}
          className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          コピー
        </button>
        <button
          onClick={handleSaveColor}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          保存
        </button>
        {copiedMessage && (
          <span className="text-sm text-green-600">{copiedMessage}</span>
        )}
      </div>

      {/* プリセット色 */}
      <div>
        <p className="text-sm font-medium mb-2">プリセット</p>
        <div className="grid grid-cols-8 gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => handlePresetClick(color.hex)}
              title={color.name}
              className={\`w-8 h-8 rounded-full transition-transform hover:scale-110
                \${selectedColor === color.hex ? 'ring-2 ring-offset-2 ring-blue-500' : ''}\`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* カスタム入力 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          カスタム HEX（Enter で保存）
        </label>
        <input
          type="text"
          value={customHex}
          onChange={handleHexChange}
          onKeyDown={handleHexKeyDown}
          placeholder="#FF5733"
          maxLength={7}
          className="w-full px-3 py-2 border rounded-lg font-mono"
        />
      </div>

      {/* 保存した色 */}
      {savedColors.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">
            保存した色（{savedColors.length}）
          </p>
          <div className="flex flex-wrap gap-2">
            {savedColors.map((color) => (
              <div key={color} className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-mono">{color}</span>
                <button
                  onClick={() => handleRemoveSaved(color)}
                  className="text-gray-400 hover:text-red-500 text-xs ml-1"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              title="カラーピッカー - 複数のイベントを組み合わせた実践例"
              showLineNumbers
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="クリックカウンター + キーボードショートカット"
              description="ボタンのクリックでカウントアップし、キーボードショートカット（r キーでリセット、上矢印キーでカウントアップ、下矢印キーでカウントダウン）に対応するコンポーネントを完成させてください。onKeyDown ハンドラの中身を書いてください。"
              initialCode={`const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  // ここにコードを書いてください
  // 'r' キーでカウントを0にリセット
  // 'ArrowUp' キーでカウントアップ
  // 'ArrowDown' キーでカウントを0以上の範囲でダウン
};`}
              answer={`const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === 'r') {
    setCount(0);
  }
  if (e.key === 'ArrowUp') {
    setCount((prev) => prev + 1);
  }
  if (e.key === 'ArrowDown') {
    setCount((prev) => Math.max(0, prev - 1));
  }
};`}
              hints={[
                'e.key でどのキーが押されたかを判別できます。',
                'リセットには setCount(0) を使います。',
                '0未満にならないようにするには Math.max(0, prev - 1) を使うと便利です。',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">主要なイベント</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- <code>onClick</code> - クリック</li>
                  <li>- <code>onChange</code> - 値の変更（input, select）</li>
                  <li>- <code>onSubmit</code> - フォーム送信</li>
                  <li>- <code>onKeyDown</code> - キーボード押下</li>
                  <li>- <code>onFocus</code> / <code>onBlur</code> - フォーカス</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">ベストプラクティス</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 関数名は handleXxx（内部）/ onXxx（Props）</li>
                  <li>- フォーム送信は e.preventDefault() 必須</li>
                  <li>- 引数はアロー関数で渡す</li>
                  <li>- onClick={'{fn}'} であり onClick={'{fn()}'} ではない</li>
                  <li>- バブリングは stopPropagation() で制御</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 公式: Responding to Events',
                  url: 'https://react.dev/learn/responding-to-events',
                  description: 'イベントハンドラの基本的な使い方、命名規則、バブリングの仕組みを解説',
                },
                {
                  title: 'MDN: Event reference',
                  url: 'https://developer.mozilla.org/ja/docs/Web/Events',
                  description: 'ブラウザが提供するすべてのイベントのリファレンス',
                },
                {
                  title: 'React 公式: SyntheticEvent',
                  url: 'https://react.dev/reference/react-dom/components/common#react-event-object',
                  description: 'React の合成イベントオブジェクトの詳細なリファレンス',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'onClick と addEventListener の違いは？',
                  answer: 'React の onClick はコンポーネントのレンダリングに連動してイベントリスナーが自動管理されます。addEventListener は手動で追加・削除が必要で、管理が煩雑になりがちです。React では基本的に JSX の onClick などを使い、グローバルイベント（window の scroll や resize など）だけ useEffect 内で addEventListener を使うのが一般的です。',
                },
                {
                  question: '合成イベント（SyntheticEvent）とは？',
                  answer: 'React はブラウザのネイティブイベントをラップした「合成イベント（SyntheticEvent）」を使います。これにより、すべてのブラウザで同じ API でイベントを扱えます。e.nativeEvent で元のブラウザイベントにアクセスすることも可能ですが、通常は合成イベントだけで十分です。',
                },
                {
                  question: 'イベント型が難しい場合はどうすればいい？',
                  answer: '最初は型を省略してインラインで書き、エディタの型推論に頼りましょう。VS Code なら、onChange={(e) => {}} と書くだけで e の型が自動的に表示されます。慣れてきたら React.MouseEvent<HTMLButtonElement> のように明示的に書く練習をしましょう。型がわからなければ React.SyntheticEvent をベースの型として使うこともできます。',
                },
              ]}
            />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
