import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/",
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const xsrfCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="));

  if (xsrfCookie) {
    const tokenValue = decodeURIComponent(xsrfCookie.split("=")[1]);
    config.headers["X-XSRF-TOKEN"] = tokenValue;
  }

  return config;
});

export default api;
