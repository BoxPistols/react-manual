import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function UseContext() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 13</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">useContext</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          「バケツリレー」を卒業しよう。アプリ全体で共有したいデータ（テーマ、ログイン状態、言語設定など）を、props を何階層も渡すことなく、どのコンポーネントからでも直接アクセスできるしくみを学びます。
        </p>

        <WhyNowBox tags={['useContext', 'グローバル状態', 'Props Drilling', 'Provider']}>
          <p>
            アプリが大きくなると、あるデータを深い階層のコンポーネントに渡すために何段もの props リレーが必要になります。
            これを「Props Drilling（プロップス・ドリリング）」と呼び、コードが複雑で壊れやすくなる原因です。
            useContext を使えば、<strong>必要なコンポーネントから直接データを取り出せる</strong>ので、中間のコンポーネントがスッキリします。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: Props Drilling の問題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props Drilling の問題</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              まず、Context を使わない場合にどんな問題が起きるか見てみましょう。
              たとえば「ダークモード」の設定を深い階層のコンポーネントに渡す場合:
            </p>
            <CodeBlock
              language="tsx"
              title="Props Drilling の例（つらいパターン）"
              code={`// App → Layout → Sidebar → SidebarItem に theme を渡したい

function App() {
  const [theme, setTheme] = useState('light');
  return <Layout theme={theme} setTheme={setTheme} />;
}

function Layout({ theme, setTheme }: LayoutProps) {
  // Layout 自身は theme を使わないのに、渡すためだけに受け取っている
  return (
    <div>
      <Sidebar theme={theme} setTheme={setTheme} />
      <Main theme={theme} />
    </div>
  );
}

function Sidebar({ theme, setTheme }: SidebarProps) {
  // Sidebar も theme を使わないが、子に渡すために受け取る
  return <SidebarItem theme={theme} setTheme={setTheme} />;
}

function SidebarItem({ theme, setTheme }: SidebarItemProps) {
  // やっとここで使う！
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      現在のテーマ: {theme}
    </button>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="デザイナー向けのたとえ">
                <p>
                  Figma でたとえると、Props Drilling はマスターコンポーネントの色をインスタンスに変更するために、
                  途中の全フレームにひとつずつ変数を設定しているような状態です。
                  Context は「デザイントークン」のように、どの階層からでも直接参照できるグローバルな値の仕組みです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 2: Context の基本 3 ステップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Context の 3 ステップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Context を使うには、3 つの手順を踏みます:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-2">
              <li><strong>createContext</strong> で Context を作成する</li>
              <li><strong>Provider</strong> で値を供給する（上位コンポーネント）</li>
              <li><strong>useContext</strong> で値を取り出す（下位コンポーネント）</li>
            </ol>

            <h3 className="text-lg font-semibold text-foreground mb-3">ステップ 1: Context を作成する</h3>
            <CodeBlock
              language="tsx"
              title="ThemeContext.tsx"
              showLineNumbers
              code={`import { createContext } from 'react';

// Context の型を定義
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Context を作成（デフォルト値を渡す）
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ステップ 2: Provider で値を供給する</h3>
            <CodeBlock
              language="tsx"
              title="ThemeProvider コンポーネント"
              showLineNumbers
              code={`import { useState, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ステップ 3: useContext で値を取り出す</h3>
            <CodeBlock
              language="tsx"
              title="任意のコンポーネントから直接アクセス"
              showLineNumbers
              code={`import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemeToggleButton() {
  // useContext で ThemeContext の値を直接取得
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={
        theme === 'dark'
          ? 'bg-gray-800 text-white p-3 rounded'
          : 'bg-white text-gray-800 p-3 rounded border'
      }
    >
      {theme === 'dark' ? '🌙 ダークモード' : '☀️ ライトモード'}
    </button>
  );
}

// このコンポーネントは App の何階層下にあっても OK！
// props で theme を渡す必要がない`}
            />
          </section>

          {/* セクション 3: Provider の配置 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Provider の配置場所</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Provider は、その値を使いたいコンポーネントの「上位」に配置します。
              アプリ全体で使う値なら、最上位の App コンポーネントで囲みます。
            </p>
            <CodeBlock
              language="tsx"
              title="App.tsx で Provider を配置"
              code={`import { ThemeProvider } from './context/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      {/* ThemeProvider の中のすべてのコンポーネントが
          useContext(ThemeContext) を使える */}
      <Layout>
        <Sidebar />
        <Main />
      </Layout>
    </ThemeProvider>
  );
}

