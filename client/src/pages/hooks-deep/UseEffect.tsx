import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function UseEffect() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 12</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">useEffect</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          コンポーネントの「外の世界」とつながるための Hook。API からデータを取ってきたり、タイマーを設定したり、ブラウザのタイトルを変えたり――React の描画以外の処理はすべて「副作用（Side Effect）」と呼びます。
        </p>

        <WhyNowBox tags={['useEffect', '副作用', 'API連携', 'クリーンアップ']}>
          <p>
            ここまでで useState によるデータの管理、イベントによるユーザー操作の受け取りを学びました。
            しかし実際のアプリでは「画面が表示されたらサーバーからデータを取得する」「一定間隔で情報を更新する」といった、
            <strong>描画のタイミングに合わせて外部と通信する処理</strong>が必要です。それが useEffect の出番です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 副作用とは何か */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">副作用（Side Effect）とは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React コンポーネントの主な仕事は「props と state を受け取って UI を返す」ことです。
              それ以外の処理――たとえばネットワーク通信、DOM の直接操作、タイマーの設定など――はすべて「副作用」と呼ばれます。
            </p>
            <div className="mb-6">
              <InfoBox type="info" title="デザイナー向けのたとえ">
                <p>
                  Figma で言えば、コンポーネントが「見た目を返す」のが本業、プラグインを動かしたり外部データを読み込んだりするのが副作用です。
                  useEffect は「コンポーネントにプラグインを接続するしくみ」と考えてください。
                </p>
              </InfoBox>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              副作用の代表例をいくつか挙げます:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>API からデータを取得する（fetch / axios）</li>
              <li>ブラウザの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">document.title</code> を変更する</li>
              <li><code className="text-sm bg-muted px-1.5 py-0.5 rounded">setInterval</code> / <code className="text-sm bg-muted px-1.5 py-0.5 rounded">setTimeout</code> でタイマーを仕掛ける</li>
              <li>イベントリスナー（スクロール、リサイズなど）を登録する</li>
              <li>localStorage への読み書き</li>
            </ul>
          </section>

          {/* セクション 2: useEffect の基本構文 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useEffect の基本構文</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useEffect は 2 つの引数を取ります: 「実行したい処理（コールバック関数）」と「依存配列」です。
            </p>
            <CodeBlock
              language="tsx"
              title="基本構文"
              code={`import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // ここに副作用の処理を書く
    console.log('コンポーネントがレンダーされました');
  }, [/* 依存配列 */]);

  return <div>Hello</div>;
}`}
            />
            <div className="mt-6 mb-6">
              <InfoBox type="info" title="依存配列のルール">
                <p>依存配列は useEffect の「いつ再実行するか」を決める重要なしくみです。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>配列なし</strong>: 毎回のレンダー後に実行（ほぼ使わない）</li>
                  <li><strong>空配列 <code>[]</code></strong>: マウント時（初回表示時）だけ実行</li>
                  <li><strong>値を入れた配列 <code>[count, name]</code></strong>: その値が変わったときだけ実行</li>
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* セクション 3: 依存配列の詳細 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">依存配列を理解する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              依存配列は useEffect で最も重要な概念です。3 つのパターンをコードで見てみましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">パターン 1: 空の依存配列（マウント時のみ）</h3>
            <CodeBlock
              language="tsx"
              title="マウント時に1回だけ実行"
              code={`function WelcomeMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // コンポーネントが画面に初めて表示されたときだけ実行
    console.log('ようこそ！');
    setMessage('ページが読み込まれました');
  }, []); // ← 空配列 = マウント時のみ

  return <p>{message}</p>;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">パターン 2: 特定の値を監視</h3>
            <CodeBlock
              language="tsx"
              title="count が変わるたびに実行"
              code={`function PageTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // count が変わるたびにブラウザのタブタイトルを更新
    document.title = \`クリック数: \${count}\`;
  }, [count]); // ← count が変わったら再実行

  return (
    <button onClick={() => setCount(count + 1)}>
      クリック: {count}
    </button>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">パターン 3: 複数の依存値</h3>
            <CodeBlock
              language="tsx"
              title="どちらか一方が変わったら実行"
              code={`function SearchResults() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // query または category が変わったら検索を実行
    console.log(\`検索: "\${query}" カテゴリ: \${category}\`);
  }, [query, category]); // ← どちらかが変われば再実行

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">すべて</option>
        <option value="design">デザイン</option>
        <option value="code">コード</option>
      </select>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 4: クリーンアップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">クリーンアップ関数</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              副作用のなかには、コンポーネントが画面から消えたときに「後片付け」が必要なものがあります。
              たとえばタイマーやイベントリスナーです。useEffect のコールバックから関数を <code className="text-sm bg-muted px-1.5 py-0.5 rounded">return</code> すると、それがクリーンアップ関数になります。
            </p>
            <CodeBlock
              language="tsx"
              title="クリーンアップの基本"
              code={`useEffect(() => {
  // セットアップ: 副作用を開始
  const timer = setInterval(() => {
    console.log('1秒経過');
  }, 1000);

  // クリーンアップ: 副作用を解除
  return () => {
    clearInterval(timer);
  };
}, []); // マウント時にセットアップ、アンマウント時にクリーンアップ`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="クリーンアップを忘れるとどうなる？">
                <p>
                  タイマーやイベントリスナーのクリーンアップを忘れると、コンポーネントが画面から消えた後もバックグラウンドで処理が動き続けます。
                  これはメモリリークの原因になり、アプリが徐々に重くなっていきます。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実例: ウィンドウリサイズの監視</h3>
            <CodeBlock
              language="tsx"
              title="リサイズイベントの監視とクリーンアップ"
              code={`import { useState, useEffect } from 'react';

function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // リサイズイベントのハンドラー
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // イベントリスナーを登録
    window.addEventListener('resize', handleResize);

    // クリーンアップ: イベントリスナーを解除
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // マウント時に登録、アンマウント時に解除

  return (
    <p>
      ウィンドウサイズ: {size.width} x {size.height}
    </p>
  );
}`}
            />
          </section>

          {/* セクション 5: データ取得 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: API からデータを取得する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useEffect の最も一般的な使い方の一つが、API からデータを取得することです。
              ローディング状態とエラー状態もあわせて管理するパターンを見てみましょう。
            </p>
            <CodeBlock
              language="tsx"
              title="API データ取得の完全なパターン"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

// 取得するデータの型を定義
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  // 3 つの state でデータ取得を管理
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // async 関数を useEffect 内で定義
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '不明なエラー'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // マウント時に1回だけ取得

  // ローディング中
  if (loading) {
    return <p className="text-gray-500">読み込み中...</p>;
  }

  // エラー時
  if (error) {
    return <p className="text-red-500">エラー: {error}</p>;
  }

  // データ表示
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id} className="p-3 border rounded">
          <p className="font-bold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </li>
      ))}
    </ul>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="async/await と useEffect">
                <p>
                  useEffect のコールバック関数自体を <code>async</code> にすることはできません。
                  代わりに、コールバックの中で async 関数を定義してすぐに呼び出すパターンを使います。
                  これは React の仕様上の制約です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 6: 検索パラメータ付きのデータ取得 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">応用: 検索条件が変わるたびにデータを再取得</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              依存配列に検索キーワードを入れることで、入力が変わるたびに自動的にデータを再取得できます。
            </p>
            <CodeBlock
              language="tsx"
              title="検索連動のデータ取得"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

function SearchPosts() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 空文字のときは検索しない
    if (!query.trim()) {
      setPosts([]);
      return;
    }

    // AbortController でリクエストのキャンセルが可能
    const controller = new AbortController();

    const searchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/posts?q=\${query}\`,
          { signal: controller.signal }
        );
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        // キャンセルされた場合はエラーを無視
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    searchPosts();

    // クリーンアップ: 前のリクエストをキャンセル
    return () => {
      controller.abort();
    };
  }, [query]); // query が変わるたびに再実行

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="記事を検索..."
        className="border rounded px-3 py-2 w-full mb-4"
      />
      {loading && <p>検索中...</p>}
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-3 border rounded">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {post.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="AbortController でレースコンディションを防ぐ">
                <p>
                  ユーザーがすばやく入力すると、前のリクエストが終わる前に次のリクエストが始まります。
                  AbortController を使ってクリーンアップ時に前のリクエストをキャンセルすることで、
                  「古い結果が新しい結果を上書きしてしまう」問題（レースコンディション）を防げます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 7: タイマーの例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: タイマーを作る</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useEffect とクリーンアップを組み合わせた、実用的なカウントダウンタイマーの例です。
            </p>
            <CodeBlock
              language="tsx"
              title="カウントダウンタイマー"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

function CountdownTimer() {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // タイマーが動いていないなら何もしない
    if (!isRunning) return;

    // 0 になったら停止
    if (seconds <= 0) {
      setIsRunning(false);
      return;
    }

    // 1秒ごとにカウントダウン
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // クリーンアップ
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  // 時間のフォーマット
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="text-center p-8">
      {/* 大きな時計表示 */}
      <p className="text-6xl font-mono font-bold mb-6">
        {String(minutes).padStart(2, '0')}:
        {String(secs).padStart(2, '0')}
      </p>

      {/* 操作ボタン */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2 rounded bg-blue-500 text-white"
        >
          {isRunning ? '一時停止' : 'スタート'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(60);
          }}
          className="px-6 py-2 rounded bg-gray-200"
        >
          リセット
        </button>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 8: よくある間違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくある間違いと注意点</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. 依存配列の漏れ</h3>
            <CodeBlock
              language="tsx"
              title="NG: 依存配列に必要な値が抜けている"
              code={`// NG: count を使っているのに依存配列に入れていない
useEffect(() => {
  document.title = \`カウント: \${count}\`;
}, []); // ESLint が警告を出してくれる

// OK: count を依存配列に含める
useEffect(() => {
  document.title = \`カウント: \${count}\`;
}, [count]);`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">2. 無限ループ</h3>
            <CodeBlock
              language="tsx"
              title="NG: useEffect 内で state を更新して無限ループ"
              code={`// NG: 毎回 state が変わる → 再レンダー → useEffect → state 変更 → ...
useEffect(() => {
  setCount(count + 1); // 無限ループ！
}, [count]);

// NG: オブジェクトを依存配列に入れる（毎回新しい参照になる）
const options = { page: 1 }; // レンダーのたびに新しいオブジェクト
useEffect(() => {
  fetchData(options);
}, [options]); // 毎回「変わった」と判定される → 無限ループ`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">3. useEffect を使いすぎない</h3>
            <div className="mb-4">
              <InfoBox type="warning" title="useEffect は最後の手段">
                <p>
                  React 公式ドキュメントでも「useEffect は外部システムとの同期のためのもの」と強調されています。
                  以下のケースでは useEffect は不要です:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>props / state から計算できる値</strong> → 変数に直接代入するだけ</li>
                  <li><strong>ユーザー操作に反応する処理</strong> → イベントハンドラーに書く</li>
                  <li><strong>レンダー結果を変換するだけ</strong> → useMemo を検討</li>
                </ul>
              </InfoBox>
            </div>
            <CodeBlock
              language="tsx"
              title="useEffect が不要なケース"
              code={`// NG: useEffect で計算結果を state に入れている
const [items, setItems] = useState<Item[]>([]);
const [filteredItems, setFilteredItems] = useState<Item[]>([]);

useEffect(() => {
  setFilteredItems(items.filter((item) => item.active));
}, [items]);

// OK: レンダー中に直接計算する
const [items, setItems] = useState<Item[]>([]);
const filteredItems = items.filter((item) => item.active);
// useEffect 不要！シンプルで高速`}
            />
          </section>

          {/* セクション 9: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground"><strong>useEffect は副作用のための Hook</strong>。API 通信、タイマー、イベントリスナーなど「レンダー以外の処理」に使う</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>依存配列で実行タイミングを制御</strong>。空配列はマウント時のみ、値を入れるとその値が変わったときに再実行</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>クリーンアップ関数を忘れずに</strong>。タイマーやイベントリスナーは必ず後片付けする</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>useEffect を使いすぎない</strong>。計算結果やイベント処理には不要。外部システムとの同期にだけ使う</p>
              </div>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
