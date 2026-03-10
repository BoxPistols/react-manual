import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function UseState() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 8
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          useState
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React で「変化するデータ」を扱うための仕組み、useState を学びます。ボタンをクリックしたら数字が増える、テキストを入力したら表示が変わる。そんなインタラクティブな UI を作る第一歩です。
        </p>

        <WhyNowBox tags={['インタラクティブUI', '状態管理', 'Hooks']}>
          <p>
            ここまでは「表示するだけ」の静的なコンポーネントを作ってきました。しかし、実際の UI はユーザーの操作に応じて変化します。ボタンを押したらモーダルが開く、入力したらリアルタイムにプレビューされる、カウンターが増える...。
          </p>
          <p>
            これらを実現するのが「state（状態）」です。state は時間とともに変化するデータで、state が変わると React は自動的に画面を再描画します。Figma のプロトタイプで「変数」を使うのと似ていますが、React の state はもっと強力です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* state とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">state（状態）とは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              state は「時間とともに変化するデータ」です。Props は親から受け取る読み取り専用のデータでしたが、state はコンポーネント自身が管理し、自分で変更できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Props</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 親から受け取る</li>
                  <li>- 読み取り専用（変更不可）</li>
                  <li>- 関数の引数のようなもの</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <h3 className="font-bold text-foreground mb-2">State</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- コンポーネント自身が管理する</li>
                  <li>- 変更可能（setState で更新）</li>
                  <li>- 変更されると画面が再描画される</li>
                </ul>
              </div>
            </div>
            <InfoBox type="info" title="state が変わると画面が更新される">
              <p>
                これが React の最も重要な仕組みです。state を更新すると、React は自動的にそのコンポーネントを再レンダリング（再描画）します。手動で DOM を操作する必要はありません。
              </p>
            </InfoBox>
          </section>

          {/* useState の基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useState の基本: カウンター</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useState は React が提供する「Hook（フック）」の一つです。使い方はシンプルで、初期値を渡すと「現在の値」と「更新関数」のペアを返します。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function Counter() {
  // useState の戻り値を分割代入で受け取る
  // count: 現在の値（初期値は 0）
  // setCount: 値を更新する関数
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 text-center">
      <p className="text-6xl font-bold mb-6">{count}</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          - 減らす
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          リセット
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + 増やす
        </button>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="最も基本的な useState の例: カウンター"
              showLineNumbers
            />
            <CodeBlock
              code={`// useState の構造を分解して理解する

// ステップ1: useState を呼ぶと配列が返る
const result = useState(0);  // [0, 関数]

// ステップ2: 配列の分割代入で取り出す
const [count, setCount] = useState(0);
// count → 現在の値（最初は 0）
// setCount → 値を更新する関数

// ステップ3: setCount を呼ぶと値が更新される
setCount(5);    // count が 5 になる
setCount(count + 1);  // count が 1 増える

// 命名規則: [値, set値] がお約束
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState<string[]>([]);`}
              language="tsx"
              title="useState の仕組みを理解する"
            />
          </section>

          {/* 文字列の state */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">文字列の state: テキスト入力</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テキスト入力フィールドと連携するのは useState の最も一般的な使い方の一つです。入力が変わるたびに state を更新し、リアルタイムに表示に反映します。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function NamePreview() {
  const [name, setName] = useState('');

  return (
    <div className="p-6 max-w-md mx-auto">
      <label className="block mb-2 text-sm font-medium">
        お名前を入力してください
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="山田太郎"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
      />

      {/* リアルタイムプレビュー */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">プレビュー:</p>
        <p className="text-2xl font-bold mt-1">
          {name ? \`こんにちは、\${name}さん！\` : 'お名前を入力してください'}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {name.length} 文字入力済み
        </p>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="テキスト入力とリアルタイムプレビュー"
            />
          </section>

          {/* 真偽値の state */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">真偽値の state: トグル</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              真偽値（boolean）の state は、表示/非表示の切り替え、モーダルの開閉、ダークモードの切り替えなどに使います。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function TogglePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'bg-gray-900 text-white p-6' : 'bg-white text-gray-900 p-6'}>
      {/* ダークモード切り替え */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="mb-6 px-4 py-2 rounded-lg border"
      >
        {isDark ? '☀️ ライトモード' : '🌙 ダークモード'}
      </button>

      {/* アコーディオン */}
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left font-medium flex justify-between items-center"
        >
          <span>詳細情報を見る</span>
          <span className={\`transform transition-transform \${isOpen ? 'rotate-180' : ''}\`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="px-4 py-3 border-t">
            <p>ここに詳細な情報が表示されます。</p>
            <p>isOpen の値が true のときだけ、このパネルが見えます。</p>
          </div>
        )}
      </div>
    </div>
  );
}`}
              language="tsx"
              title="真偽値でトグル・アコーディオンを実装"
            />
          </section>

          {/* 配列の state */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">配列の state: Todo リスト</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              配列の state はリスト表示に使います。ここで重要なのは、配列を直接変更（push, splice）するのではなく、新しい配列を作って setState に渡すことです。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  // 追加: スプレッド構文で新しい配列を作る
  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      done: false,
    };
    setTodos([...todos, newTodo]);  // 既存の配列 + 新しい要素
    setInput('');
  };

  // 完了/未完了の切り替え: map で新しい配列を作る
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // 削除: filter で新しい配列を作る
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Todo リスト</h2>

      {/* 入力フォーム */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="新しいタスク..."
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          追加
        </button>
      </div>

      {/* リスト表示 */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5"
            />
            <span className={\`flex-1 \${todo.done ? 'line-through text-gray-400' : ''}\`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      {/* 統計 */}
      <p className="mt-4 text-sm text-gray-500">
        {todos.filter((t) => t.done).length} / {todos.length} 完了
      </p>
    </div>
  );
}`}
              language="tsx"
              title="Todo リスト - 配列の state を完全に使いこなす"
              showLineNumbers
            />
          </section>

          {/* オブジェクトの state */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">オブジェクトの state: フォームデータ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              複数の関連するデータをまとめて管理するとき、オブジェクトの state を使います。スプレッド構文で既存の値を保持しながら、特定のプロパティだけ更新します。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  department: string;
  agreeToTerms: boolean;
}

function ProfileForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    department: 'design',
    agreeToTerms: false,
  });

  // 汎用的な更新関数
  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData({
      ...formData,       // 既存のデータをコピー
      [field]: value,    // 指定したフィールドだけ更新
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">名前</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">メール</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">部署</label>
        <select
          value={formData.department}
          onChange={(e) => updateField('department', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="design">デザイン部</option>
          <option value="engineering">エンジニアリング部</option>
          <option value="marketing">マーケティング部</option>
        </select>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={(e) => updateField('agreeToTerms', e.target.checked)}
        />
        <span className="text-sm">利用規約に同意する</span>
      </label>

      {/* 現在の state を表示（デバッグ用） */}
      <pre className="mt-4 p-3 bg-gray-100 rounded-lg text-xs overflow-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
}`}
              language="tsx"
              title="オブジェクトの state でフォームデータを管理"
              showLineNumbers
            />
          </section>

          {/* state 更新のルール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">state 更新のルール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              state を正しく更新するために、いくつかの重要なルールがあります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">ルール1: state を直接変更しない（イミュータビリティ）</h3>
            <CodeBlock
              code={`const [items, setItems] = useState(['A', 'B', 'C']);

// NG: 配列を直接変更する
items.push('D');          // React は変更を検知できない！
items[0] = 'Z';           // 画面が更新されない！

// OK: 新しい配列を作って setState に渡す
setItems([...items, 'D']);              // 追加
setItems(items.map((item, i) =>        // 変更
  i === 0 ? 'Z' : item
));
setItems(items.filter((_, i) => i !== 0));  // 削除

// オブジェクトも同様
const [user, setUser] = useState({ name: '田中', age: 28 });

// NG: 直接変更
user.name = '佐藤';      // React は検知できない！

// OK: 新しいオブジェクトを作る
setUser({ ...user, name: '佐藤' });`}
              language="tsx"
              title="イミュータビリティ: state は新しい値で置き換える"
            />
            <InfoBox type="error" title="なぜ直接変更してはいけないのか？">
              <p>
                React は state の「参照」が変わったかどうかで再レンダリングの必要性を判断します。<code>items.push('D')</code> は同じ配列オブジェクトを変更するだけなので、React には「何も変わっていない」ように見えます。新しい配列/オブジェクトを作ることで、React が変更を検知して画面を更新できます。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ルール2: 前の値に基づく更新はコールバックを使う</h3>
            <CodeBlock
              code={`const [count, setCount] = useState(0);

// 注意が必要なケース: 連続で更新する場合
function handleTripleIncrement() {
  // NG: すべて同じ count（0）を参照するので +1 にしかならない
  setCount(count + 1);  // 0 + 1 = 1
  setCount(count + 1);  // 0 + 1 = 1（同じ count を参照）
  setCount(count + 1);  // 0 + 1 = 1（同じ count を参照）
  // 結果: count は 1

  // OK: コールバック関数を使うと、最新の値を受け取れる
  setCount((prev) => prev + 1);  // 0 + 1 = 1
  setCount((prev) => prev + 1);  // 1 + 1 = 2
  setCount((prev) => prev + 1);  // 2 + 1 = 3
  // 結果: count は 3
}

// 推奨: 前の値に基づく更新では常にコールバックを使う
setCount((prev) => prev + 1);
setTodos((prev) => [...prev, newTodo]);
setUser((prev) => ({ ...prev, name: '新しい名前' }));`}
              language="tsx"
              title="コールバック形式の setState"
            />
            <InfoBox type="warning" title="いつコールバックを使うべきか？">
              <p>
                前の state の値を使って新しい値を計算するときは、常にコールバック形式 <code>{'setState((prev) => ...)'}</code> を使うのが安全です。特にイベントハンドラ内で連続して setState を呼ぶ場合は必須です。
              </p>
            </InfoBox>
          </section>

          {/* state vs props */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">state と props の使い分け</h2>
            <InfoBox type="info" title="state と props の関係">
              <div className="space-y-3">
                <p>
                  <strong>props</strong> は「外から渡されるデータ」、<strong>state</strong> は「コンポーネント内部で管理するデータ」です。よくある設計パターンとして、親コンポーネントが state を持ち、子コンポーネントに props として渡します。
                </p>
                <div className="bg-white/50 dark:bg-black/20 rounded p-3 font-mono text-xs">
                  <p>親コンポーネント（state を持つ）</p>
                  <p>&nbsp;&nbsp;├── 子A（props で受け取る）</p>
                  <p>&nbsp;&nbsp;└── 子B（props で受け取る）</p>
                </div>
                <p>
                  state が変わると、そのデータを props として受け取っている子コンポーネントも自動的に再レンダリングされます。これが React の「単方向データフロー」です。
                </p>
              </div>
            </InfoBox>
            <CodeBlock
              code={`import { useState } from 'react';

// 子コンポーネント: props で値を受け取るだけ
function DisplayCount({ count, label }: { count: number; label: string }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}

// 親コンポーネント: state を管理し、子に props として渡す
function Dashboard() {
  const [visitors, setVisitors] = useState(0);
  const [sales, setSales] = useState(0);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <DisplayCount count={visitors} label="訪問者数" />
        <DisplayCount count={sales} label="売上件数" />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setVisitors((prev) => prev + 1)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          訪問者 +1
        </button>
        <button
          onClick={() => setSales((prev) => prev + 1)}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          売上 +1
        </button>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="親の state を子に props で渡すパターン"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">useState の使い方</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- <code>const [値, set値] = useState(初期値)</code></li>
                  <li>- 数値、文字列、真偽値、配列、オブジェクト全対応</li>
                  <li>- set関数を呼ぶと画面が自動更新される</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">絶対に守るルール</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- state は直接変更しない（イミュータブル）</li>
                  <li>- 前の値に基づく更新はコールバック形式</li>
                  <li>- 配列は push/splice ではなく spread/map/filter</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
