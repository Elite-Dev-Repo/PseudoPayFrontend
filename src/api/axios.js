import axios from "axios";
import { ACCESS, REFRESH } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const PUBLIC_ENDPOINTS = [
  "/register/",
  "/auth/token/",
  "/auth/token/refresh/",
  "/verify-email/",
  "/resend-code/",
  "/resend-token/",
  "/auth/google/",
];

const isPublic = (url = "") =>
  PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));

api.interceptors.request.use(
  (config) => {
    if (!isPublic(config.url)) {
      const token = localStorage.getItem(ACCESS);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let waiters = [];

const onRefreshed = (token) => {
  waiters.forEach((resolve) => resolve(token));
  waiters = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !isPublic(original.url)
    ) {
      original._retry = true;
      const refreshToken = localStorage.getItem(REFRESH);
      if (!refreshToken) {
        localStorage.removeItem(ACCESS);
        localStorage.removeItem(REFRESH);
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          waiters.push((token) => {
            if (token) {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(api(original));
            } else {
              reject(error);
            }
          });
        });
      }

      isRefreshing = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}auth/token/refresh/`,
          { refresh: refreshToken },
        );
        localStorage.setItem(ACCESS, data.access);
        onRefreshed(data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch (refreshError) {
        localStorage.removeItem(ACCESS);
        localStorage.removeItem(REFRESH);
        onRefreshed(null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
