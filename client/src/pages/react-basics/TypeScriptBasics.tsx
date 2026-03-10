import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function TypeScriptBasics() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 7
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          TypeScript で型をつける
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          TypeScript は JavaScript に「型」を追加した言語です。コードを書いている段階でミスを発見でき、エディタの補完も強力になります。デザイナーにとっても、コンポーネントの使い方が明確になる大きなメリットがあります。
        </p>

        <WhyNowBox tags={['型安全', 'エディタ補完', 'バグ防止', '開発体験']}>
          <p>
            Props を学んだ今こそ TypeScript の型を理解するベストタイミングです。型があると「このコンポーネントにはどんなデータを渡せばいいか」がエディタ上で一目瞭然になります。
          </p>
          <p>
            デザインツールに例えると、Figma でコンポーネントのプロパティに「テキスト」「真偽値」「選択肢」などの型を設定するのと同じです。型があることで、正しい使い方が自然とガイドされます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 基本の型 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">基本の型（プリミティブ型）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScript で最もよく使う基本的な型は4つです。変数名の後に <code className="text-sm bg-muted px-1.5 py-0.5 rounded">: 型名</code> を書いて型を指定します。
            </p>
            <CodeBlock
              code={`// 文字列型
const userName: string = '田中花子';
const greeting: string = \`こんにちは、\${userName}さん\`;

// 数値型
const age: number = 28;
const price: number = 1980;
const ratio: number = 0.75;

// 真偽値型
const isVisible: boolean = true;
const hasError: boolean = false;

// 配列型（2つの書き方）
const colors: string[] = ['赤', '青', '緑'];
const scores: Array<number> = [85, 92, 78];

// 配列の中身の型が混在する場合はタプル
const pair: [string, number] = ['田中', 28];`}
              language="tsx"
              title="基本の型"
            />
          </section>

          {/* 型推論 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">型推論 ー 書かなくても型が付く</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScript は非常に賢く、多くの場面で型を自動的に推論してくれます。すべての変数に型を手書きする必要はありません。「書かなくても正しく推論される」場面と「明示的に書くべき」場面を理解しましょう。
            </p>
            <CodeBlock
              code={`// 型推論が効く場面: 型を書かなくてOK

// 1. 変数の初期化 - 値から型が推論される
const name = '田中';        // string と推論
const age = 28;             // number と推論
const isActive = true;      // boolean と推論
const tags = ['React', 'TS']; // string[] と推論

// 2. 関数の戻り値 - return 文から推論される
function add(a: number, b: number) {
  return a + b;  // 戻り値は number と推論される
}

// 3. コールバック関数の引数 - 文脈から推論される
const numbers = [1, 2, 3];
numbers.map((n) => n * 2);
//           ^ n は number と推論される（numbers が number[] だから）

// 4. 三項演算子やif文の結果
const message = age >= 20 ? '成人' : '未成年';
//    ^ string と推論される`}
              language="tsx"
              title="型推論が効くパターン"
            />
            <CodeBlock
              code={`// 型を明示的に書くべき場面

// 1. 関数の引数 - 推論できないので必須
function greet(name: string): string {  // 引数の型は必須、戻り値は省略可
  return \`こんにちは、\${name}\`;
}

// 2. 空の配列やオブジェクト - 中身がわからないので明示が必要
const items: string[] = [];                    // [] だけだと never[] になる
const user: { name: string; age: number } = {  // 明示しないと推論が不安定
  name: '',
  age: 0,
};

// 3. Props の型定義 - コンポーネントの「仕様書」として必須
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
}
function Button({ label, variant = 'primary' }: ButtonProps) {
  return <button>{label}</button>;
}

// 4. useState の型が推論できないとき
const [data, setData] = useState<User | null>(null);
//                               ^ 初期値 null だけでは User 型が推論できない`}
              language="tsx"
              title="型を明示すべきパターン"
            />
            <InfoBox type="info" title="迷ったらエディタに聞こう">
              <p>
                VS Code で変数にマウスカーソルを合わせると、TypeScript が推論した型がツールチップに表示されます。「この変数の型は何？」と迷ったらエディタに聞くのが一番早いです。推論結果が意図と違う場合だけ、明示的に型を書きましょう。
              </p>
            </InfoBox>
          </section>

          {/* interface vs type */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">interface と type</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              オブジェクトの形を定義するには <code className="text-sm bg-muted px-1.5 py-0.5 rounded">interface</code> と <code className="text-sm bg-muted px-1.5 py-0.5 rounded">type</code> の2つの方法があります。
            </p>
            <CodeBlock
              code={`// interface で定義
interface User {
  name: string;
  age: number;
  email: string;
}

// type で定義（type alias）
type Product = {
  id: number;
  title: string;
  price: number;
};

// どちらも同じように使える
const user: User = {
  name: '田中花子',
  age: 28,
  email: 'tanaka@example.com',
};

const product: Product = {
  id: 1,
  title: 'デザインブック',
  price: 2980,
};`}
              language="tsx"
              title="interface と type の基本"
            />
            <CodeBlock
              code={`// interface は拡張（extends）できる
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;  // 犬種を追加
}

const myDog: Dog = {
  name: 'ポチ',
  age: 3,
  breed: '柴犬',
};

// type は交差型（&）で合成する
type BaseStyle = {
  color: string;
  fontSize: number;
};

type ButtonStyle = BaseStyle & {
  borderRadius: number;
  padding: string;
};`}
              language="tsx"
              title="型の拡張と合成"
            />
            <InfoBox type="success" title="どちらを使うべき？">
              <p>
                React の Props 定義には <strong>interface</strong> を使うのが一般的です。拡張しやすく、エラーメッセージも読みやすいためです。ユニオン型（後述）を使うときは type を使います。プロジェクト内で統一されていれば、どちらでも問題ありません。
              </p>
            </InfoBox>
          </section>

          {/* Props に型をつける */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props に型をつける</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コンポーネントの Props に型をつけることで、使うときにエディタが正しい Props を教えてくれます。間違ったデータを渡すとコンパイルエラーになるので、バグを未然に防げます。
            </p>
            <CodeBlock
              code={`// Props 用の interface を定義
interface AlertProps {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';  // 決められた値のみ
  onClose: () => void;                  // 関数の型
}

function Alert({ title, message, type, onClose }: AlertProps) {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  return (
    <div className={\`p-4 border rounded-lg \${colors[type]}\`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm mt-1">{message}</p>
        </div>
        <button onClick={onClose} className="text-lg leading-none">
          &times;
        </button>
      </div>
    </div>
  );
}

// 正しい使い方 - エディタが補完してくれる
<Alert
  title="保存完了"
  message="変更が保存されました"
  type="info"
  onClose={() => console.log('閉じた')}
/>

// エラーになる例
// <Alert title="テスト" type="danger" />
// → "danger" は type に含まれない
// → message と onClose が不足`}
              language="tsx"
              title="Props に型を定義する"
              showLineNumbers
            />
          </section>

          {/* オプショナル Props */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">オプショナル Props（?）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              プロパティ名の後に <code className="text-sm bg-muted px-1.5 py-0.5 rounded">?</code> をつけると、その Props は省略可能になります。省略された場合の値は <code className="text-sm bg-muted px-1.5 py-0.5 rounded">undefined</code> です。
            </p>
            <CodeBlock
              code={`interface AvatarProps {
  src: string;          // 必須
  alt: string;          // 必須
  size?: number;        // オプショナル（省略可）
  rounded?: boolean;    // オプショナル
  border?: boolean;     // オプショナル
}

function Avatar({
  src,
  alt,
  size = 48,          // デフォルト値を設定
  rounded = true,
  border = false,
}: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size }}
      className={\`
        object-cover
        \${rounded ? 'rounded-full' : 'rounded-lg'}
        \${border ? 'border-2 border-white shadow' : ''}
      \`}
    />
  );
}

// 必須の Props だけ渡せばOK
<Avatar src="/photo.jpg" alt="プロフィール写真" />

// オプショナルな Props を個別に指定
<Avatar src="/photo.jpg" alt="写真" size={64} rounded={false} />`}
              language="tsx"
              title="オプショナル Props とデフォルト値"
            />
          </section>

          {/* ユニオン型 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ユニオン型でバリアントを定義する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユニオン型（<code className="text-sm bg-muted px-1.5 py-0.5 rounded">|</code> で区切る）を使うと、「この中のどれか」という型を作れます。デザインシステムのバリアント（variant）やサイズ（size）を定義するのにぴったりです。
            </p>
            <CodeBlock
              code={`// バリアントをユニオン型で定義
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;   // ユニオン型を使う
  size?: Size;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) {
  const variantStyles: Record<Variant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50',
  };

  const sizeStyles: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`
        rounded-lg font-medium transition-colors
        \${variantStyles[variant]}
        \${sizeStyles[size]}
        \${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      \`}
    >
      {children}
    </button>
  );
}

// エディタが variant の候補を自動補完してくれる
<Button variant="primary" size="lg">保存する</Button>
<Button variant="ghost" size="sm">キャンセル</Button>
<Button variant="outline" onClick={() => alert('クリック！')}>
  詳細を見る
</Button>`}
              language="tsx"
              title="ユニオン型でデザインバリアントを表現"
              showLineNumbers
            />
            <InfoBox type="info" title="Record 型について">
              <p>
                <code>{'Record<Variant, string>'}</code> は「Variant のすべての値をキーに持ち、値が string であるオブジェクト」という型です。バリアントごとのスタイルマッピングを作るときに、すべてのバリアントを網羅しているかチェックしてくれます。
              </p>
            </InfoBox>
          </section>

          {/* ジェネリクス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ジェネリクスの初歩</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ジェネリクス（Generics）は「型の引数」です。関数に値の引数があるように、型にも引数を渡して柔軟に再利用できます。日常的に使う場面を見てみましょう。
            </p>

            <CodeBlock
              code={`// ジェネリクスの基本: Array<T>
// T は「何でもいい型」を表すプレースホルダー

// string の配列
const names: Array<string> = ['田中', '佐藤', '鈴木'];

// number の配列
const scores: Array<number> = [85, 92, 78];

// 自分で定義した型の配列
interface User {
  name: string;
  age: number;
}
const users: Array<User> = [
  { name: '田中', age: 28 },
  { name: '佐藤', age: 32 },
];

// Array<string> は string[] と同じ意味
// どちらを使ってもOK（短い string[] が一般的）`}
              language="tsx"
              title="ジェネリクスの基本: Array<T>"
            />

            <CodeBlock
              code={`import { useState } from 'react';

// useState でジェネリクスを使う場面

// 1. 初期値から推論できる場合 → ジェネリクス不要
const [count, setCount] = useState(0);        // number と推論
const [name, setName] = useState('');          // string と推論
const [isOpen, setIsOpen] = useState(false);   // boolean と推論

// 2. 初期値が null の場合 → ジェネリクスで型を指定
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
//                               ^^^^^^^^^^^
// 「User か null のどちらか」という型を明示

// 後で API からデータを取得して設定する
// setUser({ id: 1, name: '田中', email: 'tanaka@example.com' });
// setUser(null);  // ログアウト時にリセット

// 3. 空配列の場合 → ジェネリクスで中身の型を指定
const [items, setItems] = useState<string[]>([]);
const [todos, setTodos] = useState<Todo[]>([]);`}
              language="tsx"
              title="useState<T> でジェネリクスを使う"
            />

            <CodeBlock
              code={`// Promise<T> - 非同期処理の結果の型
// API からデータを取得する関数でよく使う

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// User データを返す API
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

// Product データを返す API（同じ ApiResponse 構造を再利用）
async function fetchProduct(id: number): Promise<ApiResponse<Product>> {
  const response = await fetch(\`/api/products/\${id}\`);
  return response.json();
}

// T の部分が User や Product に置き換わるだけ
// ApiResponse の構造（data, status, message）は共通で使いまわせる`}
              language="tsx"
              title="ジェネリクスの実践例: API レスポンス"
            />

            <InfoBox type="info" title="ジェネリクスを最初から完璧に理解する必要はない">
              <p>
                ジェネリクスは TypeScript の中でも難しい概念です。最初は「useState{'<User | null>'}(null) のように、型を指定するときに使う」と覚えておけば十分です。ライブラリの型定義を読むときに {'<T>'} が出てきたら「ここに具体的な型が入る」と理解できれば OK です。
              </p>
            </InfoBox>
          </section>

          {/* 型ユーティリティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">便利な型ユーティリティ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScript には、既存の型を変換して新しい型を作る「ユーティリティ型」が組み込まれています。中でもよく使う3つを紹介します。
            </p>

            <CodeBlock
              code={`interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

// ── Partial<T>: すべてのプロパティをオプショナルにする ──
type UserUpdate = Partial<User>;
// 結果:
// {
//   id?: number;
//   name?: string;
//   email?: string;
//   avatar?: string;
//   bio?: string;
// }

// 使い道: ユーザー情報の部分更新
function updateUser(id: number, updates: Partial<User>) {
  // updates には一部のフィールドだけ渡せる
  // updateUser(1, { name: '新しい名前' })       - OK
  // updateUser(1, { email: 'new@example.com' }) - OK
  // updateUser(1, { name: '新', bio: '自己紹介' }) - OK
}`}
              language="tsx"
              title="Partial<T> - 全プロパティをオプショナルに"
            />

            <CodeBlock
              code={`interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

// ── Pick<T, Keys>: 特定のプロパティだけ取り出す ──
type UserPreview = Pick<User, 'name' | 'avatar'>;
// 結果:
// {
//   name: string;
//   avatar: string;
// }

// 使い道: 一覧画面では全情報が不要な場合
function UserListItem({ name, avatar }: UserPreview) {
  return (
    <div className="flex items-center gap-2">
      <img src={avatar} alt={name} className="w-8 h-8 rounded-full" />
      <span>{name}</span>
    </div>
  );
}

// ── Omit<T, Keys>: 特定のプロパティを除外する ──
type UserCreateInput = Omit<User, 'id'>;
// 結果:
// {
//   name: string;
//   email: string;
//   avatar: string;
//   bio: string;
// }

// 使い道: 新規作成時は id はサーバー側で付与されるので除外
function createUser(data: Omit<User, 'id'>) {
  // data.id にはアクセスできない（除外されている）
  // fetch('/api/users', { body: JSON.stringify(data) })
}`}
              language="tsx"
              title="Pick<T, K> と Omit<T, K>"
              showLineNumbers
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2 text-sm">{'Partial<T>'}</h3>
                <p className="text-xs text-muted-foreground">全プロパティを ? に変換。部分更新やフォームの初期値に便利。</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2 text-sm">{'Pick<T, K>'}</h3>
                <p className="text-xs text-muted-foreground">指定したプロパティだけ抜き出す。一覧表示やサマリーに便利。</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2 text-sm">{'Omit<T, K>'}</h3>
                <p className="text-xs text-muted-foreground">指定したプロパティを除外。新規作成時の入力型など。</p>
              </div>
            </div>

            <InfoBox type="success" title="実務でのユーティリティ型">
              <p>
                これらのユーティリティ型は、API のレスポンス型をそのまま使いつつ「この画面ではこのフィールドだけ使う」「更新時は全フィールド任意」といった場面で威力を発揮します。同じ型を何度も定義する代わりに、元の型を変換して使いまわしましょう。
              </p>
            </InfoBox>
          </section>

          {/* React の組み込み型 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React の組み込み型</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React には、よく使う型があらかじめ用意されています。覚えておくと便利な型を紹介します。
            </p>
            <CodeBlock
              code={`import { ReactNode, CSSProperties, MouseEvent, ChangeEvent } from 'react';

// ReactNode - JSX として描画できるもの全般
// string, number, JSX, null, undefined, 配列 すべて含む
interface CardProps {
  children: ReactNode;   // 最もよく使う
}

// CSSProperties - インラインスタイルの型
interface BoxProps {
  style?: CSSProperties;
}
function Box({ style }: BoxProps) {
  return <div style={style}>内容</div>;
}
<Box style={{ backgroundColor: 'blue', padding: 16 }} />

// イベント関連の型
interface InputProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}`}
              language="tsx"
              title="React の便利な組み込み型"
            />
            <CodeBlock
              code={`// React.FC（関数コンポーネント型）について
// 以前はよく使われていたが、現在は使わないのが主流

// 非推奨: React.FC を使うパターン
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <p>こんにちは、{name}さん</p>;
};

// 推奨: 普通の関数として定義する
function Greeting({ name }: { name: string }) {
  return <p>こんにちは、{name}さん</p>;
}

// 理由:
// 1. React.FC は暗黙的に children を含んでいた（React 18 で修正済み）
// 2. デフォルトエクスポートとの相性が悪い
// 3. 普通の関数の方がシンプルで読みやすい`}
              language="tsx"
              title="React.FC は使わなくてOK"
            />
            <InfoBox type="warning" title="React.FC を使わない理由">
              <p>
                ネットの古い記事では <code>React.FC</code> や <code>React.FunctionComponent</code> を使う例が多いですが、現在の React + TypeScript 開発では普通の関数定義が推奨されています。このマニュアルでも普通の関数で統一しています。
              </p>
            </InfoBox>
          </section>

          {/* 実践例: 型付き Button コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: 型付き Button コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの知識を総動員して、実際のデザインシステムで使えるレベルの Button コンポーネントを作ります。
            </p>
            <CodeBlock
              code={`import { ReactNode, ButtonHTMLAttributes } from 'react';

// バリアントとサイズの型定義
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

// Props 定義
// ButtonHTMLAttributes を拡張して、HTML button の全属性を受け取れるようにする
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...rest  // 残りの HTML 属性をすべて受け取る
}: ButtonProps) {
  // バリアントごとのスタイル
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-300',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-300',
    danger:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-300',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300',
  };

  // サイズごとのスタイル
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={\`
        inline-flex items-center justify-center
        rounded-lg font-medium
        transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-2
        \${variantStyles[variant]}
        \${sizeStyles[size]}
        \${fullWidth ? 'w-full' : ''}
        \${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        \${className}
      \`}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

export default Button;`}
              language="tsx"
              title="Button.tsx - デザインシステム品質の型付きコンポーネント"
              showLineNumbers
            />
            <CodeBlock
              code={`// Button の使用例
import Button from './Button';
import { Send, Trash2, Plus } from 'lucide-react';

function ButtonShowcase() {
  return (
    <div className="space-y-6 p-8">
      {/* バリアント */}
      <div className="flex gap-3">
        <Button variant="primary">保存</Button>
        <Button variant="secondary">キャンセル</Button>
        <Button variant="danger">削除</Button>
        <Button variant="ghost">スキップ</Button>
      </div>

      {/* サイズ */}
      <div className="flex items-center gap-3">
        <Button size="sm">小さいボタン</Button>
        <Button size="md">通常ボタン</Button>
        <Button size="lg">大きいボタン</Button>
      </div>

      {/* アイコン付き */}
      <div className="flex gap-3">
        <Button leftIcon={<Send size={16} />}>送信する</Button>
        <Button variant="danger" leftIcon={<Trash2 size={16} />}>削除する</Button>
        <Button variant="secondary" rightIcon={<Plus size={16} />}>追加</Button>
      </div>

      {/* 状態 */}
      <div className="flex gap-3">
        <Button loading>処理中...</Button>
        <Button disabled>無効</Button>
        <Button fullWidth>全幅ボタン</Button>
      </div>

      {/* HTML 属性もそのまま渡せる */}
      <Button type="submit" form="myForm" aria-label="フォームを送信">
        フォーム送信
      </Button>
    </div>
  );
}`}
              language="tsx"
              title="Button の使用例"
            />
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">理解度チェック</h2>

            <Quiz
              question="次の TypeScript コードでエラーが起きる原因はどれですか？

interface Props { name: string; age: number; }
function Profile({ name, age }: Props) { ... }
<Profile name='田中' age='28' />"
              options={[
                { label: 'name が string なのに文字列を渡しているから' },
                { label: 'age が number 型なのに文字列 "28" を渡しているから', correct: true },
                { label: 'interface の書き方が間違っているから' },
                { label: 'Props という名前は予約語だから使えない' },
              ]}
              explanation="age は number 型として定義されていますが、age='28' と書くと文字列の '28' になります。正しくは age={28} と波括弧で囲んで数値として渡します。TypeScript はこのような型の不一致をコンパイル時に検出してくれます。"
            />

            <Quiz
              question="オプショナルな Props の書き方として正しいのはどれですか？"
              options={[
                { label: 'interface Props { name: string; age: number | undefined; }' },
                { label: 'interface Props { name: string; age?: number; }', correct: true },
                { label: 'interface Props { name: string; optional age: number; }' },
                { label: 'interface Props { name: string; age: number = 0; }' },
              ]}
              explanation="プロパティ名の後に ? をつけると、その Props は省略可能（オプショナル）になります。age?: number は age: number | undefined と同じ意味ですが、? を使う方が簡潔で一般的です。interface の中でデフォルト値は設定できません（デフォルト値は関数の引数で設定します）。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="TypeScript 型定義付き Card コンポーネントを作ろう"
              description="CardProps の interface を完成させ、Card コンポーネントの引数に型をつけてください。title は必須の string、description はオプショナルな string、variant は 'default' | 'outlined' のユニオン型（デフォルト 'default'）、children は ReactNode です。"
              initialCode={`import { ReactNode } from 'react';

// この interface を完成させてください
interface CardProps {
  // ここに型定義を書く
}

function Card({ title, description, variant = 'default', children }: CardProps) {
  return (
    <div className={variant === 'outlined' ? 'border-2' : 'shadow-md'}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <div>{children}</div>
    </div>
  );
}`}
              answer={`import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string;
  variant?: 'default' | 'outlined';
  children: ReactNode;
}

