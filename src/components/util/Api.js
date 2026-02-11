import axios from "axios";
import { getAccessToken, refreshAccessToken } from "../util/Auth";

const API_BASE = "http://localhost:8081/api"; // your protected APIs

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // send refresh token automatically
});

// Attach access token to all requests
api.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: refresh token if access token expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const data = await refreshAccessToken();
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        originalRequest.headers["Authorization"] = `Bearer data.token`;
        return api(originalRequest); // retry original request
      } catch (err) {
        console.log("Refresh token failed, redirect to login");
        window.location.href = "/"; // redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
