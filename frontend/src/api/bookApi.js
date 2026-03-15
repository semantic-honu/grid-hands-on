import { apiClient, CRUD_OPS, withName } from './baseApi';

export const fetchBooksApi = async () => {
  const response = await apiClient.get("/books");
  return response.data;
};

export const createBookApi = withName((row) => {
  return apiClient.post("/books", row);
}, CRUD_OPS.CREATE);

export const updateBookApi = withName((row) => {
  return apiClient.put(`/books/${row.id}`, row);
}, CRUD_OPS.UPDATE);

export const deleteBookApi = withName((row) => {
  return apiClient.delete(`/books/${row.id}`);
}, CRUD_OPS.DELETE);