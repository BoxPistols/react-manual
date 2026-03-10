import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

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
            <InfoBox type="info" title="型推論があるので毎回書かなくてOK">
              <p>
                TypeScript は賢いので、値から型を自動推論します。<code>const name = '田中'</code> と書けば自動的に string 型になります。型を明示的に書くのは、推論できない場合や Props の型定義のときが中心です。
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
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">実践のコツ</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Props は interface で定義する</li>
                  <li>- バリアントはユニオン型で表現</li>
                  <li>- React.FC は使わない</li>
                  <li>- まずは型推論に任せ、必要なところだけ書く</li>
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
