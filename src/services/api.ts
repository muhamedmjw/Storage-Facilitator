import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000", // your json-server base
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor for logging or modifying requests
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// Interceptor for handling responses & errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong with the API.";
    console.error("[API Response Error]", message);
    return Promise.reject(message);
  }
);
