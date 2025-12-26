import snackbarUtils from "../utils/snackbarUtils";
import axios, { HttpStatusCode } from "axios";

// axiosのカスタムインスタンスを作成
const apiClient = axios.create({
    baseURL: "http://localhost:8080/api", // baseURLを設定
    timeout: 5000, // タイムアウトを5秒に設定
});

// 共通エラー処理
apiClient.interceptors.response.use(
    (response) => response, (error) => {
        console.error('API error:', error.config?.url, error);
        if (!error.response) {
            snackbarUtils.error('通信エラーが発生しました。通信できるか確認してください。');
        } else if (error.response.status >= HttpStatusCode.InternalServerError) {
            snackbarUtils.error('サーバーエラーですね。');
        }
        return Promise.reject(error);
    }
);

export const fetchBooksApi = async () => {
    const response = await apiClient.get("/books");
    return response.data;
};

export const createBookApi = (row) => {
    return apiClient.post("/books", row);
}
createBookApi.displayName = '登録';

export const updateBookApi = (row) => {
    return apiClient.put(`/books/${row.id}`, row);
};
updateBookApi.displayName = '更新';

export const deleteBookApi = (row) => {
    return apiClient.delete(`/books/${row.id}`);
};