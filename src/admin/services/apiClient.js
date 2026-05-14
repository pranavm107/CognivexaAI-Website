import axios from 'axios';
import useAuthStore from '../store/authStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url} - Token Attached`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 error and not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        
        // If we have no refresh token, we can't refresh
        if (!refreshToken) {
          useAuthStore.getState().logout();
          window.location.href = '/admin/login';
          return Promise.reject(error);
        }

        // Attempt to refresh tokens
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v1'}/auth/refresh-tokens`,
          { refreshToken }
        );

        const { access, refresh } = response.data.data;

        // Update auth store with new tokens
        useAuthStore.getState().setAccessToken(access.token);
        useAuthStore.getState().setAuth(
          useAuthStore.getState().user, 
          access.token, 
          refresh.token
        );

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access.token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout
        useAuthStore.getState().logout();
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
