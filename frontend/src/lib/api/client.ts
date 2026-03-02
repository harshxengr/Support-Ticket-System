import axios from "axios";

export const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = (error?.response?.data?.error) ?? (error?.response?.data?.message) ?? "Unexpected error. Please try again.";

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("api:error", { detail: message }));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
