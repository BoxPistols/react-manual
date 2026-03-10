import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function ConditionalList() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 10
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          条件分岐とリスト表示
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          「ログイン中なら名前を表示、そうでなければログインボタンを表示」「商品一覧をカードで並べる」── 実際の UI で頻出する条件分岐とリスト表示のパターンをマスターしましょう。
        </p>

        <WhyNowBox tags={['条件分岐', 'リスト表示', '動的UI', 'key']}>
          <p>
            useState でデータを管理し、イベントで操作できるようになりました。次は、そのデータに応じて「何を表示するか」を制御する方法を学びます。
          </p>
          <p>
            Figma のバリアントやコンポーネントプロパティで「状態A のときはこの表示、状態B のときはこの表示」と切り替えるのと同じですが、React ではコードで柔軟に制御できます。データの数だけリストを自動生成することも可能です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 条件分岐: 三項演算子 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">条件分岐の3つの方法</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX の中で条件によって表示を変えるには、主に3つの方法があります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">方法1: 三項演算子（A か B か）</h3>
            <CodeBlock
              code={`import { useState } from 'react';

function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="p-6">
      {/* 三項演算子: 条件 ? trueのとき : falseのとき */}
      {isLoggedIn ? (
        <div>
          <p className="text-lg">ようこそ、田中さん！</p>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg text-gray-500">ログインしてください</p>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            ログイン
          </button>
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              title="三項演算子: 2つのパターンを切り替え"
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">方法2: && 演算子（表示するかしないか）</h3>
            <CodeBlock
              code={`function Notification({ count }: { count: number }) {
  return (
    <div className="relative">
      <button className="p-2 rounded-lg hover:bg-gray-100">
        通知
      </button>

      {/* count が 0 より大きいときだけバッジを表示 */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

// 使い方
<Notification count={3} />  // バッジあり
<Notification count={0} />  // バッジなし`}
              language="tsx"
              title="&& 演算子: 条件を満たすときだけ表示"
            />
            <InfoBox type="warning" title="&& の注意点: 0 が表示される問題">
              <p>
                <code>{'{count && <span>...</span>}'}</code> と書くと、count が 0 のとき「0」が画面に表示されてしまいます。数値を条件にするときは <code>{'{count > 0 && <span>...</span>}'}</code> のように明示的な比較を使いましょう。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">方法3: 早期 return / if-else（複雑な分岐）</h3>
            <CodeBlock
              code={`type Status = 'loading' | 'error' | 'empty' | 'success';

interface DataViewProps {
  status: Status;
  data?: string[];
  errorMessage?: string;
}

function DataView({ status, data, errorMessage }: DataViewProps) {
  // 早期 return で特殊なケースを先に処理
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-gray-500">読み込み中...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-600 font-medium">エラーが発生しました</p>
        <p className="text-red-400 text-sm mt-1">{errorMessage}</p>
      </div>
    );
  }

  if (status === 'empty' || !data || data.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400 text-lg">データがありません</p>
        <p className="text-gray-300 text-sm mt-1">新しいデータを追加してください</p>
      </div>
    );
  }

  // success: メインの表示
  return (
    <ul className="divide-y">
      {data.map((item, index) => (
        <li key={index} className="p-3">{item}</li>
      ))}
    </ul>
  );
}`}
              language="tsx"
              title="早期 return で複雑な分岐を整理する"
              showLineNumbers
            />
            <InfoBox type="success" title="使い分けのガイド">
              <div className="space-y-1">
                <p><strong>三項演算子</strong>: A か B かの2択を切り替えたいとき</p>
                <p><strong>&& 演算子</strong>: 表示するかしないかの1択のとき</p>
                <p><strong>早期 return</strong>: 3つ以上の分岐や、loading/error/empty のパターン</p>
              </div>
            </InfoBox>
          </section>

          {/* リスト表示: .map() */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">リスト表示: .map()</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              配列データをリストとして表示するには、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">.map()</code> メソッドを使います。配列の各要素を JSX に変換して表示します。
            </p>
            <CodeBlock
              code={`interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

function ProductList() {
  const products: Product[] = [
    { id: 1, name: 'デザインブック', price: 2980, image: '/book.jpg', category: '書籍' },
    { id: 2, name: 'ワイヤレスマウス', price: 4500, image: '/mouse.jpg', category: 'デバイス' },
    { id: 3, name: 'モニターライト', price: 6800, image: '/light.jpg', category: 'デバイス' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-xl overflow-hidden shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <h3 className="font-bold mt-2">{product.name}</h3>
            <p className="text-lg font-bold text-blue-600 mt-1">
              &yen;{product.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}`}
              language="tsx"
              title="配列データをカードリストとして表示"
            />
          </section>

          {/* key prop */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">key prop: なぜ必要なのか</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">.map()</code> でリストを表示するとき、各要素に <code className="text-sm bg-muted px-1.5 py-0.5 rounded">key</code> prop を設定する必要があります。これは React がリストの変更を効率的に追跡するための仕組みです。
            </p>
            <CodeBlock
              code={`// key のルール

// OK: ユニークな id を使う（最も推奨）
{users.map((user) => (
  <UserCard key={user.id} user={user} />
))}

// OK: ユニークな文字列を使う
{tags.map((tag) => (
  <span key={tag}>{tag}</span>
))}

// NG: index を key にする（非推奨）
// 項目の追加・削除・並び替えで不具合が起きる可能性あり
{items.map((item, index) => (
  <li key={index}>{item}</li>  // 順番が変わるとバグる
))}

// 例外: 静的で絶対に変わらないリストなら index でもOK
const menuItems = ['ホーム', '製品', '会社概要'];
{menuItems.map((item, index) => (
  <li key={index}>{item}</li>  // 変わらないリストなのでOK
))}`}
              language="tsx"
              title="key の正しい使い方"
            />
            <InfoBox type="info" title="key は React 内部で使われる特別な prop">
              <p>
                key はコンポーネントの Props として渡されるわけではなく、React が内部で「どの要素が追加・削除・変更されたか」を特定するために使います。key が正しくないと、入力中のテキストが別の行に移動するなどの予期せぬバグが起きます。
              </p>
            </InfoBox>
          </section>

          {/* フィルタリングとソート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フィルタリングとソート</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">.filter()</code> で条件に合う要素だけを抽出し、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">.sort()</code> で並び替えができます。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  done: boolean;
}

function TaskBoard() {
  const [tasks] = useState<Task[]>([
    { id: 1, title: 'デザインレビュー', priority: 'high', done: false },
    { id: 2, title: 'ミーティング資料作成', priority: 'medium', done: true },
    { id: 3, title: 'バグ修正', priority: 'high', done: false },
    { id: 4, title: 'ドキュメント更新', priority: 'low', done: false },
    { id: 5, title: 'テスト実行', priority: 'medium', done: true },
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'priority'>('default');

  // フィルタリング
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done;
    if (filter === 'done') return task.done;
    return true; // 'all'
  });

  // ソート
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0; // デフォルトは元の順番
  });

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };

  return (
    <div className="p-6 max-w-lg">
      {/* フィルターボタン */}
      <div className="flex gap-2 mb-4">
        {(['all', 'active', 'done'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={\`px-3 py-1 rounded-full text-sm
              \${filter === f
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }\`}
          >
            {f === 'all' ? 'すべて' : f === 'active' ? '未完了' : '完了'}
          </button>
        ))}

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'default' | 'priority')}
          className="ml-auto px-2 py-1 border rounded text-sm"
        >
          <option value="default">デフォルト順</option>
          <option value="priority">優先度順</option>
        </select>
      </div>

      {/* タスクリスト */}
      <ul className="space-y-2">
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={\`p-3 border rounded-lg flex items-center gap-3
              \${task.done ? 'opacity-50' : ''}\`}
          >
            <span className={\`px-2 py-0.5 rounded text-xs font-medium \${priorityColors[task.priority]}\`}>
              {task.priority}
            </span>
            <span className={\`flex-1 \${task.done ? 'line-through' : ''}\`}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>

      {/* 件数表示 */}
      <p className="mt-3 text-sm text-gray-500">
        {sortedTasks.length} 件表示中（全 {tasks.length} 件）
      </p>
    </div>
  );
}`}
              language="tsx"
              title="フィルタリングとソートの実装"
              showLineNumbers
            />
          </section>

          {/* 空の状態 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">空の状態（Empty State）の処理</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              リストが空のときに何も表示されないと、ユーザーは「読み込み中？」「エラー？」と混乱します。適切な空の状態メッセージを表示しましょう。
            </p>
            <CodeBlock
              code={`interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl text-gray-400">📭</span>
      </div>
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-400 max-w-xs">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// 使い方
function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  if (bookmarks.length === 0) {
    return (
      <EmptyState
        title="ブックマークがありません"
        description="気になる記事をブックマークすると、ここに表示されます"
        actionLabel="記事を探す"
        onAction={() => console.log('記事一覧へ')}
      />
    );
  }

  return (
    <ul>
      {bookmarks.map((bookmark) => (
        <li key={bookmark}>{bookmark}</li>
      ))}
    </ul>
  );
}`}
              language="tsx"
              title="再利用可能な EmptyState コンポーネント"
            />
          </section>

          {/* 実践例: フィルタ付きカードギャラリー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: フィルタ付きカードギャラリー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              条件分岐、リスト表示、フィルタリング、空の状態を組み合わせた実用的なギャラリーコンポーネントです。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface DesignWork {
  id: number;
  title: string;
  category: 'web' | 'mobile' | 'branding' | 'illustration';
  image: string;
  featured: boolean;
}

const CATEGORIES = [
  { value: 'all' as const, label: 'すべて' },
  { value: 'web' as const, label: 'Web' },
  { value: 'mobile' as const, label: 'モバイル' },
  { value: 'branding' as const, label: 'ブランディング' },
  { value: 'illustration' as const, label: 'イラスト' },
];

const WORKS: DesignWork[] = [
  { id: 1, title: 'ECサイトリデザイン', category: 'web', image: '/works/ec.jpg', featured: true },
  { id: 2, title: '天気アプリUI', category: 'mobile', image: '/works/weather.jpg', featured: false },
  { id: 3, title: 'カフェロゴデザイン', category: 'branding', image: '/works/cafe.jpg', featured: true },
  { id: 4, title: 'ダッシュボード', category: 'web', image: '/works/dashboard.jpg', featured: false },
  { id: 5, title: 'フィットネスアプリ', category: 'mobile', image: '/works/fitness.jpg', featured: true },
  { id: 6, title: 'キャラクターデザイン', category: 'illustration', image: '/works/character.jpg', featured: false },
];

type FilterCategory = 'all' | DesignWork['category'];

function DesignGallery() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 複数条件でフィルタリング
  const filteredWorks = WORKS.filter((work) => {
    // カテゴリフィルタ
    if (activeCategory !== 'all' && work.category !== activeCategory) {
      return false;
    }
    // 注目作品フィルタ
    if (showFeaturedOnly && !work.featured) {
      return false;
    }
    // 検索フィルタ
    if (searchQuery && !work.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">デザインギャラリー</h1>

      {/* 検索バー */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="作品名で検索..."
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />

      {/* フィルターコントロール */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={\`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                \${activeCategory === cat.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }\`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 ml-auto">
          <input
            type="checkbox"
            checked={showFeaturedOnly}
            onChange={(e) => setShowFeaturedOnly(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">注目作品のみ</span>
        </label>
      </div>

      {/* ギャラリー or 空の状態 */}
      {filteredWorks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">条件に一致する作品がありません</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setShowFeaturedOnly(false);
              setSearchQuery('');
            }}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            フィルターをリセット
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {filteredWorks.length} 件の作品
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {work.featured && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      注目
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs text-gray-500 uppercase">
                    {CATEGORIES.find((c) => c.value === work.category)?.label}
                  </span>
                  <h3 className="font-bold mt-1">{work.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}`}
              language="tsx"
              title="フィルタ付きカードギャラリー - 実践例"
              showLineNumbers
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">条件分岐</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 三項演算子: A か B か</li>
                  <li>- && 演算子: 表示するかしないか</li>
                  <li>- 早期 return: 複雑な分岐</li>
                  <li>- 数値 + && は {'> 0'} で比較する</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">リスト表示</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- .map() で配列を JSX に変換</li>
                  <li>- key にはユニークな id を使う</li>
                  <li>- .filter() でフィルタリング</li>
                  <li>- 空の状態を忘れずに対応する</li>
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
