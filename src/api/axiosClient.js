import axios from "axios";
import { store } from "../store";

const apiClient = axios.create({
  // baseURL: "http://localhost:4000/api",
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch({ type: 'auth/logout' });
    }
    return Promise.reject(error);
  }
);

export default apiClient;