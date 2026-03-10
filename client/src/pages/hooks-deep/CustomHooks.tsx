import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function CustomHooks() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 16</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">カスタム Hooks</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          自分だけのオリジナル Hook を作ろう。複数のコンポーネントで繰り返し使うロジックを「カスタム Hook」として切り出すことで、
          コードの重複を減らし、テストしやすく、読みやすいコードが書けます。
        </p>

        <WhyNowBox tags={['カスタムHooks', 'ロジックの再利用', 'useLocalStorage', 'useFetch']}>
          <p>
            ここまでで useState、useEffect、useContext、useReducer、useMemo、useCallback と多くの組み込み Hook を学びました。
            実際の開発では、これらを組み合わせたパターンが何度も登場します。
            カスタム Hook はそのパターンを<strong>「名前をつけて再利用可能にする」</strong>しくみです。
            React のコンポーネントが「UIの再利用」なら、カスタム Hook は「ロジックの再利用」です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: カスタム Hook とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">カスタム Hook とは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              カスタム Hook は「<code className="text-sm bg-muted px-1.5 py-0.5 rounded">use</code> から始まる名前の関数」で、
              中で他の Hook を使っているものです。コンポーネントではなく、ロジックだけを切り出した関数です。
            </p>
            <CodeBlock
              language="tsx"
              title="カスタム Hook の最小例"
              code={`// カスタム Hook: use で始まる関数名
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

// 使い方: 複数のコンポーネントで再利用できる
function Modal() {
  const { value: isOpen, toggle, setFalse: close } = useToggle();

  return (
    <div>
      <button onClick={toggle}>メニューを開く</button>
      {isOpen && (
        <div className="modal">
          <p>モーダルの内容</p>
          <button onClick={close}>閉じる</button>
        </div>
      )}
    </div>
  );
}

function DarkModeSwitch() {
  const { value: isDark, toggle } = useToggle();

  return (
    <button onClick={toggle}>
      {isDark ? '🌙 ダーク' : '☀️ ライト'}
    </button>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="命名規則: 必ず use から始める">
                <p>
                  カスタム Hook の名前は <strong>必ず <code>use</code> から始める</strong> 必要があります（例: <code>useToggle</code>, <code>useFetch</code>）。
                  これは React のルールで、ESLint がこのプレフィックスを使って「Hook のルール」を検証しています。
                  <code>use</code> を付けないと、他の Hook を中で呼べなくなります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 2: useLocalStorage */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践 1: useLocalStorage</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ブラウザの localStorage にデータを保存・復元する処理を Hook にまとめます。
              useState と同じインターフェースで、自動的に永続化される state が作れます。
            </p>
            <CodeBlock
              language="tsx"
              title="hooks/useLocalStorage.ts"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // 初期値: localStorage に保存されていればそれを使う
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      console.warn(
        \`localStorage の読み込みに失敗しました: \${key}\`
      );
      return initialValue;
    }
  });

  // 値が変わったら localStorage に保存
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.warn(
        \`localStorage への保存に失敗しました: \${key}\`
      );
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}`}
            />

            <CodeBlock
              language="tsx"
              title="useLocalStorage の使い方"
              code={`function Settings() {
  // useState とまったく同じ使い勝手！
  // ただし値がブラウザに永続化される
  const [name, setName] = useLocalStorage('userName', '');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  return (
    <div style={{ fontSize }}>
      <label>
        名前:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        文字サイズ: {fontSize}px
        <input
          type="range"
          min={12}
          max={24}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
        ダークモード
      </label>

      {/* ページをリロードしても値が保持される！ */}
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="デザイナーの日常でも便利">
                <p>
                  ユーザーの設定値（テーマ、フォントサイズ、サイドバーの開閉状態など）を
                  ページリロード後も保持したい場面は多いです。useLocalStorage があれば、
                  useState を 1 行置き換えるだけで永続化が完了します。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 3: useWindowSize */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践 2: useWindowSize</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ウィンドウサイズの変化をリアクティブに取得する Hook です。
              レスポンシブなレイアウトを JavaScript で制御したいときに使います。
            </p>
            <CodeBlock
              language="tsx"
              title="hooks/useWindowSize.ts"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}`}
            />

            <CodeBlock
              language="tsx"
              title="useWindowSize の使い方"
              code={`function ResponsiveLayout() {
  const { width, isMobile, isDesktop } = useWindowSize();

  return (
    <div>
      <p>現在の幅: {width}px</p>

      {isMobile ? (
        // モバイル: ハンバーガーメニュー
        <MobileMenu />
      ) : (
        // デスクトップ: サイドバー
        <Sidebar />
      )}

      <div className={isDesktop ? 'grid grid-cols-3 gap-4' : 'space-y-4'}>
        <Card title="カード 1" />
        <Card title="カード 2" />
        <Card title="カード 3" />
      </div>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="CSS メディアクエリとの使い分け">
                <p>
                  レイアウトの切り替えだけなら CSS のメディアクエリ（Tailwind の <code>md:</code> や <code>lg:</code>）のほうが適切です。
                  useWindowSize は「ウィンドウサイズに応じてロジックを変えたい」（表示するデータ数を変える、グラフの種類を変えるなど）場合に使いましょう。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 4: useFetch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践 3: useFetch</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              API データの取得は頻繁に行う処理です。loading、error、data の 3 状態管理と
              クリーンアップを Hook にまとめると、各コンポーネントでの記述が大幅に減ります。
            </p>
            <CodeBlock
              language="tsx"
              title="hooks/useFetch.ts"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            \`HTTP エラー: \${response.status}\`
          );
        }

        const json = (await response.json()) as T;
        setData(json);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return; // キャンセルされた場合は無視
        }
        setError(
          err instanceof Error ? err.message : '不明なエラー'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, fetchCount]);

  const refetch = () => setFetchCount((c) => c + 1);

  return { data, loading, error, refetch };
}`}
            />

            <CodeBlock
              language="tsx"
              title="useFetch の使い方"
              code={`interface Post {
  id: number;
  title: string;
  body: string;
}

function BlogPosts() {
  const { data: posts, loading, error, refetch } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );

  if (loading) return <p>読み込み中...</p>;
  if (error) return (
    <div>
      <p className="text-red-500">エラー: {error}</p>
      <button onClick={refetch}>再試行</button>
    </div>
  );

  return (
    <div>
      <button onClick={refetch} className="mb-4">
        データを再取得
      </button>
      <ul className="space-y-3">
        {posts?.map((post) => (
          <li key={post.id} className="border rounded p-4">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-gray-600 text-sm">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 別のコンポーネントでも同じ Hook を再利用
function UserProfile({ userId }: { userId: number }) {
  const { data: user, loading } = useFetch<{ name: string; email: string }>(
    \`https://jsonplaceholder.typicode.com/users/\${userId}\`
  );

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 5: useDebounce */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践 4: useDebounce</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              検索入力のように「入力が止まってから処理したい」場合に使う Hook です。
              キー入力のたびに API を叩くのではなく、入力が落ち着いてから実行します。
            </p>
            <CodeBlock
              language="tsx"
              title="hooks/useDebounce.ts"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay ミリ秒後に値を更新
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 次の値が来たらタイマーをリセット
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`}
            />

            <CodeBlock
              language="tsx"
              title="useDebounce + useFetch を組み合わせた検索"
              showLineNumbers
              code={`function SearchPage() {
  const [query, setQuery] = useState('');

  // 300ms 入力が止まってから検索値を更新
  const debouncedQuery = useDebounce(query, 300);

  // debouncedQuery が変わったときだけ API を叩く
  const { data, loading } = useFetch<Post[]>(
    debouncedQuery
      ? \`https://api.example.com/search?q=\${debouncedQuery}\`
      : ''
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索..."
        className="border rounded px-3 py-2 w-full"
      />

      {/* ユーザーが "react" と入力:
          r → re → rea → reac → react
          最後のキー入力から 300ms 後に 1 回だけ検索される */}

      {loading && <p>検索中...</p>}

      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="API コストの削減にも貢献">
                <p>
                  debounce なしで 5 文字入力すると 5 回の API リクエストが発生しますが、
                  useDebounce を使えば 1 回に減ります。外部 API の利用料金を抑えるのにも効果的です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 6: カスタム Hook の設計ガイド */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">カスタム Hook の設計ガイド</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. いつカスタム Hook を作るべきか</h3>
            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>同じロジックが 2 箇所以上で使われている</strong> → カスタム Hook に抽出</li>
                <li><strong>コンポーネントのロジックが長くなりすぎた</strong> → Hook に分割して責務を明確化</li>
                <li><strong>テストしたいロジックがある</strong> → Hook にすれば UI なしでテストできる</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">2. 命名のコツ</h3>
            <CodeBlock
              language="tsx"
              title="良い命名の例"
              code={`// 「何をするか」が名前から明確にわかる
useLocalStorage()   // localStorage を扱う
useWindowSize()     // ウィンドウサイズを取得する
useFetch()          // データを取得する
useDebounce()       // 値のデバウンスをする
useToggle()         // true/false を切り替える
useForm()           // フォームの状態を管理する
useMediaQuery()     // メディアクエリを判定する
useClickOutside()   // 要素外のクリックを検出する
usePrevious()       // 前回の値を保持する
useOnlineStatus()   // オンライン/オフラインを判定する`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">3. 戻り値の設計</h3>
            <CodeBlock
              language="tsx"
              title="戻り値のパターン"
              code={`// パターン 1: 配列で返す（useState 風）
// → 呼び出し側が自由に名前を付けられる
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle] as const;
}
const [isOpen, toggleOpen] = useToggle();
const [isDark, toggleDark] = useToggle(true);

// パターン 2: オブジェクトで返す（値が多いとき）
// → 分割代入で必要なものだけ取り出せる
function useFetch<T>(url: string) {
  // ...
  return { data, loading, error, refetch };
}
const { data, loading } = useFetch('/api/users');
// error と refetch は今は不要なので取り出さない`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="配列 vs オブジェクト の使い分け">
                <p>
                  <strong>配列</strong>: 戻り値が 2〜3 個で、同じ Hook を複数回使う可能性があるとき（名前の衝突を避けやすい）。<br />
                  <strong>オブジェクト</strong>: 戻り値が多いとき、または必要なものだけ取り出したいとき。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 7: ファイル構成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プロジェクトでのファイル構成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              カスタム Hook はプロジェクト内の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">hooks/</code> ディレクトリにまとめるのが一般的です。
            </p>
            <CodeBlock
              language="bash"
              title="推奨ディレクトリ構成"
              code={`src/
├── components/       # UI コンポーネント
│   ├── Button.tsx
│   └── Modal.tsx
├── hooks/            # カスタム Hooks
│   ├── useLocalStorage.ts
│   ├── useWindowSize.ts
│   ├── useFetch.ts
│   ├── useDebounce.ts
│   └── useToggle.ts
├── contexts/         # Context + Provider
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
└── pages/            # ページコンポーネント
    ├── Home.tsx
    └── Settings.tsx`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="Hook のルールを忘れずに">
                <p>カスタム Hook でも、React の Hook ルールは同じです:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Hook はコンポーネントまたはカスタム Hook のトップレベルでのみ呼ぶ</li>
                  <li>条件分岐やループの中で Hook を呼ばない</li>
                  <li>名前は必ず <code>use</code> で始める</li>
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* セクション 8: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground"><strong>カスタム Hook は「ロジックの再利用」</strong>。コンポーネントが UI の再利用なら、Hook はロジックの再利用</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>use プレフィックスが必須</strong>。React がこのルールで Hook の使い方を検証している</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>実用的なカスタム Hook</strong>: useLocalStorage（永続化）、useWindowSize（画面サイズ）、useFetch（データ取得）、useDebounce（入力の間引き）</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>hooks/ ディレクトリにまとめる</strong>。名前で何をする Hook かわかるようにし、戻り値は配列またはオブジェクトで返す</p>
              </div>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
