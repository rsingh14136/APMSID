import axios from "axios";

const API_URL = "http://localhost:8081/auth";

let accessToken = null; // in-memory token

// Set or update access token
export const setAccessToken = (token) => {
  accessToken = token;
};

// Get current access token
export const getAccessToken = () => accessToken;

// Login function
export const login = async (username, password) => {
  const res = await axios.post(
    `${API_URL}/login`,
    { varUserName: username, varPassword: password },
    { withCredentials: true } // sends HttpOnly refresh token
  );
  accessToken = res.data.token;
  return res.data;
};

// Refresh access token
export const refreshAccessToken = async () => {
  const res = await axios.post(
    `${API_URL}/refresh`,
    {},
    { withCredentials: true } // sends refresh token cookie
  );
  accessToken = res.data.token;
  return res.data;
};

// Logout (optional)
export const logout = () => {
  accessToken = null;
  // optionally call backend to clear refresh token cookie
};
