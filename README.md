# 📚 本とレビューの管理アプリ (Grid Hands-on)

Spring Boot と React を使用した、モダンで高機能なデータグリッド（MUI DataGrid）のポートフォリオプロジェクトです。
単なる CRUD アプリを超え、**「実務で使える UI/UX」** と **「堅牢なバックエンド設計」** の融合を目指しました。

![デモ動画](./docs/demo.gif)
*※GIF動画は `ScreenToGif` などで作成してここに配置してください*

## ✨ このプロジェクトのこだわり

### 🎨 モダンな UI/UX (Frontend)
- **MUI DataGrid の高度な活用**: 
    - **フレキシブル・レイアウト**: `flex` プロパティによる自動列幅調整。
    - **直感的な操作**: スマホではシングルタップ、デスクトップではダブルクリックで即座に行編集を開始。
    - **カスタム・入力**: レビュー評価に「きらめく星マーク（★）」のドロップダウンを採用。
- **ダークモード完全対応**: OS設定との連動および手動切り替えが可能。DataGrid の細部まで目に優しい配色を追求。
- **ストレスのない操作感**: 読み込み中のスケルトンローダー、保存前の行削除への自然な対応、キーボード操作（focus-visible）への配慮。

### 🛠️ 堅牢な設計 (Backend)
- **データ整合性の自動化**: JPA の `CascadeType.ALL` と `orphanRemoval` を活用し、本を削除した際に紐づくレビューも自動で一括削除（カスケード削除）。
- **インメモリ DB (H2) の採用**: Render 等のクラウド環境への即時デプロイに対応。起動時に `schema.sql` / `data.sql` からサンプルデータを自動投入。
- **フロント・バックの適切な分離**: 星マーク（表示用）と数値（保存用）の型変換ロジックをフロントエンドのユーティリティに集約。

## 🚀 技術スタック

### フロントエンド
- **React 19 / Vite** (高速な開発体験)
- **Material UI (MUI)** / **MUI X DataGrid** (Community Edition)
- **React Query** (自動リフレッシュ制御による安定したデータ通信)
- **Notistack** (スナックバー通知の集約管理)

### バックエンド
- **Java 17 / Spring Boot 4.0**
- **Spring Data JPA** (Hibernate)
- **H2 Database** (In-Memory モードによるポータビリティの確保)
- **Lombok** (クリーンなコード作成)

### インフラ・ツール
- **Docker / Docker Compose** (一貫した開発環境)
- **Render** (デプロイ環境への最適化済み)

## 🛠️ セットアップと実行方法

Docker Compose がインストールされていれば、リポジトリをクローンしてコマンド一つで即座に動作します。

1.  **リポジトリをクローン:**
    ```bash
    git clone <repository-url>
    cd grid-hands-on
    ```

2.  **アプリケーションの起動:**
    ```bash
    docker compose up --build
    ```

3.  **アクセス:**
    - フロントエンド: [http://localhost:5173](http://localhost:5173)
    - バックエンド API: [http://localhost:8080](http://localhost:8080)
    - H2 Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

## 📂 プロジェクト構成
```
grid-hands-on/
├── backend/      # Spring Boot (Java 17, H2, JPA)
├── frontend/     # React (Vite, MUI, React Query)
├── docs/         # デモ用 GIF などのドキュメント資産
└── compose.yaml  # Docker Compose 設定ファイル
```

## 📝 ライセンス
本アプリケーションは学習・ポートフォリオ目的で作成されています。
各 OSS の著作権およびライセンスはそれぞれの作者・団体に帰属します。
