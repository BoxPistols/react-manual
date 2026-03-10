import { BookOpen, Code2, Layers, Palette, Rocket, Server, Layout, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import PageNavigation from '@/components/PageNavigation';

const curriculumPart1 = [
  {
    icon: <BookOpen size={20} />,
    title: 'はじめに',
    steps: 'STEP 1-2',
    description: 'マニュアルの概要と開発環境の構築',
    color: 'bg-blue-500',
  },
  {
    icon: <Code2 size={20} />,
    title: 'React の基本',
    steps: 'STEP 3-7',
    description: 'JSX、コンポーネント、Props、TypeScript',
    color: 'bg-blue-600',
  },
  {
    icon: <Sparkles size={20} />,
    title: '状態管理とイベント',
    steps: 'STEP 8-11',
    description: 'useState、イベント処理、フォーム',
    color: 'bg-indigo-500',
  },
  {
    icon: <Layers size={20} />,
    title: 'Hooks 深掘り',
    steps: 'STEP 12-16',
    description: 'useEffect、useContext、カスタム Hooks',
    color: 'bg-indigo-600',
  },
  {
    icon: <Palette size={20} />,
    title: 'CSS スタイリング',
    steps: 'STEP 17-21',
    description: 'CSS Modules、styled-components、Emotion',
    color: 'bg-violet-500',
  },
  {
    icon: <Palette size={20} />,
    title: 'Tailwind CSS',
    steps: 'STEP 22-24',
    description: 'ユーティリティCSS、shadcn/ui',
    color: 'bg-violet-600',
  },
  {
    icon: <Layout size={20} />,
    title: 'MUI (Material UI)',
    steps: 'STEP 25-27',
    description: 'MUI 7 の導入・活用・カスタマイズ',
    color: 'bg-purple-500',
  },
  {
    icon: <Rocket size={20} />,
    title: '実践アプリ制作',
    steps: 'STEP 28-30',
    description: 'API 連携、ルーティング、ポートフォリオ',
    color: 'bg-purple-600',
  },
];

const curriculumPart2 = [
  {
    icon: <Server size={20} />,
    title: 'Next.js 基礎',
    steps: 'STEP 31-34',
    description: 'プロジェクト作成、ルーティング、レイアウト',
    color: 'bg-emerald-500',
  },
  {
    icon: <Server size={20} />,
    title: 'Server / Client',
    steps: 'STEP 35-38',
    description: 'RSC、データフェッチング、Loading UI',
    color: 'bg-emerald-600',
  },
  {
    icon: <Code2 size={20} />,
    title: 'Next.js 実践',
    steps: 'STEP 39-42',
    description: 'Server Actions、ミドルウェア、最適化',
    color: 'bg-teal-500',
  },
  {
    icon: <Palette size={20} />,
    title: 'Next.js + CSS',
    steps: 'STEP 43-44',
    description: 'Tailwind / MUI / CSS Modules 統合',
    color: 'bg-teal-600',
  },
  {
    icon: <Rocket size={20} />,
    title: 'デプロイと総まとめ',
    steps: 'STEP 45-46',
    description: 'Vercel デプロイ、学習の次のステップ',
    color: 'bg-cyan-600',
  },
];

const techTopics = [
  { name: 'React 19', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  { name: 'TypeScript', color: 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800' },
  { name: 'CSS Modules', color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
  { name: 'styled-components', color: 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800' },
  { name: 'Emotion', color: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
  { name: 'Tailwind CSS', color: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800' },
  { name: 'shadcn/ui', color: 'bg-slate-100 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' },
  { name: 'MUI 7', color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
  { name: 'Next.js 15', color: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800' },
  { name: 'Vite', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* ヒーローセクション */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 dark:from-blue-800 dark:via-indigo-800 dark:to-violet-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
          <div className="mb-4">
            <span className="text-xs font-semibold text-white/80 bg-white/20 px-3 py-1 rounded-full">
              STEP 1
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            デザイナーのための
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
              React 完全入門
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
            Figma でデザインを作れるあなたが、自分の手でそのデザインを動くUIに変えられるようになる。
            React + TypeScript + CSS の全てを、デザイナーの視点で一歩ずつ学んでいきましょう。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/intro/setup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Rocket size={18} />
              学習をはじめる
            </Link>
            <a
              href="#curriculum"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              <BookOpen size={18} />
              カリキュラムを見る
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* 対象読者セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">このマニュアルについて</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4">
                <Palette size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">対象読者</h3>
              <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <li>UIデザイナー・Webデザイナー</li>
                <li>Figma や Adobe XD でデザインを作っている方</li>
                <li>HTML/CSS の基礎知識がある方</li>
                <li>JavaScript の経験は不問（基礎から解説）</li>
                <li>「自分のデザインを自分で実装したい」と思っている方</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-4">
                <Rocket size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">学べること</h3>
              <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <li>React + TypeScript の基礎から実践まで</li>
                <li>5種類以上の CSS スタイリング手法</li>
                <li>shadcn/ui、MUI 7 などのコンポーネントライブラリ</li>
                <li>Next.js によるフルスタック開発</li>
                <li>Vercel へのデプロイまでの一連の流れ</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 扱う技術 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">扱う技術スタック</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            このマニュアルでは、モダンなフロントエンド開発で使われる主要な技術を網羅的に学びます。
            デザイナーが実務で出会う技術を、実際にコードを書きながら理解していきます。
          </p>
          <div className="flex flex-wrap gap-2">
            {techTopics.map((topic) => (
              <span
                key={topic.name}
                className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium border ${topic.color}`}
              >
                {topic.name}
              </span>
            ))}
          </div>
        </section>

        {/* カリキュラム概要 */}
        <section id="curriculum" className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">カリキュラム</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            全46ステップを2部構成で進めます。第1部で React + Vite の基礎を固め、第2部で Next.js を使った本格的な開発を学びます。
          </p>

          {/* 第1部 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">
                第1部
              </div>
              <h3 className="text-xl font-bold text-foreground">React + Vite + TypeScript（STEP 1-30）</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {curriculumPart1.map((section) => (
                <div
                  key={section.title}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white">{section.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-foreground text-sm">{section.title}</h4>
                      <span className="text-xs text-muted-foreground">{section.steps}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 第2部 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-accent/10 text-accent text-sm font-bold rounded-full">
                第2部
              </div>
              <h3 className="text-xl font-bold text-foreground">Next.js（STEP 31-46）</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {curriculumPart2.map((section) => (
                <div
                  key={section.title}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white">{section.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-foreground text-sm">{section.title}</h4>
                      <span className="text-xs text-muted-foreground">{section.steps}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 前提知識 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">前提知識</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 dark:text-green-400 text-xs font-bold">OK</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">HTML / CSS の基礎</p>
                  <p className="text-xs text-muted-foreground">タグの意味、クラス名、基本的なレイアウトが分かればOK</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 dark:text-green-400 text-xs font-bold">OK</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">デザインツールの経験</p>
                  <p className="text-xs text-muted-foreground">Figma、Adobe XD、Sketchなど何でも。コンポーネントの概念が分かると理解が速い</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 dark:text-amber-400 text-xs font-bold">+</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">JavaScript（あると良い、なくても大丈夫）</p>
                  <p className="text-xs text-muted-foreground">変数、関数、配列などの基礎。分からなくても各ステップで丁寧に解説します</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-bold">-</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">プログラミング経験は不要</p>
                  <p className="text-xs text-muted-foreground">ターミナル操作から環境構築まで、ゼロから解説します</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 学習の進め方 */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">学習の進め方</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm mb-1">順番に進める</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  各ステップは前のステップの知識を前提としています。STEP 1 から順番に進めてください。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm mb-1">手を動かす</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  コード例は全てコピー可能です。必ず自分の環境で動かし、少しずつ変更を加えてみてください。
                  「読むだけ」では身につきません。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm mb-1">デザイナーの視点を活かす</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  React のコンポーネントは Figma のコンポーネントに似ています。
                  デザインシステムの考え方がそのままコードに活きます。あなたの強みです。
                </p>
              </div>
            </div>
          </div>
        </section>

        <PageNavigation />
      </div>
    </div>
  );
}
