import { apiClient } from './baseApi';

export const registerUser = async (userData) => {
  const response = await apiClient.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await apiClient.post('/users/login', credentials);
  return response.data;
};
