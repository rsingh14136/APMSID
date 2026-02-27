import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true
});

// ⭐ Interceptor runs before EVERY request
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
console.log("token====>>>",token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;