import axios, { HttpStatusCode } from "axios";

// axiosのカスタムインスタンスを作成
export const apiClient = axios.create({
    baseURL: "http://localhost:8080/api", // baseURLを設定
    timeout: 5000, // タイムアウトを5秒に設定
});

// 共通エラー処理（通知はPage/Utils側で制御するため、ここではログ出力のみ）
apiClient.interceptors.response.use(
    (response) => response, 
    (error) => {
        // 開発時のデバッグ用にコンソールには残すが、画面への通知（snackbar）は出さない
        console.error('API error:', error.config?.url, error.message);
        return Promise.reject(error);
    }
);
