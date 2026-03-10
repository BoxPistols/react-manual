export interface PageInfo {
  step: number;
  path: string;
  title: string;
  sectionId: string;
}

export interface SectionInfo {
  id: string;
  title: string;
  part: 'react' | 'nextjs' | 'storybook' | 'architecture';
}

export const sections: SectionInfo[] = [
  // 第1部: React + Vite + TypeScript
  { id: 'intro', title: 'はじめに', part: 'react' },
  { id: 'react-basics', title: 'React の基本', part: 'react' },
  { id: 'state-events', title: '状態管理とイベント', part: 'react' },
  { id: 'hooks-deep', title: 'Hooks 深掘り', part: 'react' },
  { id: 'css-basics', title: 'CSS スタイリング基礎', part: 'react' },
  { id: 'tailwind', title: 'Tailwind CSS', part: 'react' },
  { id: 'mui', title: 'MUI (Material UI)', part: 'react' },
  { id: 'practice-app', title: '実践アプリ制作', part: 'react' },
  // 第2部: Next.js
  { id: 'nextjs-basics', title: 'Next.js 基礎', part: 'nextjs' },
  { id: 'nextjs-server', title: 'Server / Client Components', part: 'nextjs' },
  { id: 'nextjs-practice', title: 'Next.js 実践', part: 'nextjs' },
  { id: 'nextjs-css', title: 'Next.js + CSS 統合', part: 'nextjs' },
  { id: 'deploy', title: 'デプロイと総まとめ', part: 'nextjs' },
  // 第3部: Storybook
  { id: 'storybook', title: 'Storybook', part: 'storybook' },
  // 第4部: アーキテクチャとデザインシステム
  { id: 'architecture', title: 'アーキテクチャとデザインシステム', part: 'architecture' },
];

