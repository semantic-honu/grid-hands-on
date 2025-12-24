# Grid Hands-on

これは Spring Boot と React を使用した Web アプリケーションのポートフォリオプロジェクトです。
書籍情報を管理するシンプルな CRUD 機能を提供します。

## 概要

このプロジェクトは、バックエンド、フロントエンド、データベースが Docker コンテナとして連携して動作します。
AG Grid のような高機能なデータグリッドの実装方法を学ぶことを目的としています。

## 技術スタック

### バックエンド
- Java 17（OpenJDK）
- Spring Boot
- Spring Data JPA
- Spring Security
- Maven
- PostgreSQL

### フロントエンド
- React 19
- Vite
- Material-UI(MUI Core)
- MUI X DataGrid（Community Edition）
- Zustand
- Axios
- React Router

### インフラ
- Docker
- Docker Compose

## セットアップと実行方法

### 必要なもの
- Docker
- Docker Compose

### 手順
1.  **リポジトリをクローン:**
    ```bash
    git clone <repository-url>
    cd grid-hands-on
    ```

2.  **`.env` ファイルの作成:**
    `.env.example` をコピーして `.env` ファイルを作成し、環境変数を設定してください。
    ```bash
    cp .env.example .env
    ```

3.  **Docker コンテナの起動:**
    プロジェクトのルートディレクトリで以下のコマンドを実行します。
    ```bash
    docker compose up -d --build
    ```

4.  **アプリケーションへのアクセス:**
    -   フロントエンド: [http://localhost:5173](http://localhost:5173)
    -   バックエンド API: [http://localhost:8080](http://localhost:8080)

## プロジェクト構成
```
grid-hands-on/
├── backend/      # Spring Boot アプリケーション
├── frontend/     # React アプリケーション
└── compose.yaml  # Docker Compose 設定ファイル
```
## ライセンスについて
本アプリケーションは上記 OSS を利用していますが、
各 OSS の著作権およびライセンスはそれぞれの作者・団体に帰属します。
