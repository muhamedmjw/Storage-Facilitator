import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor - Attach auth token
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    
    // Attach Authorization header if token exists
    if (authStore.token) {
      config.headers.Authorization = authStore.token;
    }
    
    console.log(`[API Request] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401/403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    
    // Handle unauthorized (401) or forbidden (403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      authStore.logout();
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired. Please login again.'));
    }
    
    const message = error.response?.data?.message || "Something went wrong with the API.";
    console.error("[API Response Error]", message);
    return Promise.reject(message);
  }
);