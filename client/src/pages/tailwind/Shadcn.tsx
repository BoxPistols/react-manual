import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function Shadcn() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 24</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">shadcn/ui</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          コピー&ペーストで使える美しい UI コンポーネント集。Tailwind CSS と Radix UI をベースにした、完全にカスタマイズ可能なコンポーネントを学びましょう。
        </p>

        <WhyNowBox tags={['shadcn/ui', 'Radix UI', 'コンポーネントライブラリ', 'カスタマイズ']}>
          <p>
            shadcn/ui は「ライブラリ」ではなく「コピー&ペーストで使うコンポーネント集」です。
            npm でインストールする従来のライブラリと違い、コードが自分のプロジェクトに直接コピーされるため、
            完全に自由にカスタマイズできます。Tailwind CSS の知識をそのまま活かせるので、
            デザイナーがデザインシステムを構築するのに最適です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: shadcn/ui とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">shadcn/ui とは</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui は Vercel のエンジニア shadcn が作った、再利用可能な UI コンポーネント集です。
              重要なのは<strong>「ライブラリではない」</strong>という点です。
            </p>

            <CodeBlock
              language="tsx"
              title="従来のライブラリとの違い"
              code={`// ❌ 従来のコンポーネントライブラリ（例: MUI）
// → npm install でインストール
// → node_modules にコードがある
// → カスタマイズに制限がある
import { Button } from '@mui/material';

// ✅ shadcn/ui
// → CLI でコンポーネントをプロジェクトにコピー
// → src/components/ui/ にコードがある
// → 完全に自由にカスタマイズできる
import { Button } from '@/components/ui/button';`}
            />

            <InfoBox type="info" title="shadcn/ui の特徴">
              <ul className="list-disc pl-4 space-y-1">
                <li>Tailwind CSS でスタイリングされている</li>
                <li>Radix UI をベースにアクセシビリティ対応済み</li>
                <li>コードが自分のプロジェクトにコピーされるため完全カスタマイズ可能</li>
                <li>必要なコンポーネントだけを追加できる（バンドルサイズが小さい）</li>
                <li>TypeScript で型安全</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション2: インストール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">インストールとセットアップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Vite + React プロジェクトに shadcn/ui をセットアップしましょう。
            </p>

            <CodeBlock
              language="bash"
              title="1. 新規プロジェクト作成（既存プロジェクトの場合はスキップ）"
              code={`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="bash"
              title="2. shadcn/ui の初期化"
              code={`npx shadcn@latest init`}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              初期化時にいくつかの質問が表示されます。
            </p>

            <CodeBlock
              language="bash"
              title="初期化時の質問と推奨回答"
              code={`? Which style would you like to use? → New York
? Which color would you like to use as base color? → Slate
? Would you like to use CSS variables for colors? → Yes`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="bash"
              title="3. コンポーネントの追加"
              code={`# 個別にコンポーネントを追加
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add select

# 複数同時に追加
npx shadcn@latest add button card dialog input select`}
            />

            <InfoBox type="info" title="追加されるファイル">
              <p>
                コンポーネントは <code>src/components/ui/</code> ディレクトリにコピーされます。
                例えば <code>button.tsx</code>、<code>card.tsx</code> のように、
                通常の React コンポーネントとして追加されます。自由に中身を編集できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: Button コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Button コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui の Button はバリアント（種類）とサイズを props で切り替えられます。
            </p>

            <CodeBlock
              language="tsx"
              title="Button の使い方"
              code={`import { Button } from '@/components/ui/button';

function ButtonExamples() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* バリアント */}
      <Button>デフォルト</Button>
      <Button variant="secondary">セカンダリ</Button>
      <Button variant="destructive">削除</Button>
      <Button variant="outline">アウトライン</Button>
      <Button variant="ghost">ゴースト</Button>
      <Button variant="link">リンク</Button>

      {/* サイズ */}
      <Button size="sm">小さい</Button>
      <Button size="default">標準</Button>
      <Button size="lg">大きい</Button>
      <Button size="icon">🔍</Button>

      {/* 無効状態 */}
      <Button disabled>無効</Button>

      {/* asChild: 別の要素として描画 */}
      <Button asChild>
        <a href="/about">リンクとして描画</a>
      </Button>
    </div>
  );
}`}
            />
          </section>

          {/* セクション4: Card コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Card コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Card は複数のサブコンポーネント（Header、Title、Content、Footer）を組み合わせて使います。
            </p>

            <CodeBlock
              language="tsx"
              title="Card の使い方"
              code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function ProjectCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>プロジェクト名</CardTitle>
        <CardDescription>
          React と Tailwind CSS で作るポートフォリオサイト
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700
                           text-xs rounded-full">
            React
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700
                           text-xs rounded-full">
            Tailwind
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700
                           text-xs rounded-full">
            TypeScript
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">詳細</Button>
        <Button>デモを見る</Button>
      </CardFooter>
    </Card>
  );
}`}
            />
          </section>

          {/* セクション5: Dialog コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Dialog（モーダル）コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Dialog はモーダルウィンドウを作るためのコンポーネントです。
              Radix UI ベースなので、キーボード操作やアクセシビリティに対応済みです。
            </p>

            <CodeBlock
              language="tsx"
              title="Dialog の使い方"
              showLineNumbers
              code={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function DeleteConfirmDialog() {
  return (
    <Dialog>
      {/* トリガー（モーダルを開くボタン） */}
      <DialogTrigger asChild>
        <Button variant="destructive">アカウント削除</Button>
      </DialogTrigger>

      {/* モーダルの中身 */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>本当に削除しますか？</DialogTitle>
          <DialogDescription>
            この操作は取り消せません。すべてのデータが完全に削除されます。
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-2">
            確認のため「DELETE」と入力してください
          </p>
          <Input placeholder="DELETE" />
        </div>

        <DialogFooter>
          <Button variant="outline">キャンセル</Button>
          <Button variant="destructive">削除する</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`}
            />

            <InfoBox type="info" title="Radix UI のアクセシビリティ">
              <p>
                shadcn/ui の Dialog は内部で Radix UI を使っており、
                Escape キーで閉じる、フォーカストラップ、スクリーンリーダー対応などが
                自動的に組み込まれています。自分で実装する必要はありません。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: CSS 変数によるテーマカスタマイズ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS 変数によるテーマカスタマイズ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui は CSS 変数でテーマを管理しています。
              これを変更するだけで、すべてのコンポーネントの見た目を統一的に変更できます。
            </p>

            <CodeBlock
              language="css"
              title="テーマの CSS 変数（src/index.css）"
              showLineNumbers
              code={`:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;

  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;

  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  --border: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;

  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;

  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="ブランドカラーにカスタマイズする例"
              code={`:root {
  /* プライマリカラーをブランドカラーに変更 */
  --primary: 250 80% 55%;         /* 紫系のブランドカラー */
  --primary-foreground: 0 0% 100%;

  /* 角丸をブランドに合わせる */
  --radius: 0.75rem;              /* 少し大きめの角丸 */
}

/* これだけで Button, Card, Dialog 全てのプライマリカラーが変わる */`}
            />

            <InfoBox type="success" title="デザイナーにとっての利点">
              <p>
                Figma のデザインシステムで定義したカラートークンを、
                そのまま CSS 変数として設定できます。
                shadcn/ui の公式サイトにはテーマジェネレーターもあり、
                ビジュアルでカラーを調整してコピー&ペーストできます。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: 実践 — 完成された UI の構築 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：設定画面の構築</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui のコンポーネントを組み合わせて、実用的な設定画面を作ってみましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="SettingsPage.tsx"
              showLineNumbers
              code={`import { Button } from '@/components/ui/button';
import {
  Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">設定</h1>
        <p className="text-muted-foreground">
          アカウントと通知の設定を管理します。
        </p>
      </div>

      <Separator />

      {/* プロフィール設定 */}
      <Card>
        <CardHeader>
          <CardTitle>プロフィール</CardTitle>
          <CardDescription>
            公開される情報を編集します。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">表示名</Label>
            <Input id="name" placeholder="田中 太郎" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" placeholder="taro@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">役職</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="designer">デザイナー</SelectItem>
                <SelectItem value="engineer">エンジニア</SelectItem>
                <SelectItem value="manager">マネージャー</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button>保存する</Button>
        </CardFooter>
      </Card>

      {/* 通知設定 */}
      <Card>
        <CardHeader>
          <CardTitle>通知</CardTitle>
          <CardDescription>
            通知の受け取り方を設定します。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">メール通知</p>
              <p className="text-sm text-muted-foreground">
                重要な更新をメールで受け取る
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">プッシュ通知</p>
              <p className="text-sm text-muted-foreground">
                ブラウザのプッシュ通知を有効にする
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">マーケティング</p>
              <p className="text-sm text-muted-foreground">
                新機能やキャンペーン情報を受け取る
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`}
            />
          </section>

          {/* セクション8: MUI との比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">MUI との比較</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui と MUI はどちらも優れたコンポーネント集ですが、アプローチが大きく異なります。
              プロジェクトに合わせて選びましょう。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">項目</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">shadcn/ui</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">MUI</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">インストール</td>
                    <td className="py-3 px-4">コードをコピー</td>
                    <td className="py-3 px-4">npm パッケージ</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">スタイリング</td>
                    <td className="py-3 px-4">Tailwind CSS</td>
                    <td className="py-3 px-4">Emotion / sx prop</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">カスタマイズ</td>
                    <td className="py-3 px-4">ソースコードを直接編集</td>
                    <td className="py-3 px-4">テーマオーバーライド</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">デザイン言語</td>
                    <td className="py-3 px-4">ニュートラル / 自由</td>
                    <td className="py-3 px-4">Material Design ベース</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">バンドルサイズ</td>
                    <td className="py-3 px-4">必要な分だけ（小さい）</td>
                    <td className="py-3 px-4">比較的大きい</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">コンポーネント数</td>
                    <td className="py-3 px-4">40+ 個</td>
                    <td className="py-3 px-4">60+ 個</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">おすすめ場面</td>
                    <td className="py-3 px-4">独自デザインのプロジェクト</td>
                    <td className="py-3 px-4">Material Design 準拠</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="どちらを選ぶべき？">
              <p>
                <strong>shadcn/ui がおすすめ:</strong> Tailwind CSS を使っている、独自のデザインシステムがある、バンドルサイズを小さくしたい場合。
              </p>
              <p className="mt-2">
                <strong>MUI がおすすめ:</strong> Material Design のルールに沿いたい、豊富なコンポーネントがすぐに必要、大規模なエンタープライズアプリの場合。
              </p>
              <p className="mt-2">
                次のステップでは MUI について詳しく学びます。両方の特徴を理解して、プロジェクトに合った選択ができるようにしましょう。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
