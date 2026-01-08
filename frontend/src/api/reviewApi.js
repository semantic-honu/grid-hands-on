import { apiClient } from './baseApi';

export const fetchReviewsApi = async (bookId) => {
    const response = await apiClient.get(`/books/${bookId}/reviews`);
    return response.data;
};

export const createReviewApi = (bookId, row) => {
    return apiClient.post(`/books/${bookId}/reviews`, row);
}
createReviewApi.displayName = '登録'; //処理名を付与

export const updateReviewApi = (row) => {
    return apiClient.put(`/reviews/${row.id}`, row);
};
updateReviewApi.displayName = '更新'; //処理名を付与

export const deleteReviewApi = (row) => {
    return apiClient.delete(`/reviews/${row.id}`);
};
deleteReviewApi.displayName = '削除'; //処理名を付与