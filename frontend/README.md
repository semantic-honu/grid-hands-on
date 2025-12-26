# IN THIS PROJECT

## REACT INSTALL
1. docker run --rm -v ${PWD}:/app -w /app node:20-alpine sh -c "npm create vite@latest frontend -- --template react"

## MUI INSTALL
2. docker run --rm -v ${PWD}:/app -w /app node:20-alpine sh -c "npm install @mui/material @emotion/react @emotion/styled @mui/icons-material axios"

## MUI DataGrid INSTALL
docker run --rm -v ${PWD}:/app -w /app node:20-alpine npm install @mui/x-data-grid

## MUI Router INSTALL
cd frontend
docker run --rm -v ${PWD}:/app -w /app node:20-alpine npm install react-router-dom

## MUI Error Boundary INSTALL
docker run --rm -v ${PWD}:/app -w /app node:20-alpine npm install react-error-boundary

## Zustand INSTALL
docker run --rm -v ${PWD}:/app -w /app node:20-alpine npm install zustand

## Notistack INSTALL
docker run --rm -v ${PWD}:/app -w /app node:20-alpine npm install notistack

my-app/
├── public/                # 静的ファイル (favicon, index.html など)
├── src/
│   ├── assets/            # 画像やフォントなど
│   ├── components/        # 再利用可能な UI コンポーネント
│   ├── pages/             # 画面単位のコンポーネント (Home, About など)
│   ├── hooks/             # カスタムフック (useAuth, useFetch など)
│   ├── context/           # React Context プロバイダー
│   ├── utils/             # 共通関数や型定義
│   ├── styles/            # グローバルCSSやテーマ
│   ├── App.tsx            # ルートコンポーネント
│   └── main.tsx           # エントリーポイント (ReactDOM.createRoot)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

• 	App.tsx
→ ルーティングや全体レイアウトの起点にする。細かい UI は  や  に分離。
• 	components/
→ ボタンやフォームなど再利用可能な部品。命名は PascalCase ()。
• 	pages/
→ URL に対応する画面単位。React Router を使うならここにまとめる。
• 	hooks/
→ 状態管理や API 呼び出しなど、ロジックを再利用可能にする。
• 	utils/
→ 日付フォーマットや API クライアントなど、UI に依存しない処理。
• 	context/
→ グローバル状態（認証、テーマなど）をまとめる。
• 	styles/
→ Tailwind や CSS Modules を使う場合でも、テーマやグローバルスタイルはここに。