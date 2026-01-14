import axios from 'axios';

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Ensure API_URL ends with /api if it doesn't already
const normalizedAPI_URL = API_URL.endsWith('/api') ? API_URL : `${API_URL.replace(/\/$/, '')}/api`;

// Log API URL for debugging (in development or if API URL seems wrong)
if (import.meta.env.DEV || normalizedAPI_URL.includes('localhost')) {
  console.log('🔗 API URL:', normalizedAPI_URL);
  if (normalizedAPI_URL.includes('localhost') && import.meta.env.PROD) {
    console.warn('⚠️ WARNING: Using localhost API URL in production!');
    console.warn('⚠️ Please set VITE_API_URL environment variable in your deployment platform.');
  }
}

const api = axios.create({
  baseURL: normalizedAPI_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;






