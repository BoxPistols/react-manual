import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function UseReducer() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 14</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">useReducer</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          useState だけでは管理しきれない、複雑な状態を整理するための Hook。
          「何が起きたか（アクション）」と「どう変わるか（リデューサー）」を分離することで、状態の変化が予測しやすくなります。
        </p>

        <WhyNowBox tags={['useReducer', 'dispatch', 'reducer', '複雑な状態管理']}>
          <p>
            useState を複数組み合わせて管理していると、「この state が変わったらあの state も変えて...」と処理が絡み合い始めます。
            useReducer を使えば、<strong>すべての状態変化を 1 箇所に集約</strong>でき、バグを減らしながらコードの見通しがよくなります。
            React 公式も「複雑な state ロジックには useReducer を推奨」しています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: useState の限界 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useState だけでは辛くなるとき</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              まず、useState だけで頑張ろうとして複雑になるケースを見てみましょう。
            </p>
            <CodeBlock
              language="tsx"
              title="useState で管理が複雑になる例"
              code={`function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 商品を追加するたびに複数の state を更新...
  const addItem = (item: CartItem) => {
    setItems([...items, item]);
    setTotal(total + item.price);
    setItemCount(itemCount + 1);
    // discount は条件次第で変わったり変わらなかったり...
    if (itemCount + 1 >= 3) {
      setDiscount(total * 0.1);
    }
  };

  // 削除も同様に複数の state を同時に更新...
  // どこかで整合性が崩れるリスクが高い
}`}
            />
            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="関連する state のバラバラ管理は危険">
                <p>
                  複数の useState が互いに依存していると、更新のタイミングがずれたり、
                  1 つだけ更新し忘れたりしてバグの原因になります。
                  useReducer を使えば、これらを 1 つのオブジェクトにまとめて一括管理できます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 2: useReducer の基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useReducer の基本構造</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useReducer は 3 つの要素で構成されています:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-2">
              <li><strong>State（状態）</strong>: 現在のデータ</li>
              <li><strong>Action（アクション）</strong>: 「何が起きたか」を表すオブジェクト</li>
              <li><strong>Reducer（リデューサー）</strong>: State と Action を受け取り、新しい State を返す関数</li>
            </ol>

            <div className="mb-6">
              <InfoBox type="info" title="デザイナー向けのたとえ">
                <p>
                  Figma のバージョン履歴に似ています。各変更（Action）が「テキスト色を赤に変更」「フォントサイズを 16px に変更」のように記録され、
                  Reducer がそれを受け取って新しいデザイン（State）を生成します。何がどう変わったかが明確で、やり直し（undo）もしやすいのが特徴です。
                </p>
              </InfoBox>
            </div>

            <CodeBlock
              language="tsx"
              title="useReducer の基本構文"
              showLineNumbers
              code={`import { useReducer } from 'react';

// 1. State の型
interface CounterState {
  count: number;
}

// 2. Action の型
type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number };

// 3. Reducer 関数
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      return state;
  }
}

// 4. コンポーネントで使う
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="text-center">
      <p className="text-4xl font-bold mb-4">{state.count}</p>
      <div className="flex gap-2 justify-center">
        <button onClick={() => dispatch({ type: 'decrement' })}>
          -1
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>
          リセット
        </button>
        <button onClick={() => dispatch({ type: 'increment' })}>
          +1
        </button>
        <button onClick={() => dispatch({ type: 'set', payload: 100 })}>
          100にセット
        </button>
      </div>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="dispatch とは？">
                <p>
                  <code>dispatch</code> は「アクションを送る」関数です。
                  <code>dispatch(&#123; type: 'increment' &#125;)</code> と書くと、Reducer に「increment アクションが発生した」と伝えます。
                  Reducer がそれを受け取り、新しい state を返します。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 3: useState との比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useState と useReducer の使い分け</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">観点</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">useState</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">useReducer</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">状態の数</td>
                    <td className="py-3 px-4">1〜2 個の独立した値</td>
                    <td className="py-3 px-4">複数の関連する値</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">更新ロジック</td>
                    <td className="py-3 px-4">シンプルな代入</td>
                    <td className="py-3 px-4">条件分岐が多い複雑な更新</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">コード量</td>
                    <td className="py-3 px-4">少ない</td>
                    <td className="py-3 px-4">やや多い（型定義 + Reducer）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">テスト</td>
                    <td className="py-3 px-4">コンポーネントごと</td>
                    <td className="py-3 px-4">Reducer 関数を単体テスト可能</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">デバッグ</td>
                    <td className="py-3 px-4">どこで変わったか追いにくい</td>
                    <td className="py-3 px-4">Action を見れば変更の経緯がわかる</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <InfoBox type="success" title="判断基準">
                <p>
                  迷ったら useState から始めましょう。「state を更新する場所が 3 箇所以上ある」「複数の state が常にセットで更新される」
                  と感じたら useReducer への移行を検討するタイミングです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 4: Todo アプリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: useReducer で Todo アプリを作る</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useReducer の威力を感じられる、実用的な Todo アプリを作ってみましょう。
              追加・削除・完了切り替え・フィルターの機能を持ちます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. 型定義とリデューサー</h3>
            <CodeBlock
              language="tsx"
              title="todoReducer.ts"
              showLineNumbers
              code={`// Todo の型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// State の型
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  nextId: number;
}

// Action の型（ユニオン型で全アクションを列挙）
type TodoAction =
  | { type: 'add'; payload: string }
  | { type: 'toggle'; payload: number }
  | { type: 'delete'; payload: number }
  | { type: 'setFilter'; payload: 'all' | 'active' | 'completed' }
  | { type: 'clearCompleted' };

