import axios from "axios";

// export const BASE_URL =
//   process.env.NODE_ENV === "development"
//     ? process.env.REACT_APP_API_URL
//     : "netlify";

export const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AccessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
