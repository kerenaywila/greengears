import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URl; // OR "http://localhost:5000/api";

// Create an Axios instance
const API = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the Authorization token if available
API.interceptors.request.use(
  (config) => {
    // Fetch the token from localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      // Add the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
