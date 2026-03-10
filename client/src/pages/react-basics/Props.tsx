import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function Props() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 6
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          Props
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          コンポーネントにデータを渡す仕組み「Props」を学びましょう。関数の引数のように、親コンポーネントから子コンポーネントへ情報を伝える React の基本的なデータフローです。
        </p>

        <WhyNowBox tags={['データフロー', 'コンポーネント設計', '再利用性']}>
          <p>
            前のステップでコンポーネントを作れるようになりました。しかし、同じ見た目のカードを何枚も作るとき、毎回中身を変えたコンポーネントを作るのは非効率です。Props を使えば、ひとつのコンポーネントに異なるデータを渡して、柔軟に再利用できます。
          </p>
          <p>
            デザインツールでいうと、Figma のコンポーネントプロパティと同じ考え方です。テキストや色、表示/非表示をプロパティで制御するように、React では Props でコンポーネントの振る舞いを制御します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Props とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props とは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props（プロパティの略）は、親コンポーネントから子コンポーネントへデータを渡す仕組みです。JavaScript の関数に引数を渡すのと同じ感覚で使えます。
            </p>
            <CodeBlock
              code={`// 関数の引数と同じ考え方
function greet(name: string) {
  return \`こんにちは、\${name}さん！\`;
}
greet('田中'); // "こんにちは、田中さん！"

// React コンポーネントでは Props として渡す
function Greeting({ name }: { name: string }) {
  return <p>こんにちは、{name}さん！</p>;
}
<Greeting name="田中" />`}
              language="tsx"
              title="Props は関数の引数と同じ"
            />
            <InfoBox type="info" title="一方向のデータフロー">
              <p>
                React のデータは常に親から子へ流れます（一方向データフロー）。子コンポーネントは受け取った Props を直接変更できません。これにより、データの流れが予測しやすくなります。
              </p>
            </InfoBox>
          </section>

          {/* 文字列・数値・真偽値を渡す */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">文字列・数値・真偽値を渡す</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props にはさまざまな型のデータを渡せます。文字列はそのまま、数値や真偽値は波括弧 <code className="text-sm bg-muted px-1.5 py-0.5 rounded">{'{}'}</code> で囲んで渡します。
            </p>
            <CodeBlock
              code={`function UserBadge({ name, age, isOnline }: {
  name: string;
  age: number;
  isOnline: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={isOnline ? 'text-green-500' : 'text-gray-400'}>
        ●
      </span>
      <span>{name}</span>
      <span className="text-sm text-gray-500">({age}歳)</span>
    </div>
  );
}

// 使い方
<UserBadge name="佐藤花子" age={28} isOnline={true} />
<UserBadge name="鈴木太郎" age={32} isOnline={false} />`}
              language="tsx"
              title="さまざまな型の Props"
            />
            <InfoBox type="warning" title="文字列以外は波括弧で囲む">
              <p>
                文字列は <code>name="佐藤"</code> のようにそのまま渡せますが、数値 <code>{'{28}'}</code> や真偽値 <code>{'{true}'}</code> は波括弧が必要です。<code>age="28"</code> と書くと文字列の "28" になってしまいます。
              </p>
            </InfoBox>
          </section>

          {/* オブジェクトと配列を渡す */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">オブジェクトと配列を渡す</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              より複雑なデータとして、オブジェクトや配列も Props で渡せます。
            </p>
            <CodeBlock
              code={`// オブジェクトを渡す
interface User {
  name: string;
  email: string;
  avatar: string;
}

function UserCard({ user }: { user: User }) {
  return (
    <div className="p-4 border rounded-lg">
      <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
      <h3 className="font-bold">{user.name}</h3>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
  );
}

// 使い方
const userData = {
  name: '山田太郎',
  email: 'yamada@example.com',
  avatar: '/avatars/yamada.jpg',
};

<UserCard user={userData} />`}
              language="tsx"
              title="オブジェクトを Props として渡す"
            />
            <CodeBlock
              code={`// 配列を渡す
function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// 使い方
<TagList tags={['React', 'TypeScript', 'デザイン']} />`}
              language="tsx"
              title="配列を Props として渡す"
            />
          </section>

          {/* children prop */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">children prop</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              特別な Props として <code className="text-sm bg-muted px-1.5 py-0.5 rounded">children</code> があります。コンポーネントの開始タグと終了タグの間に書いた内容が children として渡されます。レイアウトやラッパーコンポーネントを作るときに非常に便利です。
            </p>
            <CodeBlock
              code={`import { ReactNode } from 'react';

// カードのレイアウトを提供するコンポーネント
function Card({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="border rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

// 使い方 - 中身を自由に変えられる
<Card title="プロフィール">
  <p>名前: 山田太郎</p>
  <p>役職: デザイナー</p>
</Card>

<Card title="スキル">
  <ul>
    <li>Figma</li>
    <li>React</li>
    <li>TypeScript</li>
  </ul>
</Card>`}
              language="tsx"
              title="children で柔軟なコンポーネントを作る"
            />
            <InfoBox type="info" title="Figma のスロットと同じ">
              <p>
                children は Figma のコンポーネントで「中身を入れ替えられるスロット」を作るのと同じ考え方です。外側のレイアウト（枠、影、余白）は固定で、中身だけ変えられます。
              </p>
            </InfoBox>
          </section>

          {/* デフォルト Props */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デフォルト Props</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props にデフォルト値を設定しておくと、値が渡されなかったときに自動的にその値が使われます。JavaScript のデフォルト引数と同じ仕組みです。
            </p>
            <CodeBlock
              code={`function Button({
  label,
  variant = 'primary',  // デフォルト値
  size = 'md',           // デフォルト値
}: {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';  // ? をつけてオプショナルに
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
  };

  return (
    <button className={\`rounded-lg \${sizeClasses[size]} \${variantClasses[variant]}\`}>
      {label}
    </button>
  );
}

// variant と size を省略するとデフォルト値が使われる
<Button label="送信" />
// variant="primary", size="md" として表示される

// 個別に上書きもできる
<Button label="キャンセル" variant="ghost" size="sm" />`}
              language="tsx"
              title="デフォルト値の設定"
            />
          </section>

          {/* Props の分割代入 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props の分割代入（デストラクチャリング）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props はオブジェクトとして渡されるので、分割代入（デストラクチャリング）を使って個々の値を取り出します。これまでの例でもすでに使っていました。
            </p>
            <CodeBlock
              code={`// 方法1: 引数で直接分割代入（推奨）
function Greeting({ name, message }: { name: string; message: string }) {
  return <p>{message}、{name}さん！</p>;
}

// 方法2: props オブジェクトとして受け取る
function Greeting2(props: { name: string; message: string }) {
  return <p>{props.message}、{props.name}さん！</p>;
}

// 方法3: interface を別に定義する（Props が多いとき推奨）
interface GreetingProps {
  name: string;
  message: string;
  emoji?: string;
}

function Greeting3({ name, message, emoji = '👋' }: GreetingProps) {
  return <p>{emoji} {message}、{name}さん！</p>;
}`}
              language="tsx"
              title="Props の受け取り方いろいろ"
            />
            <InfoBox type="success" title="おすすめのスタイル">
              <p>
                Props が3つ以上になったら、interface を別に定義するのがおすすめです。コードが読みやすくなり、再利用もしやすくなります。
              </p>
            </InfoBox>
          </section>

          {/* 実践例: ProfileCard */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: ProfileCard コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまで学んだことを組み合わせて、実際のデザインで使えるプロフィールカードコンポーネントを作ってみましょう。
            </p>
            <CodeBlock
              code={`import { ReactNode } from 'react';

// Props の型定義
interface ProfileCardProps {
  name: string;
  role: string;
  avatar: string;
  bio?: string;           // オプショナル
  skills?: string[];      // オプショナル
  isAvailable?: boolean;  // デフォルト: true
  children?: ReactNode;   // 追加コンテンツ用
}

function ProfileCard({
  name,
  role,
  avatar,
  bio,
  skills = [],
  isAvailable = true,
  children,
}: ProfileCardProps) {
  return (
    <div className="max-w-sm border rounded-2xl overflow-hidden shadow-lg bg-white">
      {/* ヘッダー部分 */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-500" />

      {/* アバターとステータス */}
      <div className="px-6 -mt-12">
        <div className="relative inline-block">
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          {isAvailable && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
          )}
        </div>
      </div>

      {/* 情報部分 */}
      <div className="px-6 py-4">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>

        {bio && (
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">{bio}</p>
        )}

        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* children で追加コンテンツを表示 */}
        {children && <div className="mt-4 pt-4 border-t">{children}</div>}
      </div>
    </div>
  );
}

export default ProfileCard;`}
              language="tsx"
              title="ProfileCard.tsx - 完成版"
              showLineNumbers
            />
            <CodeBlock
              code={`// ProfileCard の使用例
import ProfileCard from './ProfileCard';

function TeamPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {/* 基本的な使い方 */}
      <ProfileCard
        name="田中花子"
        role="UI/UX デザイナー"
        avatar="/avatars/tanaka.jpg"
      />

      {/* すべての Props を渡す */}
      <ProfileCard
        name="佐藤太郎"
        role="フロントエンドエンジニア"
        avatar="/avatars/sato.jpg"
        bio="React と TypeScript が好きです。デザインシステムの構築に興味があります。"
        skills={['React', 'TypeScript', 'Figma', 'Tailwind']}
        isAvailable={true}
      />

      {/* children を使って追加コンテンツ */}
      <ProfileCard
        name="山田次郎"
        role="プロダクトマネージャー"
        avatar="/avatars/yamada.jpg"
        isAvailable={false}
      >
        <a href="/contact" className="text-blue-600 hover:underline text-sm">
          メッセージを送る
        </a>
      </ProfileCard>
    </div>
  );
}`}
              language="tsx"
              title="ProfileCard の使用例"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Props の基本</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 親から子への一方向データフロー</li>
                  <li>- 文字列、数値、真偽値、オブジェクト、配列を渡せる</li>
                  <li>- 子コンポーネントは Props を変更できない</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">実践ポイント</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- デフォルト値で使いやすい API を設計する</li>
                  <li>- children でレイアウトコンポーネントを作る</li>
                  <li>- interface で Props の型を明確にする</li>
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
