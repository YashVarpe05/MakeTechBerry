import axios from "axios";

// [FIXED]: API URL now configurable via environment variable (was: hardcoded localhost)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 15000 // [FIXED]: Added 15s timeout to prevent hanging requests
});

// [FIXED]: Axios interceptor — auto-redirect to login on 401 (expired/invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      // Only redirect if on an admin page
      if (window.location.pathname.startsWith("/admin") && 
          window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