// もはや Layout や Sidebar に theme props を渡す必要なし！`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="複数の Provider を重ねる">
                <p>
                  アプリが複雑になると、テーマ、認証、言語など複数の Context が必要になります。
                  Provider は入れ子にできるので、必要な分だけ重ねましょう。
                </p>
              </InfoBox>
            </div>

            <CodeBlock
              language="tsx"
              title="複数の Provider を重ねる"
              code={`function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <Layout />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}`}
            />
          </section>

          {/* セクション 4: 完全なテーマ切り替えの実装 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: テーマ切り替え機能を作る</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの知識をまとめて、完全なテーマ切り替え機能を実装してみましょう。
              Context の作成、Provider、カスタム Hook までを 1 つのファイルにまとめるパターンです。
            </p>
            <CodeBlock
              language="tsx"
              title="context/ThemeContext.tsx（完全版）"
              showLineNumbers
              code={`import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// 型定義
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// Context 作成
const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Provider コンポーネント
export function ThemeProvider({ children }: { children: ReactNode }) {
  // localStorage から初期値を読み込む
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  // テーマが変わったら localStorage に保存 & HTML に反映
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === 'dark' }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// カスタム Hook（useContext をラップ）
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useTheme は ThemeProvider の中で使ってください'
    );
  }
  return context;
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="カスタム Hook でラップするメリット">
                <p>
                  <code>useContext(ThemeContext)</code> を直接使う代わりに、<code>useTheme()</code> というカスタム Hook を作ることで:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Provider の外で使ったときにエラーメッセージが出る（デバッグが楽）</li>
                  <li>import が 1 つで済む（ThemeContext を知らなくてよい）</li>
                  <li>将来の実装変更に強い</li>
                </ul>
              </InfoBox>
            </div>

            <CodeBlock
              language="tsx"
              title="テーマを使うコンポーネント"
              code={`import { useTheme } from './context/ThemeContext';

function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        {isDark ? '☀️ ライトモードに切り替え' : '🌙 ダークモードに切り替え'}
      </button>
    </header>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  const { isDark } = useTheme();

  return (
    <div className={
      isDark
        ? 'bg-gray-800 text-white border-gray-700 rounded-lg p-4 border'
        : 'bg-white text-gray-900 border-gray-200 rounded-lg p-4 border'
    }>
      <h2 className="font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}`}
            />
          </section>

          {/* セクション 5: 認証情報の共有 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">もう一つの実例: 認証情報の共有</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テーマと並んで Context がよく使われるのが、ログインユーザーの情報です。
              ヘッダーにユーザー名を表示したり、認証状態に応じてページを出し分けたりするケースです。
            </p>
            <CodeBlock
              language="tsx"
              title="context/AuthContext.tsx"
              showLineNumbers
              code={`import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // 実際は API にリクエストを送る
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setUser(data.user);
  };

  const logout = () => {
    setUser(null);
    // 実際は API にログアウトリクエストも送る
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth は AuthProvider の中で使ってください');
  }
  return context;
}`}
            />

            <CodeBlock
              language="tsx"
              title="認証状態に応じた表示"
              code={`import { useAuth } from './context/AuthContext';

function UserMenu() {
  const { user, isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return <a href="/login">ログイン</a>;
  }

  return (
    <div className="flex items-center gap-3">
      <img
        src={user!.avatarUrl}
        alt={user!.name}
        className="w-8 h-8 rounded-full"
      />
      <span>{user!.name}</span>
      <button onClick={logout} className="text-sm text-red-500">
        ログアウト
      </button>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 6: 注意点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Context の注意点</h2>

            <div className="mb-6">
              <InfoBox type="warning" title="Context の値が変わると全消費者が再レンダーされる">
                <p>
                  Provider の value が変わると、useContext でその値を読んでいるすべてのコンポーネントが再レンダーされます。
                  頻繁に変わる値（マウス位置、入力中のテキストなど）を Context に入れると、パフォーマンスが悪化することがあります。
                </p>
              </InfoBox>
            </div>

            <CodeBlock
              language="tsx"
              title="Context を分割してパフォーマンスを改善"
              code={`// NG: すべてを 1 つの Context に詰め込む
const AppContext = createContext({
  theme: 'light',
  user: null,
  language: 'ja',
  notifications: [],
  // ...
});

// OK: 関心ごとに Context を分割する
const ThemeContext = createContext<ThemeContextType>(...);
const AuthContext = createContext<AuthContextType>(...);
const LanguageContext = createContext<LanguageContextType>(...);
const NotificationContext = createContext<NotificationContextType>(...);

// theme が変わっても AuthContext を使うコンポーネントは再レンダーされない`}
            />

            <div className="mt-6">
              <InfoBox type="info" title="Context は万能薬ではない">
                <p>
                  Context は「多くのコンポーネントで共有する、あまり頻繁に変わらないデータ」に最適です。
                  複雑な状態管理が必要な場合は、次のステップで学ぶ useReducer と組み合わせたり、
                  Zustand や Jotai といった状態管理ライブラリの導入を検討しましょう。
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
                <p className="text-muted-foreground"><strong>Context は Props Drilling を解消する</strong>。中間コンポーネントを経由せずに、深い階層にデータを届けられる</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>3 ステップで使える</strong>。createContext で作成 → Provider で供給 → useContext で取得</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>カスタム Hook でラップ</strong>すると、使いやすさとエラーハンドリングが向上する</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>関心ごとに Context を分割</strong>する。1 つの巨大な Context は避け、テーマ・認証・言語などに分ける</p>
              </div>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