// 初期状態
const initialState: TodoState = {
  todos: [],
  filter: 'all',
  nextId: 1,
};

// Reducer 関数
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            text: action.payload,
            completed: false,
          },
        ],
        nextId: state.nextId + 1,
      };

    case 'toggle':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload
        ),
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    default:
      return state;
  }
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">2. コンポーネント</h3>
            <CodeBlock
              language="tsx"
              title="TodoApp.tsx"
              showLineNumbers
              code={`import { useReducer, useState } from 'react';

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');

  // フィルターに応じた Todo リストを計算
  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const activeTodoCount = state.todos.filter(
    (t) => !t.completed
  ).length;

  // 追加処理
  const handleAdd = () => {
    if (!input.trim()) return;
    dispatch({ type: 'add', payload: input.trim() });
    setInput('');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo リスト</h1>

      {/* 入力フォーム */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="新しいタスクを入力..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          追加
        </button>
      </div>

      {/* フィルターボタン */}
      <div className="flex gap-2 mb-4">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => dispatch({ type: 'setFilter', payload: f })}
            className={
              state.filter === f
                ? 'px-3 py-1 rounded bg-blue-500 text-white'
                : 'px-3 py-1 rounded bg-gray-200'
            }
          >
            {f === 'all' ? 'すべて' : f === 'active' ? '未完了' : '完了済み'}
          </button>
        ))}
      </div>

      {/* Todo リスト */}
      <ul className="space-y-2 mb-4">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-3 border rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: 'toggle', payload: todo.id })
              }
            />
            <span
              className={
                todo.completed
                  ? 'flex-1 line-through text-gray-400'
                  : 'flex-1'
              }
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: 'delete', payload: todo.id })
              }
              className="text-red-500 text-sm"
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      {/* フッター */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>残り {activeTodoCount} 件</span>
        <button
          onClick={() => dispatch({ type: 'clearCompleted' })}
          className="text-red-500 hover:underline"
        >
          完了済みを削除
        </button>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 5: useReducer + useContext */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">応用: useReducer + useContext</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useReducer と useContext を組み合わせると、アプリ全体で共有する複雑な状態管理が実現できます。
              これは Redux のような状態管理ライブラリの基本的なしくみと同じ考え方です。
            </p>
            <CodeBlock
              language="tsx"
              title="Context + Reducer パターン"
              showLineNumbers
              code={`import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';

// Context を 2 つに分割（state と dispatch を分ける）
const TodoStateContext = createContext<TodoState | undefined>(
  undefined
);
const TodoDispatchContext = createContext<
  React.Dispatch<TodoAction> | undefined
>(undefined);

// Provider
export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// カスタム Hook
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('TodoProvider の中で使ってください');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('TodoProvider の中で使ってください');
  }
  return context;
}

// 使い方: どのコンポーネントからでもアクセス可能
function AddTodoButton() {
  const dispatch = useTodoDispatch();

  return (
    <button onClick={() => dispatch({ type: 'add', payload: '新しいタスク' })}>
      タスク追加
    </button>
  );
}

function TodoCount() {
  const state = useTodoState();
  const active = state.todos.filter((t) => !t.completed).length;

  return <p>残り {active} 件</p>;
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="state と dispatch を分割するメリット">
                <p>
                  state と dispatch を別々の Context にすることで、dispatch だけを使うコンポーネント（ボタンなど）は
                  state が変わっても再レンダーされません。パフォーマンスの最適化に役立ちます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 6: パターンとベストプラクティス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Reducer のベストプラクティス</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. Action は「何が起きたか」を表現する</h3>
            <CodeBlock
              language="tsx"
              title="Action の命名"
              code={`// NG: 「どう変えるか」を名前にしている
dispatch({ type: 'setItems', payload: [...items, newItem] });

// OK: 「何が起きたか」を名前にする
dispatch({ type: 'itemAdded', payload: newItem });
dispatch({ type: 'itemDeleted', payload: itemId });
dispatch({ type: 'filterChanged', payload: 'active' });`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">2. Reducer は純粋関数にする</h3>
            <CodeBlock
              language="tsx"
              title="純粋関数のルール"
              code={`// NG: Reducer の中で副作用を起こす
function badReducer(state: State, action: Action) {
  switch (action.type) {
    case 'save':
      localStorage.setItem('data', JSON.stringify(state)); // 副作用！
      fetch('/api/save', { method: 'POST' }); // 副作用！
      return state;
  }
}

// OK: Reducer は state の計算だけに集中
function goodReducer(state: State, action: Action) {
  switch (action.type) {
    case 'save':
      return { ...state, isSaved: true };
  }
}
// 副作用は useEffect や イベントハンドラーで実行する`}
            />

            <div className="mt-6">
              <InfoBox type="info" title="純粋関数とは？">
                <p>
                  同じ入力に対して常に同じ出力を返し、外部に影響を与えない関数のことです。
                  API 呼び出し、localStorage への書き込み、console.log なども「副作用」に該当します。
                  Reducer を純粋関数にすることで、テストが簡単になり、バグも見つけやすくなります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 7: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground"><strong>useReducer は複雑な状態管理のための Hook</strong>。関連する複数の state を 1 つにまとめ、更新ロジックを集約できる</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>State + Action + Reducer の 3 要素</strong>。「何が起きたか」をアクションで表現し、Reducer が新しい状態を計算する</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>TypeScript との相性が良い</strong>。Action のユニオン型により、switch 文の網羅性チェックが効く</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>useContext と組み合わせ</strong>ると、アプリ全体で共有する本格的な状態管理が構築できる</p>
              </div>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
