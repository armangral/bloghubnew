import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5100/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const errData = error.response.data;

      if (
        errData?.error === "AUTHENTICATION_ERROR" &&
        errData?.message === "Not authorized, token failed."
      ) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-token");
          localStorage.removeItem("auth-user");

          toast.error("Session expired. Redirecting to login...", {
            duration: 3000,
          });

          setTimeout(() => {
            window.location.href = "/auth/signin";
          }, 3000);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
