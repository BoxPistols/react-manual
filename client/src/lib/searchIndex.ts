/**
 * ページ検索用インデックス
 * 各ページパスに対して H2 見出しとキーワードをマッピング
 */
export const searchIndex: Record<string, string[]> = {
  '/': [
    'このマニュアルについて', '扱う技術スタック', 'カリキュラム', '前提知識', '学習の進め方',
  ],
  '/intro/setup': [
    '環境構築', 'ターミナル', 'Git', 'Node.js', 'pnpm', 'エディタ', 'VS Code', 'プロジェクト作成',
  ],
  '/react-basics/hello-react': [
    'React が生まれた背景', 'React とは何か', '仮想 DOM', 'SPA', 'シングルページアプリケーション',
    'プロジェクト構造', 'Hello React', 'レンダリングの流れ', 'Vite', 'コーディングチャレンジ',
  ],
  '/react-basics/jsx': [
    'JSX とは何か', 'HTML との違い', 'JSX エラー', '式の埋め込み', '条件分岐', '条件付きレンダリング',
    'リストのレンダリング', 'map', 'フラグメント', 'インラインスタイル', 'コーディングチャレンジ',
  ],
  '/react-basics/components': [
    'コンポーネントとは', 'コンポーネントの粒度', 'UI 分解', '関数コンポーネント',
    'ファイル構成', 'コンポジション', 'Card コンポーネント', 'コンポーネント設計', 'コーディングチャレンジ',
  ],
  '/react-basics/props': [
    'Props とは', '一方向データフロー', '文字列', '数値', '真偽値', 'オブジェクト', '配列',
    'children prop', 'デフォルト Props', '分割代入', 'デストラクチャリング', 'スプレッド構文',
    'ProfileCard', 'コーディングチャレンジ',
  ],
  '/react-basics/typescript': [
    'TypeScript', 'Figma プロパティ', '型', 'interface', 'type', 'Badge', 'Card',
    '型推論', 'Alert', 'ジェネリクス', '型ユーティリティ', 'Partial', 'Omit', 'Pick',
    'Button', 'ReactNode', 'コーディングチャレンジ',
  ],
  '/state-events/use-state': [
    'state', '状態', 'useState', 'カウンター', 'テキスト入力', 'トグル',
    'イミュータビリティ', '配列の更新', 'オブジェクトの更新', 'コールバック形式',
    'バッチ更新', 'Todo リスト', 'コーディングチャレンジ',
  ],
  '/state-events/events': [
    'onClick', 'クリックイベント', 'イベント型', 'イベントハンドラ', '命名規則',
    'onChange', 'onSubmit', 'デフォルト動作の防止', 'キーボードイベント',
    'バブリング', 'キャプチャ', 'デバウンス', 'スロットル', 'カラーピッカー', 'コーディングチャレンジ',
  ],
  '/state-events/conditional-list': [
    '条件分岐', 'タブ切り替え', 'アコーディオン', 'ステッパー', 'map',
    'key prop', 'フィルタリング', 'ソート', 'Empty State', 'カードギャラリー', 'コーディングチャレンジ',
  ],
  '/state-events/forms': [
    '制御コンポーネント', '非制御コンポーネント', 'テキスト入力', 'テキストエリア',
    'セレクトボックス', 'チェックボックス', 'ラジオボタン', 'フォーム送信', 'onSubmit',
    'バリデーション', 'React Hook Form', 'コーディングチャレンジ',
  ],
  '/hooks-deep/use-effect': [
    '副作用', 'Side Effect', 'useEffect', '依存配列', 'クリーンアップ関数',
    'API データ取得', 'fetch', 'レースコンディション', 'AbortController', 'タイマー', 'コーディングチャレンジ',
  ],
  '/hooks-deep/use-context': [
    'Props Drilling', 'Context', 'createContext', 'Provider', 'useContext',
    'テーマ切り替え', '複数 Context', '認証情報', 'パフォーマンス', 'コーディングチャレンジ',
  ],
  '/hooks-deep/use-reducer': [
    'useReducer', 'Reducer', 'Flux', 'dispatch', 'action',
    'TypeScript 型付け', 'Todo アプリ', 'immer', 'ベストプラクティス', 'コーディングチャレンジ',
  ],
  '/hooks-deep/memo-callback': [
    '再レンダー', 'React.memo', 'useMemo', 'useCallback', 'メモ化',
    'DevTools Profiler', 'アンチパターン', 'React Compiler', '検索フィルター', 'コーディングチャレンジ',
  ],
  '/hooks-deep/custom-hooks': [
    'カスタム Hook', 'useLocalStorage', 'useWindowSize', 'useFetch', 'useDebounce',
    'OSS Hooks', 'テスト方法', 'use API', 'React 19', '設計ガイド', 'コーディングチャレンジ',
  ],
  '/css-basics/plain-css': [
    'プレーン CSS', 'CSS Modules', 'ハッシュ化', ':global', 'Vite',
    'className', 'composes', 'typed-css-modules', 'カードコンポーネント',
    'ファイル構成', 'コーディングチャレンジ',
  ],
  '/css-basics/css-in-js': [
    'CSS-in-JS', 'CSS アプローチ比較', 'メリット', 'デメリット', 'ゼロランタイム',
    'パフォーマンス', 'SSR', 'vanilla-extract', 'Linaria', 'コーディングチャレンジ',
  ],
  '/css-basics/styled-components': [
    'styled-components', 'Props ベース', '動的スタイル', 'v6', 'Extending Styles',
    'SSR', 'ServerStyleSheet', 'グローバルスタイル', 'ThemeProvider', 'テーマ切り替え',
    'keyframes', 'アニメーション', 'コーディングチャレンジ',
  ],
  '/css-basics/emotion': [
    'Emotion', 'css prop', 'styled API', 'Composition', 'TypeScript テーマ',
    'babel-plugin', 'styled-components 比較', 'レスポンシブ', 'コーディングチャレンジ',
  ],
  '/css-basics/css-patterns': [
    'BEM', 'SMACSS', 'ユーティリティクラス', 'Container クエリ', '@layer',
    'CSS ネスティング', 'カスタムプロパティ', 'デザイントークン', 'レスポンシブ',
    'Fluid Typography', 'コーディングチャレンジ',
  ],
  '/tailwind/intro': [
    'ユーティリティファースト', 'Tailwind CSS', 'Vite インストール', 'スペーシング',
    'カラー', 'タイポグラフィ', 'Flexbox', 'Grid', 'ホバー', 'フォーカス', 'カードコンポーネント',
  ],
  '/tailwind/responsive-dark': [
    'レスポンシブ', 'ブレイクポイント', 'ダークモード', 'CSS 変数', 'カスタムカラー',
    'アニメーション', 'プロフィールページ',
  ],
  '/tailwind/shadcn': [
    'shadcn/ui', 'Button', 'Card', 'Dialog', 'モーダル', 'CSS 変数', 'テーマカスタマイズ',
    '設定画面', 'MUI 比較',
  ],
  '/mui/intro': [
    'MUI', 'Material UI', 'インストール', 'ThemeProvider', 'Button', 'Typography',
    'Box', 'Container', 'sx prop', 'ウェルカムページ',
  ],
  '/mui/components': [
    'Grid', 'Stack', 'Container', 'TextField', 'Select', 'Checkbox',
    'Alert', 'Snackbar', 'Dialog', 'AppBar', 'Drawer', 'Tabs',
    'Table', 'Card', 'List', 'ダッシュボード',
  ],
  '/mui/customization': [
    'createTheme', 'パレット', 'タイポグラフィ', 'オーバーライド', 'スタイリング',
    'デザイントークン', 'ブランドテーマ',
  ],
  '/practice-app/api': [
    'fetch API', 'async', 'await', '非同期処理', 'データ取得パターン',
    'カスタムフック', 'axios', 'Todo API',
  ],
  '/practice-app/routing': [
    'React Router', 'Routes', 'Route', 'Link', 'NavLink', 'useNavigate',
    'useParams', '動的ルーティング', 'ネストされたルート', 'マルチページ',
  ],
  '/practice-app/portfolio': [
    'ポートフォリオ', 'プロジェクト設計', '型定義', 'レイアウト', 'ヘッダー',
    'ヒーロー', 'スキル', 'プロジェクトギャラリー', 'お問い合わせフォーム', 'レスポンシブ', 'デプロイ',
  ],
  '/nextjs-basics/what-is-nextjs': [
    'Next.js', 'レンダリング方式', 'SSR', 'SSG', 'ISR',
    'ファイルベースルーティング', 'Server Components', 'RSC', 'React Vite 比較',
  ],
  '/nextjs-basics/project-setup': [
    'create-next-app', 'プロジェクト構造', 'ファイル構造', '開発サーバー', 'TypeScript',
  ],
  '/nextjs-basics/routing': [
    'App Router', 'ファイル規約', '動的ルート', 'slug', 'ルートグループ',
    'Link', 'useRouter', 'usePathname', 'ブログ ルーティング',
  ],
  '/nextjs-basics/layout': [
    'ルートレイアウト', 'ネストレイアウト', 'ダッシュボード', 'template.tsx',
    'ナビゲーション', 'Metadata API', 'next/font',
  ],
  '/nextjs-server/rsc': [
    'Server Components', 'RSC', 'async コンポーネント', 'データ取得パターン', 'Server Client 境界',
  ],
  '/nextjs-server/client': [
    'use client', 'Client Component', 'コンポジションパターン', '境界のルール',
    'シリアライズ', '判断フロー',
  ],
  '/nextjs-server/data-fetching': [
    'サーバーサイド fetch', 'キャッシュ戦略', '再検証', 'Revalidation',
    '並列データ取得', 'Suspense', 'ストリーミング',
  ],
  '/nextjs-server/loading-error': [
    'loading.tsx', 'ローディング UI', 'error.tsx', 'エラー UI', 'not-found.tsx',
    '404', 'グローバルエラー',
  ],
  '/nextjs-practice/route-handlers': [
    'route.ts', 'HTTP メソッド', 'GET', 'POST', 'リクエスト', 'レスポンス',
    'お問い合わせフォーム API', 'CORS', 'セキュリティ',
  ],
  '/nextjs-practice/server-actions': [
    'Server Actions', 'フォーム', '送信状態', 'useFormStatus', 'データ再検証',
    'revalidatePath', 'TODO アプリ', 'セキュリティ',
  ],
  '/nextjs-practice/middleware': [
    'ミドルウェア', 'middleware.ts', 'matcher', 'リダイレクト', 'リライト',
    '認証', 'ヘッダー', 'Cookie',
  ],
  '/nextjs-practice/optimization': [
    'next/image', '画像最適化', 'レスポンシブ画像', 'メタデータ API',
    'generateMetadata', 'OG 画像', 'next/font', 'フォント最適化',
  ],
  '/nextjs-css/tailwind-mui': [
    'Tailwind CSS セットアップ', 'Tailwind カスタマイズ', 'MUI セットアップ',
    'MUI コンポーネント', 'Tailwind vs MUI', 'shadcn/ui',
  ],
  '/nextjs-css/css-modules-sc': [
    'CSS Modules', 'styled-components', 'Emotion', 'スタイリング比較', '判断フロー',
  ],
  '/deploy/vercel': [
    'Vercel', 'デプロイ', '環境変数', 'プレビューデプロイ', 'カスタムドメイン', 'チェックリスト',
  ],
  '/deploy/summary': [
    '学習の振り返り', 'スキルセット', '次に学ぶべきこと', 'プロジェクトアイデア',
    '学習リソース', 'デザイナー × エンジニア',
  ],
  '/storybook/intro': [
    'Storybook とは', 'なぜ Storybook', 'コンポーネント開発', '4つの問題',
    'デザイナーとエンジニア', 'エコシステム', '画面構成', 'Storybook 8',
  ],
  '/storybook/setup': [
    'Storybook 導入', 'インストール', 'ファイル構造', 'main.ts', 'preview.ts',
    '初期画面', 'Next.js', 'TypeScript', '静的ビルド',
  ],
  '/storybook/structure': [
    'CSF3', 'Component Story Format', 'Meta', 'Story', 'args', 'argTypes',
    'play 関数', 'インタラクションテスト', 'decorators', 'parameters', 'Docs ページ',
  ],
  '/storybook/css': [
    'CSS 環境', 'プレーン CSS', 'CSS Modules', 'Tailwind CSS', 'MUI',
    'styled-components', 'Emotion', '環境別設定',
  ],
  '/storybook/figma': [
    'Figma 連携', 'addon-designs', 'Design Tokens', 'Chromatic',
    'ビジュアルリグレッション', '静的サイト公開',
  ],
  '/storybook/advanced': [
    'Addons', 'カスタマイズ', 'テスト連携', 'Composition', '複数 Storybook',
    'Storybook 8', '新機能',
  ],
  '/architecture/overview': [
    'フロントエンドアーキテクチャ', 'メンタルモデル', 'ディレクトリ構成',
    '状態管理', 'Next.js アーキテクチャ', 'デザインライブラリ', '推奨パターン',
  ],
  '/architecture/design-system': [
    'デザインシステム', '階層構造', 'デザイントークン', 'コンポーネント API',
    'スターターキット', 'デザイナー',
  ],
  '/architecture/maintenance': [
    '長期運用', 'チーム開発', 'ベストプラクティス', 'テスト戦略', 'パフォーマンス',
    '次のステップ', '55ステップ振り返り',
  ],
};
