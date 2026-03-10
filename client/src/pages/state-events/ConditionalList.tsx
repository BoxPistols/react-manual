import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

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

          {/* 実践的UIパターン: タブ切替 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践的UIパターン: タブ切り替え</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              タブ UI は条件分岐の代表的なパターンです。state でアクティブなタブを管理し、対応するコンテンツを表示します。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

type TabId = 'overview' | 'features' | 'pricing';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'overview', label: '概要' },
  { id: 'features', label: '機能' },
  { id: 'pricing', label: '料金' },
];

function TabPanel() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  // タブに対応するコンテンツを返す関数
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold">プロダクト概要</h3>
            <p className="text-gray-600">
              このプロダクトは、チームのコラボレーションを効率化するツールです。
            </p>
          </div>
        );
      case 'features':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold">主な機能</h3>
            <ul className="space-y-2 text-gray-600">
              <li>- リアルタイムコラボレーション</li>
              <li>- タスク管理</li>
              <li>- ファイル共有</li>
            </ul>
          </div>
        );
      case 'pricing':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold">料金プラン</h3>
            <p className="text-gray-600">月額 ¥980 から</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-lg">
      {/* タブヘッダー */}
      <div className="flex border-b">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={\`px-4 py-2 text-sm font-medium border-b-2 transition-colors
              \${activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }\`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* タブコンテンツ */}
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
}`}
              language="tsx"
              title="タブ切り替え UI"
              showLineNumbers
            />
          </section>

          {/* 実践的UIパターン: アコーディオン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践的UIパターン: アコーディオン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              アコーディオンは「開く/閉じる」の条件分岐を配列の各項目に適用したパターンです。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

const ITEMS: AccordionItem[] = [
  { id: 1, title: '返品はできますか？', content: '商品到着後7日以内であれば返品可能です。' },
  { id: 2, title: '送料はいくらですか？', content: '全国一律 ¥500 です。¥5,000 以上のお買い上げで送料無料。' },
  { id: 3, title: '届くまでどれくらいかかりますか？', content: '通常2-3営業日でお届けします。' },
];

function Accordion() {
  // null = すべて閉じている、number = 開いているアイテムの id
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    // 同じアイテムをクリックしたら閉じる、別のアイテムなら開く
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-lg space-y-2">
      {ITEMS.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50"
            >
              <span className="font-medium text-sm">{item.title}</span>
              <span className={\`transition-transform \${isOpen ? 'rotate-180' : ''}\`}>
                &#x25BC;
              </span>
            </button>

            {/* isOpen のときだけコンテンツを表示 */}
            {isOpen && (
              <div className="px-4 pb-3 text-sm text-gray-600 border-t">
                <p className="pt-3">{item.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}`}
              language="tsx"
              title="アコーディオン UI"
              showLineNumbers
            />
          </section>

          {/* 実践的UIパターン: ステッパー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践的UIパターン: ステッパー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ステッパーは「現在のステップに応じて表示を切り替える」パターンです。フォームのウィザードや設定画面でよく使われます。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

const STEPS = ['基本情報', '詳細設定', '確認'] as const;

function Stepper() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-lg p-6">
      {/* ステップインジケーター */}
      <div className="flex items-center mb-8">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className={\`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
              \${i <= currentStep
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-500'
              }\`}
            >
              {i + 1}
            </div>
            <span className={\`ml-2 text-sm \${i <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'}\`}>
              {step}
            </span>
            {i < STEPS.length - 1 && (
              <div className={\`mx-4 h-0.5 w-12 \${i < currentStep ? 'bg-blue-500' : 'bg-gray-200'}\`} />
            )}
          </div>
        ))}
      </div>

      {/* ステップごとのコンテンツ */}
      <div className="min-h-[120px] p-4 border rounded-lg mb-4">
        {currentStep === 0 && (
          <div>
            <h3 className="font-bold mb-2">基本情報を入力</h3>
            <p className="text-sm text-gray-500">名前やメールアドレスを入力してください。</p>
          </div>
        )}
        {currentStep === 1 && (
          <div>
            <h3 className="font-bold mb-2">詳細設定</h3>
            <p className="text-sm text-gray-500">通知設定やプランを選択してください。</p>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h3 className="font-bold mb-2">内容を確認</h3>
            <p className="text-sm text-gray-500">入力内容を確認して送信してください。</p>
          </div>
        )}
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-4 py-2 text-sm border rounded-lg disabled:opacity-30"
        >
          戻る
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === STEPS.length - 1}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg disabled:opacity-30"
        >
          {currentStep === STEPS.length - 1 ? '送信' : '次へ'}
        </button>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="ステッパー（マルチステップ）UI"
              showLineNumbers
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="JSX の中で「count が 0 のときに何も表示しない」正しい書き方はどれですか？"
              options={[
                { label: '{count && <span>{count}件</span>}' },
                { label: '{count > 0 && <span>{count}件</span>}', correct: true },
                { label: '{count !== 0 ? <span>{count}件</span>}' },
                { label: '{if (count > 0) <span>{count}件</span>}' },
              ]}
              explanation="count && <span>...</span> だと count が 0 のときに「0」が画面に表示されてしまいます。数値を条件にする場合は count > 0 && のように明示的な比較演算子を使いましょう。JSX の中では if 文は使えません。三項演算子なら使えますが、この選択肢では構文エラーになります。"
            />
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

          {/* key の深掘り */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">key を変えると何が起きるか</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              key は React にとって要素の「身分証明書」です。key が変わると、React はその要素を完全に破棄して新しく作り直します。この仕組みを理解すると、key を活用したテクニックも使えるようになります。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

// key を使ってコンポーネントをリセットする

function EditableProfile({ userId }: { userId: number }) {
  // このコンポーネントの state はユーザーごとにリセットしたい
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
        className="w-full px-3 py-2 border rounded-lg"
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="自己紹介"
        className="w-full px-3 py-2 border rounded-lg"
      />
      <p className="text-xs text-gray-400">ユーザーID: {userId}</p>
    </div>
  );
}

function UserSwitcher() {
  const [selectedUserId, setSelectedUserId] = useState(1);

  return (
    <div className="p-6 max-w-md space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setSelectedUserId(1)} className="px-3 py-1 bg-blue-500 text-white rounded">
          ユーザー1
        </button>
        <button onClick={() => setSelectedUserId(2)} className="px-3 py-1 bg-green-500 text-white rounded">
          ユーザー2
        </button>
        <button onClick={() => setSelectedUserId(3)} className="px-3 py-1 bg-purple-500 text-white rounded">
          ユーザー3
        </button>
      </div>

      {/* key を userId にすることで、ユーザーが変わるたびに
          EditableProfile の state が自動的にリセットされる */}
      <EditableProfile key={selectedUserId} userId={selectedUserId} />

      {/* key がないと、ユーザーを切り替えても前の入力値が残ってしまう！ */}
    </div>
  );
}`}
              language="tsx"
              title="key を活用してコンポーネントの state をリセット"
              showLineNumbers
            />
            <InfoBox type="warning" title="key とパフォーマンスの関係">
              <p>
                key が変わるとコンポーネントは完全に再作成されます。これは便利なテクニックですが、意図せず key が毎回変わるとパフォーマンスに悪影響があります。例えば <code>key={'{Math.random()}'}</code> のようにランダムな値を key に使うと、毎回すべての要素が再作成されてしまいます。key には安定した一意の値（データベースの ID など）を使いましょう。
              </p>
            </InfoBox>

            <CodeBlock
              code={`// index を key にした場合の問題を具体的に見てみる

import { useState } from 'react';

function IndexKeyProblem() {
  const [items, setItems] = useState(['りんご', 'バナナ', 'みかん']);
  const [newItem, setNewItem] = useState('');

  // 先頭に追加すると...
  const handleAddToTop = () => {
    if (newItem.trim()) {
      setItems([newItem, ...items]); // 先頭に追加
      setNewItem('');
    }
  };

  return (
    <div className="p-6 max-w-md space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="フルーツ名"
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button onClick={handleAddToTop} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          先頭に追加
        </button>
      </div>

      {/* NG: index を key にすると、先頭に追加した際に
          既存の要素の input の値がズレてしまう */}
      <h4 className="font-bold text-red-500">NG: key={'{index}'}</h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 items-center">
            <span className="text-sm">{item}</span>
            <input className="px-2 py-1 border rounded text-sm" placeholder="メモ" />
          </li>
        ))}
      </ul>

      {/* OK: 値自体を key にする（実際は id が望ましい） */}
      <h4 className="font-bold text-green-500 mt-6">OK: key={'{item}'}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 items-center">
            <span className="text-sm">{item}</span>
            <input className="px-2 py-1 border rounded text-sm" placeholder="メモ" />
          </li>
        ))}
      </ul>
    </div>
  );
}`}
              language="tsx"
              title="index を key にした場合の具体的な問題"
              showLineNumbers
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="リスト表示で key にインデックス（index）を使うのが問題になるのは、どのようなケースですか？"
              options={[
                { label: 'リストの見た目を変更するとき' },
                { label: 'リストの項目を追加・削除・並べ替えるとき', correct: true },
                { label: 'リストの項目が100件を超えるとき' },
                { label: 'リストをネスト（入れ子）にするとき' },
              ]}
              explanation="index を key にすると、項目の追加・削除・並べ替え時に、React が要素を正しく特定できなくなります。例えば先頭に項目を追加すると、すべての index がズレるため、React は全要素が変更されたと誤認し、入力中のテキストがズレるなどのバグが発生します。静的なリストならば index でも問題ありません。"
            />
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
        <span className="text-2xl text-gray-400">&#x1F4ED;</span>
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

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="カテゴリフィルター付き商品リスト"
              description="商品データの配列から、選択されたカテゴリの商品だけを表示するフィルタリングロジックを完成させてください。'all' の場合は全商品を返します。"
              initialCode={`const products = [
  { id: 1, name: 'ノートPC', category: 'electronics', price: 89000 },
  { id: 2, name: 'デスクチェア', category: 'furniture', price: 45000 },
  { id: 3, name: 'モニター', category: 'electronics', price: 32000 },
  { id: 4, name: 'デスク', category: 'furniture', price: 28000 },
  { id: 5, name: 'キーボード', category: 'electronics', price: 12000 },
];

const selectedCategory = 'electronics'; // 'all' | 'electronics' | 'furniture'

// ここにフィルタリングのコードを書いてください
const filteredProducts = products;`}
              answer={`const products = [
  { id: 1, name: 'ノートPC', category: 'electronics', price: 89000 },
  { id: 2, name: 'デスクチェア', category: 'furniture', price: 45000 },
  { id: 3, name: 'モニター', category: 'electronics', price: 32000 },
  { id: 4, name: 'デスク', category: 'furniture', price: 28000 },
  { id: 5, name: 'キーボード', category: 'electronics', price: 12000 },
];

const selectedCategory = 'electronics'; // 'all' | 'electronics' | 'furniture'

const filteredProducts = selectedCategory === 'all'
  ? products
  : products.filter((product) => product.category === selectedCategory);`}
              hints={[
                'selectedCategory が "all" のときは products をそのまま返します。',
                '.filter() メソッドを使って、product.category が selectedCategory と一致するものだけを抽出します。',
                '三項演算子を使うとスッキリ書けます: selectedCategory === "all" ? products : products.filter(...)',
              ]}
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
                  <li>- key を変えると state がリセットされる</li>
                  <li>- .filter() でフィルタリング</li>
                  <li>- 空の状態を忘れずに対応する</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 公式: Conditional Rendering',
                  url: 'https://react.dev/learn/conditional-rendering',
                  description: '三項演算子、&& 演算子、早期 return による条件分岐のパターンを解説',
                },
                {
                  title: 'React 公式: Rendering Lists',
                  url: 'https://react.dev/learn/rendering-lists',
                  description: '.map() によるリスト表示と key prop の正しい使い方',
                },
                {
                  title: 'React 公式: Preserving and Resetting State',
                  url: 'https://react.dev/learn/preserving-and-resetting-state',
                  description: 'key を使った state のリセットや、React が state を保持する仕組み',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'index を key に使うのは絶対にダメ？',
                  answer: '絶対にダメということではありません。リストが静的で、項目の追加・削除・並べ替えが一切行われない場合は index でも問題ありません。例えばメニュー項目のような固定リストです。ただし、動的に変化するリスト（Todo リスト、検索結果など）では、必ず一意の ID を key にしましょう。迷ったら ID を使っておけば安全です。',
                },
                {
                  question: '大量のリスト（1000件以上）のパフォーマンスが気になる場合は？',
                  answer: '大量のリストを一度にレンダリングするとパフォーマンスが低下します。対策として「仮想スクロール（Virtual Scrolling）」があり、画面に見えている部分だけをレンダリングします。react-window や @tanstack/react-virtual といったライブラリが代表的です。ページネーション（ページ分割）やインフィニットスクロール（無限スクロール）も有効な手段です。',
                },
                {
                  question: 'JSX の中で null と undefined の違いは？',
                  answer: 'どちらも JSX の中で使うと「何も表示しない」という同じ結果になります。条件分岐で「何も表示しない」ことを明示したい場合は null を返すのが一般的な慣習です。一方、false や空文字列 "" も何も表示されません。ただし数値の 0 は「0」として表示されてしまうので注意が必要です。',
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
