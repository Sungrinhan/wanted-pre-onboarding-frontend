import axios from "axios";

export const URL = "https://pre-onboarding-selection-task.shop/";

export const UnAuthorizedUser = axios.create({
  baseURL: "URL",
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("AccessToken");

export const AuthorizedUser = axios.create({
  baseURL: "URL",
  headers: { Authorization: `Bearer ${token}` },
});

AuthorizedUser.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
