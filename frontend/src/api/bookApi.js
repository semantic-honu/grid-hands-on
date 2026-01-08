import {apiClient} from './baseApi';

export const fetchBooksApi = async () => {
    const response = await apiClient.get("/books");
    return response.data;
};

export const createBookApi = (row) => {
    return apiClient.post("/books", row);
}
createBookApi.displayName = '登録'; //処理名を付与

export const updateBookApi = (row) => {
    return apiClient.put(`/books/${row.id}`, row);
};
updateBookApi.displayName = '更新'; //処理名を付与

export const deleteBookApi = (row) => {
    return apiClient.delete(`/books/${row.id}`);
};
deleteBookApi.displayName = '削除'; //処理名を付与