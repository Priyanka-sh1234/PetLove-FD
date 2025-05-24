import axios from 'axios';
import { baseURL } from './config';

const instance = axios.create({
  baseURL,
  timeout: 10000, // Increased timeout
});

// Request Interceptor
instance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = localStorage.getItem("Token");
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
      return config;
    } catch (error) {
      console.error("Error setting authorization header", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    console.log("Instance called");
    return response;
  },
  (error) => {
    console.error("Response Error", error.toJSON?.() || error);
    if (error.response?.status === 401) {
      console.log("Unauthorized error, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default instance;
