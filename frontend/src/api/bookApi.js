import axios from "axios";

// axiosのカスタムインスタンスを作成
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // baseURLを設定
  timeout: 5000, // タイムアウトを5秒に設定
});

export const fetchBooksApi = async () => {
    const response = await apiClient.get("/books");
    return response.data;
};

export const createBookApi = (row) => {
    return apiClient.post("/books", row);
}

export const updateBookApi = (row) => {
    return apiClient.put(`/books/${row.id}`, row);
};

export const deleteBookApi = (row) => {
    return apiClient.delete(`/books/${row.id}`);
};