function Card({ title, description, variant = 'default', children }: CardProps) {
  return (
    <div className={variant === 'outlined' ? 'border-2' : 'shadow-md'}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <div>{children}</div>
    </div>
  );
}`}
              hints={[
                'title は必須なので ? はつけません。string 型です。',
                'description は省略可能なので ? をつけます。description?: string',
                "variant もオプショナルです。ユニオン型で 'default' | 'outlined' と書きます。",
                'children は ReactNode 型です。import { ReactNode } from "react" が必要です。',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">覚えておく型</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- <code>string</code>, <code>number</code>, <code>boolean</code> - 基本型</li>
                  <li>- <code>string[]</code> - 配列型</li>
                  <li>- <code>ReactNode</code> - JSX 全般</li>
                  <li>- <code>'a' | 'b'</code> - ユニオン型（選択肢）</li>
                  <li>- <code>?</code> - オプショナル（省略可）</li>
                  <li>- <code>{'Partial<T>'}</code>, <code>{'Pick<T, K>'}</code>, <code>{'Omit<T, K>'}</code> - ユーティリティ型</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">実践のコツ</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Props は interface で定義する</li>
                  <li>- バリアントはユニオン型で表現</li>
                  <li>- React.FC は使わない</li>
                  <li>- まずは型推論に任せ、必要なところだけ書く</li>
                  <li>- ジェネリクスは useState{'<T>'} で慣れていく</li>
                  <li>- ユーティリティ型で型の重複を減らす</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Using TypeScript - React 公式',
                  url: 'https://react.dev/learn/typescript',
                  description: 'React 公式の TypeScript ガイド。Props の型付け、Hooks の型、イベントの型など',
                },
                {
                  title: 'TypeScript Handbook - TypeScript 公式',
                  url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
                  description: 'TypeScript の公式ハンドブック。基本型からジェネリクスまで体系的に学べる',
                },
                {
                  title: 'Utility Types - TypeScript 公式',
                  url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
                  description: 'Partial, Pick, Omit, Record など全ユーティリティ型のリファレンス',
                },
                {
                  title: 'React TypeScript Cheatsheet',
                  url: 'https://react-typescript-cheatsheet.netlify.app/',
                  description: 'React + TypeScript のパターン集。実務でよく使う型の書き方がまとまっている',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'any 型は使ってもいいですか？',
                  answer: '基本的に避けるべきです。any を使うと TypeScript の型チェックが無効になり、型を使うメリットがなくなります。「型がわからない」ときは unknown を使いましょう。unknown は any と違い、使う前に型チェックが必要なので安全です。ただし、プロトタイプ段階で素早く動かしたいときに一時的に使い、後で正しい型に置き換えるのは現実的なアプローチです。',
                },
                {
                  question: 'as const とは何ですか？',
                  answer: 'as const は値をリテラル型として推論させるための記法です。例えば const colors = ["red", "blue"] as const と書くと、型が string[] ではなく readonly ["red", "blue"] になります。これにより "red" | "blue" というユニオン型を値から自動生成できます。デザインシステムのバリアント定義で特に便利です。',
                },
                {
                  question: 'interface と type はどちらを使うべきですか？',
                  answer: 'React の Props 定義には interface が一般的に推奨されています。理由は: (1) extends で拡張しやすい、(2) エラーメッセージが読みやすい、(3) 宣言のマージができる。一方、ユニオン型（type Status = "active" | "inactive"）やマッピング型は type でしか書けません。チーム内で「Props は interface、その他は type」と統一するのがおすすめです。',
                },
                {
                  question: '型エラーが怖いのですが、どう対処すればいいですか？',
                  answer: '型エラーは「コードを実行する前にバグを見つけてくれる」味方です。対処法: (1) エラーメッセージを読む - TypeScript のエラーは「期待される型」と「実際の型」を教えてくれます。(2) マウスホバーで型を確認する。(3) 赤線の部分を右クリック → Quick Fix でエディタが修正候補を出してくれることもあります。慣れるまでは時間がかかりますが、型エラーが0になったときの安心感は格別です。',
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