export const pages: PageInfo[] = [
  // はじめに
  { step: 1, path: '/', title: 'このマニュアルについて', sectionId: 'intro' },
  { step: 2, path: '/intro/setup', title: '環境構築', sectionId: 'intro' },

  // React の基本
  { step: 3, path: '/react-basics/hello-react', title: 'Hello React', sectionId: 'react-basics' },
  { step: 4, path: '/react-basics/jsx', title: 'JSX を理解する', sectionId: 'react-basics' },
  { step: 5, path: '/react-basics/components', title: 'コンポーネント', sectionId: 'react-basics' },
  { step: 6, path: '/react-basics/props', title: 'Props', sectionId: 'react-basics' },
  { step: 7, path: '/react-basics/typescript', title: 'TypeScript で型をつける', sectionId: 'react-basics' },

  // 状態管理とイベント
  { step: 8, path: '/state-events/use-state', title: 'useState', sectionId: 'state-events' },
  { step: 9, path: '/state-events/events', title: 'イベントハンドリング', sectionId: 'state-events' },
  { step: 10, path: '/state-events/conditional-list', title: '条件分岐とリスト表示', sectionId: 'state-events' },
  { step: 11, path: '/state-events/forms', title: 'フォーム入門', sectionId: 'state-events' },

  // Hooks 深掘り
  { step: 12, path: '/hooks-deep/use-effect', title: 'useEffect', sectionId: 'hooks-deep' },
  { step: 13, path: '/hooks-deep/use-context', title: 'useContext', sectionId: 'hooks-deep' },
  { step: 14, path: '/hooks-deep/use-reducer', title: 'useReducer', sectionId: 'hooks-deep' },
  { step: 15, path: '/hooks-deep/memo-callback', title: 'useMemo / useCallback', sectionId: 'hooks-deep' },
  { step: 16, path: '/hooks-deep/custom-hooks', title: 'カスタム Hooks', sectionId: 'hooks-deep' },

  // CSS スタイリング基礎
  { step: 17, path: '/css-basics/plain-css', title: 'プレーン CSS と CSS Modules', sectionId: 'css-basics' },
  { step: 18, path: '/css-basics/css-in-js', title: 'CSS-in-JS の考え方', sectionId: 'css-basics' },
  { step: 19, path: '/css-basics/styled-components', title: 'styled-components', sectionId: 'css-basics' },
  { step: 20, path: '/css-basics/emotion', title: 'Emotion', sectionId: 'css-basics' },
  { step: 21, path: '/css-basics/css-patterns', title: 'CSS 設計パターン', sectionId: 'css-basics' },

  // Tailwind CSS
  { step: 22, path: '/tailwind/intro', title: 'Tailwind CSS 入門', sectionId: 'tailwind' },
  { step: 23, path: '/tailwind/responsive-dark', title: 'レスポンシブとダークモード', sectionId: 'tailwind' },
  { step: 24, path: '/tailwind/shadcn', title: 'shadcn/ui', sectionId: 'tailwind' },

  // MUI
  { step: 25, path: '/mui/intro', title: 'MUI 7 入門', sectionId: 'mui' },
  { step: 26, path: '/mui/components', title: 'MUI コンポーネント活用', sectionId: 'mui' },
  { step: 27, path: '/mui/customization', title: 'MUI カスタマイズ', sectionId: 'mui' },

  // 実践アプリ制作
  { step: 28, path: '/practice-app/api', title: 'API 連携', sectionId: 'practice-app' },
  { step: 29, path: '/practice-app/routing', title: 'React Router', sectionId: 'practice-app' },
  { step: 30, path: '/practice-app/portfolio', title: 'ポートフォリオサイト制作', sectionId: 'practice-app' },

  // Next.js 基礎
  { step: 31, path: '/nextjs-basics/what-is-nextjs', title: 'Next.js とは', sectionId: 'nextjs-basics' },
  { step: 32, path: '/nextjs-basics/project-setup', title: 'Next.js プロジェクト作成', sectionId: 'nextjs-basics' },
  { step: 33, path: '/nextjs-basics/routing', title: 'ページとルーティング', sectionId: 'nextjs-basics' },
  { step: 34, path: '/nextjs-basics/layout', title: 'レイアウトとナビゲーション', sectionId: 'nextjs-basics' },

  // Server / Client Components
  { step: 35, path: '/nextjs-server/rsc', title: 'Server Components', sectionId: 'nextjs-server' },
  { step: 36, path: '/nextjs-server/client', title: 'Client Components', sectionId: 'nextjs-server' },
  { step: 37, path: '/nextjs-server/data-fetching', title: 'データフェッチング', sectionId: 'nextjs-server' },
  { step: 38, path: '/nextjs-server/loading-error', title: 'Loading / Error UI', sectionId: 'nextjs-server' },

  // Next.js 実践
  { step: 39, path: '/nextjs-practice/route-handlers', title: 'Route Handlers', sectionId: 'nextjs-practice' },
  { step: 40, path: '/nextjs-practice/server-actions', title: 'Server Actions', sectionId: 'nextjs-practice' },
  { step: 41, path: '/nextjs-practice/middleware', title: 'ミドルウェアと認証', sectionId: 'nextjs-practice' },
  { step: 42, path: '/nextjs-practice/optimization', title: '画像最適化とメタデータ', sectionId: 'nextjs-practice' },

  // Next.js + CSS 統合
  { step: 43, path: '/nextjs-css/tailwind-mui', title: 'Next.js × Tailwind / MUI', sectionId: 'nextjs-css' },
  { step: 44, path: '/nextjs-css/css-modules-sc', title: 'Next.js × CSS Modules / styled-components', sectionId: 'nextjs-css' },

  // デプロイと総まとめ
  { step: 45, path: '/deploy/vercel', title: 'Vercel デプロイ', sectionId: 'deploy' },
  { step: 46, path: '/deploy/summary', title: '総まとめと次のステップ', sectionId: 'deploy' },

  // Storybook
  { step: 47, path: '/storybook/intro', title: 'Storybook とは', sectionId: 'storybook' },
  { step: 48, path: '/storybook/setup', title: 'Storybook 導入と初期画面', sectionId: 'storybook' },
  { step: 49, path: '/storybook/structure', title: 'Story の書き方と構造', sectionId: 'storybook' },
  { step: 50, path: '/storybook/css', title: 'CSS 環境別 Storybook 表示', sectionId: 'storybook' },
  { step: 51, path: '/storybook/figma', title: 'Figma 連携と Chromatic', sectionId: 'storybook' },
  { step: 52, path: '/storybook/advanced', title: 'Storybook 応用とカスタマイズ', sectionId: 'storybook' },

  // アーキテクチャとデザインシステム
  { step: 53, path: '/architecture/overview', title: 'React / Next.js アーキテクチャ総論', sectionId: 'architecture' },
  { step: 54, path: '/architecture/design-system', title: 'デザインシステムの設計と構築', sectionId: 'architecture' },
  { step: 55, path: '/architecture/maintenance', title: '長期運用とチーム開発', sectionId: 'architecture' },
];

export function getPageByPath(path: string): PageInfo | undefined {
  return pages.find((p) => p.path === path);
}

export function getNextPage(currentPath: string): PageInfo | undefined {
  const current = getPageByPath(currentPath);
  if (!current) return undefined;
  return pages.find((p) => p.step === current.step + 1);
}

export function getPreviousPage(currentPath: string): PageInfo | undefined {
  const current = getPageByPath(currentPath);
  if (!current) return undefined;
  return pages.find((p) => p.step === current.step - 1);
}

export function getSectionPages(sectionId: string): PageInfo[] {
  return pages.filter((p) => p.sectionId === sectionId);
}

export function getNextSectionFirstPage(currentPath: string): PageInfo | undefined {
  const page = getPageByPath(currentPath);
  if (!page) return undefined;
  const sectionIndex = sections.findIndex((s) => s.id === page.sectionId);
  if (sectionIndex === -1 || sectionIndex >= sections.length - 1) return undefined;
  return getSectionPages(sections[sectionIndex + 1].id)[0];
}

export function getPrevSectionFirstPage(currentPath: string): PageInfo | undefined {
  const page = getPageByPath(currentPath);
  if (!page) return undefined;
  const sectionIndex = sections.findIndex((s) => s.id === page.sectionId);
  if (sectionIndex <= 0) return undefined;
  return getSectionPages(sections[sectionIndex - 1].id)[0];
}
