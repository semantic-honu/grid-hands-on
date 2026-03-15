import { apiClient, CRUD_OPS, withName } from './baseApi';

export const fetchReviewsApi = async (bookId) => {
  const response = await apiClient.get(`/books/${bookId}/reviews`);
  return response.data;
};

export const createReviewApi = withName((bookId, row) => {
  return apiClient.post(`/books/${bookId}/reviews`, row);
}, CRUD_OPS.CREATE);

export const updateReviewApi = withName((row) => {
  return apiClient.put(`/reviews/${row.id}`, row);
}, CRUD_OPS.UPDATE);

export const deleteReviewApi = withName((row) => {
  return apiClient.delete(`/reviews/${row.id}`);
}, CRUD_OPS.DELETE);