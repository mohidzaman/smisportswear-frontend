import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the auth token in all requests
API.interceptors.request.use((config) => {
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
  if (adminInfo && adminInfo.token) {
    config.headers.Authorization = `Bearer ${adminInfo.token}`;
  }
  return config;
});

// Response Interceptor for Deep Logging + Auto-Logout on 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ [API_ERROR] Detail:', {
      endpoint: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // If the server says "Not Authorized" (expired/invalid token), log out automatically
    if (error.response?.status === 401) {
      const isAdminRoute = error.config?.url?.includes('/admin') || 
                           error.config?.url?.includes('/leads') || 
                           error.config?.url?.includes('/products') ||
                           error.config?.url?.includes('/gallery');
      if (isAdminRoute && localStorage.getItem('adminInfo')) {
        console.warn('🔒 [AUTH] Token expired or invalid. Logging out...');
        localStorage.removeItem('adminInfo');
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

export default API;
