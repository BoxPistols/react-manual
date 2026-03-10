import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function Setup() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 2
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          環境構築
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React の開発に必要なツールをインストールし、最初のプロジェクトを作成して、
          ブラウザに「Hello」を表示するところまで進めましょう。
        </p>

        <WhyNowBox tags={['Node.js', 'pnpm', 'VS Code', 'Vite']}>
          <p>
            料理をする前にキッチンを整えるように、コードを書く前に開発環境を整えます。
            ここで正しくセットアップしておけば、以降の全てのステップがスムーズに進みます。
            逆に、ここで躓くと先に進めません。焦らず一つずつ確認しながら進めましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Node.js のインストール */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Node.js のインストール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Node.js は JavaScript をブラウザの外（あなたのパソコン上）で動かすための実行環境です。
              React の開発ツールはすべて Node.js 上で動くため、最初にインストールが必要です。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">推奨: nvm 経由でインストール</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              nvm（Node Version Manager）を使うと、Node.js のバージョンを簡単に切り替えられます。
              プロジェクトによって異なるバージョンが必要になることがあるため、nvm の利用を強く推奨します。
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">1. Homebrew をインストール（未導入の場合）</p>
                <CodeBlock
                  code={`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}
                  language="bash"
                  title="ターミナル"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">2. nvm をインストール</p>
                <CodeBlock
                  code={`brew install nvm

# nvm のディレクトリを作成
mkdir ~/.nvm

# シェル設定ファイルに以下を追記（zsh の場合）
# ~/.zshrc を開いて末尾に追加してください
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && . "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"`}
                  language="bash"
                  title="ターミナル"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">3. ターミナルを再起動して Node.js をインストール</p>
                <CodeBlock
                  code={`# 最新の LTS（長期サポート版）をインストール
nvm install --lts

# インストール確認
node --version
# v22.x.x と表示されればOK`}
                  language="bash"
                  title="ターミナル"
                />
              </div>
            </div>

            <InfoBox type="info" title="LTS とは？">
              <p>
                LTS（Long Term Support）は長期サポート版のことです。
                最新の機能よりも安定性を重視したバージョンで、実務では LTS を使うのが一般的です。
              </p>
            </InfoBox>
          </section>

          {/* pnpm のインストール */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">pnpm のインストール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              pnpm はパッケージマネージャーと呼ばれるツールです。
              React やその他のライブラリ（=パッケージ）をプロジェクトにインストールするために使います。
              npm や yarn と同じ役割ですが、pnpm はディスク容量を節約でき、動作も高速です。
            </p>

            <CodeBlock
              code={`# pnpm をインストール
npm install -g pnpm

# インストール確認
pnpm --version
# 9.x.x と表示されればOK`}
              language="bash"
              title="ターミナル"
            />

            <div className="mt-4">
              <InfoBox type="info" title="npm と pnpm の違い">
                <p>
                  npm は Node.js に付属する標準のパッケージマネージャーです。
                  pnpm はその高速版と考えてください。使い方はほぼ同じで、<code className="text-xs bg-muted px-1 py-0.5 rounded">npm install</code> の代わりに
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">pnpm install</code> と入力するだけです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* VS Code / Cursor */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">エディタのセットアップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コードを書くためのエディタをインストールします。
              <strong>VS Code</strong>（Visual Studio Code）が最も広く使われており、React 開発に最適な拡張機能が揃っています。
              AI コーディングに興味がある方は <strong>Cursor</strong> もおすすめです（VS Code ベースなので操作感は同じ）。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-2">VS Code</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Microsoft 製の無料エディタ。フロントエンド開発の事実上の標準。
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded block">
                  https://code.visualstudio.com/
                </code>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-2">Cursor</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  VS Code ベースの AI エディタ。AI アシスタントが内蔵されている。
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded block">
                  https://cursor.sh/
                </code>
              </div>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">おすすめの拡張機能</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              以下の拡張機能をインストールすると、開発効率が大幅に上がります。
              VS Code の拡張機能タブ（左サイドバーのブロックアイコン）から検索してインストールしてください。
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card">
                <div className="w-8 h-8 rounded bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 dark:text-yellow-400 text-xs font-bold">ES</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">ES7+ React/Redux/React-Native snippets</p>
                  <p className="text-xs text-muted-foreground">React コンポーネントの雛形を素早く生成できる。<code className="bg-muted px-1 rounded">rafce</code> と入力するだけ。</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card">
                <div className="w-8 h-8 rounded bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 dark:text-purple-400 text-xs font-bold">P</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Prettier - Code formatter</p>
                  <p className="text-xs text-muted-foreground">保存時にコードを自動整形してくれる。インデントや改行を気にしなくてよくなる。</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card">
                <div className="w-8 h-8 rounded bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">ES</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">ESLint</p>
                  <p className="text-xs text-muted-foreground">コードの問題点（バグの原因になりそうな書き方）をリアルタイムで指摘してくれる。</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card">
                <div className="w-8 h-8 rounded bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold">TW</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Tailwind CSS IntelliSense</p>
                  <p className="text-xs text-muted-foreground">Tailwind CSS のクラス名を自動補完してくれる。STEP 22 以降で大活躍。</p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="Prettier の設定">
              <p>
                Prettier をインストールしたら、VS Code の設定で「Format On Save」をオンにしましょう。
                <code className="bg-muted px-1 py-0.5 rounded text-xs">Cmd + ,</code> で設定を開き、「format on save」と検索してチェックを入れます。
              </p>
            </InfoBox>
          </section>

          {/* ターミナルの基本 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">ターミナルの基本操作</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              デザイナーにとってターミナル（黒い画面）は馴染みがないかもしれません。
              でも、React 開発で使うコマンドは数種類だけです。以下の基本コマンドを覚えておきましょう。
            </p>

            <CodeBlock
              code={`# 現在いるフォルダを確認
pwd

# フォルダの中身を一覧表示
ls

# フォルダを移動する
cd フォルダ名

# 一つ上のフォルダに戻る
cd ..

# ホームディレクトリに戻る
cd ~

# フォルダを作成する
mkdir フォルダ名

# コマンドを中断する（開発サーバーを止める時など）
Ctrl + C`}
              language="bash"
              title="基本コマンド"
            />

            <div className="mt-4">
              <InfoBox type="info" title="VS Code 内蔵ターミナル">
                <p>
                  VS Code には内蔵ターミナルがあります。
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl + `</code>（バッククォート）で開閉できます。
                  わざわざ別のターミナルアプリを開く必要はありません。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 最初のプロジェクト作成 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">最初の React プロジェクトを作成する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              いよいよ React プロジェクトを作成します。<strong>Vite</strong>（ヴィート）という高速なビルドツールを使います。
              Vite はフランス語で「速い」という意味で、その名の通り開発サーバーの起動が非常に高速です。
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">1. プロジェクトを作成したいフォルダに移動</p>
                <CodeBlock
                  code={`# ホームディレクトリ直下に projects フォルダを作成
mkdir -p ~/projects
cd ~/projects`}
                  language="bash"
                  title="ターミナル"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">2. Vite で React + TypeScript プロジェクトを作成</p>
                <CodeBlock
                  code={`pnpm create vite my-app --template react-ts`}
                  language="bash"
                  title="ターミナル"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">my-app</code> の部分がプロジェクト名です。好きな名前に変えてOKです。
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">3. プロジェクトフォルダに入り、パッケージをインストール</p>
                <CodeBlock
                  code={`cd my-app
pnpm install`}
                  language="bash"
                  title="ターミナル"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">4. 開発サーバーを起動</p>
                <CodeBlock
                  code={`pnpm dev`}
                  language="bash"
                  title="ターミナル"
                />
              </div>
            </div>

            <InfoBox type="success" title="ブラウザで確認">
              <p>
                ターミナルに <code className="bg-muted px-1 py-0.5 rounded text-xs">http://localhost:5173</code> と表示されたら成功です。
                このURLをブラウザで開くと、Vite + React のデフォルトページが表示されます。
                おめでとうございます！あなたの最初の React アプリが動いています。
              </p>
            </InfoBox>
          </section>

          {/* プロジェクト構成の簡単な説明 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">プロジェクト構成を確認する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              作成されたプロジェクトのフォルダ構成を簡単に見てみましょう。今は全てを理解する必要はありません。
              次の STEP 3 で詳しく解説します。
            </p>

            <CodeBlock
              code={`my-app/
├── node_modules/     # インストールされたパッケージ（触らない）
├── public/           # 静的ファイル（画像など）
├── src/              # ここにコードを書いていく
│   ├── App.tsx       # メインのコンポーネント（ここを編集する）
│   ├── App.css       # App のスタイル
│   ├── main.tsx      # アプリのエントリーポイント
│   ├── index.css     # グローバルスタイル
│   └── vite-env.d.ts # Vite の型定義
├── index.html        # HTML テンプレート
├── package.json      # プロジェクト設定とパッケージ一覧
├── tsconfig.json     # TypeScript 設定
└── vite.config.ts    # Vite 設定`}
              language="text"
              title="プロジェクト構成"
            />

            <div className="mt-4">
              <InfoBox type="info" title="重要なポイント">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">node_modules</code> フォルダは非常に大きく（数万ファイル）、
                  Git にもコミットしません。<code className="bg-muted px-1 py-0.5 rounded text-xs">pnpm install</code> で自動生成されるので、
                  中身を見たり編集したりする必要はありません。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* VS Code でプロジェクトを開く */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">VS Code でプロジェクトを開く</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              作成したプロジェクトを VS Code で開きましょう。
            </p>

            <CodeBlock
              code={`# VS Code でプロジェクトを開く
code .

# Cursor の場合
cursor .`}
              language="bash"
              title="ターミナル"
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">code .</code> コマンドが動かない場合は、
              VS Code を開いて <code className="bg-muted px-1 py-0.5 rounded text-xs">Cmd + Shift + P</code> で
              コマンドパレットを開き、「Shell Command: Install 'code' command in PATH」を選択してください。
            </p>

            <div className="mt-6">
              <InfoBox type="warning" title="開発サーバーを止めるには">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">pnpm dev</code> で起動した開発サーバーは、
                  ターミナルで <code className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl + C</code> を押すと停止できます。
                  ターミナルのウィンドウを閉じるだけでは停止しない場合があるので注意してください。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* このステップのまとめ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>nvm 経由で <strong>Node.js</strong>（LTS）をインストールした</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><strong>pnpm</strong> パッケージマネージャーをインストールした</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><strong>VS Code</strong>（または Cursor）と拡張機能をセットアップした</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>ターミナルの基本コマンドを学んだ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><strong>Vite + React + TypeScript</strong> のプロジェクトを作成し、開発サーバーで表示を確認した</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
