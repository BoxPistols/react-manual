import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function MemoCallback() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 15</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">useMemo / useCallback</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          パフォーマンス最適化のための 2 つの Hook。重い計算をキャッシュする useMemo と、関数の再生成を防ぐ useCallback を学びます。
          React.memo と組み合わせることで、不要な再レンダーを減らしてアプリを高速に保てます。
        </p>

        <WhyNowBox tags={['useMemo', 'useCallback', 'React.memo', 'パフォーマンス']}>
          <p>
            React はデフォルトで「親が再レンダーされたら子も再レンダーする」という仕組みです。
            小さいアプリでは問題になりませんが、リストが長くなったり、重い計算が入ると目に見えてもたつくことがあります。
            この 3 つのツール（useMemo、useCallback、React.memo）を正しく使えば、
            <strong>必要な部分だけを効率よく更新する</strong>アプリが作れます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 再レンダーの基礎知識 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まず知っておくこと: React の再レンダー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最適化を学ぶ前に、React がいつ再レンダーするかを正確に理解しましょう。
            </p>
            <CodeBlock
              language="tsx"
              title="再レンダーが起きるタイミング"
              code={`// 再レンダーが起きるのはこの 3 つのとき:
// 1. state が更新されたとき
// 2. 親コンポーネントが再レンダーされたとき
// 3. useContext で購読している値が変わったとき

function Parent() {
  const [count, setCount] = useState(0);

  // count が変わると Parent が再レンダー
  // → Child も再レンダーされる（props が変わっていなくても！）
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Child name="太郎" /> {/* props は同じなのに毎回再レンダー */}
    </div>
  );
}

function Child({ name }: { name: string }) {
  console.log('Child がレンダーされた'); // 毎回ログが出る
  return <p>こんにちは、{name}さん</p>;
}`}
            />
            <div className="mt-6 mb-6">
              <InfoBox type="info" title="再レンダー = 悪いこと、ではない">
                <p>
                  React の再レンダーは非常に高速で、ほとんどの場合は問題になりません。
                  「まず動くものを作り、遅いと感じたら最適化する」が正しいアプローチです。
                  最適化はコードの複雑さを増すので、必要になるまでやらないのがベストプラクティスです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 2: React.memo */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React.memo: コンポーネントのメモ化</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React.memo でコンポーネントをラップすると、「props が前回と同じなら再レンダーをスキップする」ようになります。
            </p>
            <CodeBlock
              language="tsx"
              title="React.memo の使い方"
              showLineNumbers
              code={`import { memo, useState } from 'react';

// memo でラップすると、props が変わらない限り再レンダーされない
const ExpensiveChild = memo(function ExpensiveChild({
  name,
}: {
  name: string;
}) {
  console.log('ExpensiveChild がレンダーされた');
  // 重い描画処理があると想像してください
  return <p>こんにちは、{name}さん</p>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        カウント: {count}
      </button>
      {/* name は "太郎" のまま変わらないので、再レンダーされない */}
      <ExpensiveChild name="太郎" />
    </div>
  );
}`}
            />
            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="memo の落とし穴: オブジェクトと関数">
                <p>
                  React.memo は props を「浅い比較（===）」で判定します。
                  プリミティブ値（文字列、数値）は問題ありませんが、オブジェクトや関数は毎回新しい参照が作られるため、
                  memo が効きません。ここで useMemo と useCallback が必要になります。
                </p>
              </InfoBox>
            </div>

            <CodeBlock
              language="tsx"
              title="memo が効かないケース"
              code={`function Parent() {
  const [count, setCount] = useState(0);

  // レンダーのたびに新しいオブジェクトが作られる
  const style = { color: 'red', fontSize: 16 };

  // レンダーのたびに新しい関数が作られる
  const handleClick = () => {
    console.log('クリック');
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      {/* style と handleClick が毎回新しいので memo が効かない！ */}
      <MemoizedChild style={style} onClick={handleClick} />
    </div>
  );
}`}
            />
          </section>

          {/* セクション 3: useMemo */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useMemo: 計算結果のキャッシュ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useMemo は「依存する値が変わらない限り、前回の計算結果を使い回す」Hook です。
              重い計算やオブジェクトの生成をキャッシュするのに使います。
            </p>
            <CodeBlock
              language="tsx"
              title="useMemo の基本構文"
              code={`import { useMemo } from 'react';

const memoizedValue = useMemo(
  () => {
    // 重い計算
    return expensiveCalculation(a, b);
  },
  [a, b] // a または b が変わったときだけ再計算
);`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実例 1: 重いフィルター処理</h3>
            <CodeBlock
              language="tsx"
              title="大量データのフィルタリング"
              showLineNumbers
              code={`import { useState, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

function ProductList({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  // products が 10,000 件あると、
  // 入力のたびにフィルター + ソートが走って重い
  // → useMemo でキャッシュする
  const filteredProducts = useMemo(() => {
    console.log('フィルター処理を実行');

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });
  }, [products, query, sortBy]);
  // products, query, sortBy のいずれかが変わったときだけ再計算

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="商品を検索..."
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
      >
        <option value="name">名前順</option>
        <option value="price">価格順</option>
      </select>

      <p>{filteredProducts.length} 件の商品</p>
      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price.toLocaleString()}円
          </li>
        ))}
      </ul>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実例 2: オブジェクト props のメモ化</h3>
            <CodeBlock
              language="tsx"
              title="memo + useMemo の組み合わせ"
              code={`import { memo, useMemo, useState } from 'react';

// memo でラップされた子コンポーネント
const Chart = memo(function Chart({
  data,
}: {
  data: { labels: string[]; values: number[] };
}) {
  console.log('Chart がレンダーされた');
  return (
    <div>
      {data.labels.map((label, i) => (
        <div key={label}>
          {label}: {'█'.repeat(data.values[i])}
        </div>
      ))}
    </div>
  );
});

function Dashboard() {
  const [count, setCount] = useState(0);
  const [sales] = useState([100, 200, 150, 300, 250]);

  // useMemo でオブジェクトの参照を安定させる
  const chartData = useMemo(
    () => ({
      labels: ['月', '火', '水', '木', '金'],
      values: sales,
    }),
    [sales]
  );

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        カウント: {count}
      </button>
      {/* chartData の参照が安定しているので、
          count が変わっても Chart は再レンダーされない */}
      <Chart data={chartData} />
    </div>
  );
}`}
            />
          </section>

          {/* セクション 4: useCallback */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useCallback: 関数のメモ化</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useCallback は「依存する値が変わらない限り、前回と同じ関数を使い回す」Hook です。
              React.memo でラップされた子コンポーネントに関数を渡すときに特に重要です。
            </p>
            <CodeBlock
              language="tsx"
              title="useCallback の基本構文"
              code={`import { useCallback } from 'react';

const memoizedFunction = useCallback(
  (arg: string) => {
    // 何かの処理
    doSomething(arg);
  },
  [/* 依存配列 */]
);

// useMemo との関係:
// useCallback(fn, deps) は useMemo(() => fn, deps) と同じ`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実例: リストアイテムへのコールバック</h3>
            <CodeBlock
              language="tsx"
              title="useCallback + memo でリストを最適化"
              showLineNumbers
              code={`import { memo, useState, useCallback } from 'react';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// memo でラップ: props が変わらなければ再レンダーしない
const TodoItem = memo(function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  console.log(\`TodoItem \${id} がレンダーされた\`);

  return (
    <li className="flex items-center gap-3 p-2 border rounded">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span className={completed ? 'line-through text-gray-400' : ''}>
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="ml-auto text-red-500"
      >
        削除
      </button>
    </li>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'デザインレビュー', completed: false },
    { id: 2, text: 'プロトタイプ作成', completed: true },
    { id: 3, text: 'ユーザーテスト', completed: false },
  ]);

  // useCallback で関数をメモ化
  // → todos が変わっても関数の参照は同じ
  const handleToggle = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []); // setTodos の関数形式を使うので依存配列は空でOK

  const handleDelete = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="setTodos の関数形式がポイント">
                <p>
                  <code>setTodos(prev =&gt; ...)</code> のように関数形式で state を更新すると、
                  コールバック関数が <code>todos</code> を直接参照しなくて済みます。
                  そのため useCallback の依存配列を空にでき、関数が再生成されなくなります。
                  これは非常によく使われるテクニックです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 5: いつ使うべきか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">いつ使うべき？ 判断フローチャート</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最適化を「とりあえず」入れるのは逆効果です。以下の基準で判断しましょう。
            </p>

            <div className="bg-muted/30 rounded-xl p-6 space-y-4 mb-6">
              <h3 className="font-bold text-foreground">useMemo を使う場面</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>計算に明らかに時間がかかる（大量データのフィルター・ソート）</li>
                <li>React.memo された子に渡すオブジェクト props を安定させたい</li>
                <li>useEffect の依存配列に入れるオブジェクトの参照を安定させたい</li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 space-y-4 mb-6">
              <h3 className="font-bold text-foreground">useCallback を使う場面</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>React.memo された子に渡す関数 props を安定させたい</li>
                <li>useEffect の依存配列に入れる関数の参照を安定させたい</li>
                <li>カスタム Hook から返す関数を安定させたい</li>
              </ul>
            </div>

            <div className="mb-6">
              <InfoBox type="warning" title="過剰な最適化は害になる">
                <p>
                  useMemo / useCallback 自体にもコスト（メモリ使用量・比較処理）があります。
                  以下の場合は使わないほうがよいです:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>計算が軽い（単純な算術、短い配列の処理）</li>
                  <li>子コンポーネントが React.memo されていない</li>
                  <li>パフォーマンスの問題が実際に起きていない</li>
                </ul>
              </InfoBox>
            </div>

            <CodeBlock
              language="tsx"
              title="useMemo が不要なケース"
              code={`// NG: こんな軽い計算に useMemo は不要
const fullName = useMemo(
  () => \`\${firstName} \${lastName}\`,
  [firstName, lastName]
);

// OK: ただの変数で十分
const fullName = \`\${firstName} \${lastName}\`;

// NG: 子が memo されていないのに useCallback を使う
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);

// OK: 子が memo されていないなら普通の関数で十分
const handleClick = () => {
  setCount(count + 1);
};`}
            />
          </section>

          {/* セクション 6: 実践パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: 検索フィルター付きの商品一覧</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              3 つのツールを組み合わせた、実用的な例を見てみましょう。
            </p>
            <CodeBlock
              language="tsx"
              title="最適化された商品一覧"
              showLineNumbers
              code={`import { memo, useState, useMemo, useCallback } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// 1. React.memo で子コンポーネントをメモ化
const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (id: number) => void;
}) {
  console.log(\`ProductCard \${product.id} がレンダーされた\`);

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.price.toLocaleString()}円</p>
      <p className="text-sm text-gray-400">{product.category}</p>
      <button
        onClick={() => onAddToCart(product.id)}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        カートに追加
      </button>
    </div>
  );
});

function ProductCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState<number[]>([]);

  // 2. useMemo で重いフィルター処理をキャッシュ
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesQuery = p.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          category === 'all' || p.category === category;
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => a.price - b.price);
  }, [products, query, category]);

  // 3. useCallback でコールバックをメモ化
  const handleAddToCart = useCallback((productId: number) => {
    setCart((prev) => [...prev, productId]);
  }, []);

  // カテゴリ一覧も useMemo でキャッシュ
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="商品を検索..."
          className="border rounded px-3 py-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'すべて' : cat}
            </option>
          ))}
        </select>
        <span className="py-2">カート: {cart.length} 点</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 7: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground"><strong>React.memo</strong> はコンポーネントをメモ化。props が変わらなければ再レンダーをスキップ</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>useMemo</strong> は計算結果をキャッシュ。重いフィルターやオブジェクト props の安定化に使う</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>useCallback</strong> は関数をメモ化。React.memo された子への関数 props を安定化させる</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>最適化は必要になってから</strong>。まず動くものを作り、パフォーマンスの問題が実際に起きたときに導入する</p>
              </div>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
