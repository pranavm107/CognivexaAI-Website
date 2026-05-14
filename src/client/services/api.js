import axios from 'axios';
import { useClientAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const { tokens } = useClientAuthStore.getState();
    if (tokens?.access?.token) {
      config.headers.Authorization = `Bearer ${tokens.access.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { tokens, setTokens, logout } = useClientAuthStore.getState();
        const response = await axios.post(`${API_URL}/client/auth/refresh-tokens`, {
          refreshToken: tokens.refresh.token,
        });
        const newTokens = response.data.data;
        setTokens(newTokens);
        originalRequest.headers.Authorization = `Bearer ${newTokens.access.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const clientApi = {
  // Dashboard
  getDashboard: () => api.get('/client/dashboard').then(res => res.data),

  // Projects
  getProjects: () => api.get('/client/projects').then(res => res.data),
  getProject: (id) => api.get(`/client/projects/${id}`).then(res => res.data),
  requestProject: (data) => api.post('/client/projects/request', data).then(res => res.data),
  
  // Messages
  getMessages: (projectId) => api.get('/client/messages', { params: { projectId } }).then(res => res.data),
  sendMessage: (data) => api.post('/client/messages', data).then(res => res.data),
  
  // Files
  getFiles: (projectId) => api.get('/client/files', { params: { projectId } }).then(res => res.data),
  uploadFile: (data) => api.post('/client/files/upload', data).then(res => res.data),
  
  // Invoices
  getInvoices: () => api.get('/client/invoices').then(res => res.data),
  payInvoice: (id) => api.post(`/client/invoices/${id}/pay`).then(res => res.data),
  
  // Notifications
  getNotifications: () => api.get('/client/notifications').then(res => res.data),
  markNotificationRead: (id) => api.patch(`/client/notifications/${id}/read`).then(res => res.data),

  // Meetings
  scheduleMeeting: (data) => api.post('/client/meetings', data).then(res => res.data),

  // Profile
  updateProfile: (data) => api.patch('/client/profile', data).then(res => res.data),
  updatePassword: (data) => api.patch('/client/password', data).then(res => res.data),
  // Tasks
  getTasks: (projectId) => api.get(`/tasks/project/${projectId}`).then(res => res.data),
  createTask: (data) => api.post('/tasks', data).then(res => res.data),
  updateTask: (taskId, data) => api.patch(`/tasks/${taskId}`, data).then(res => res.data),
  deleteTask: (taskId) => api.delete(`/tasks/${taskId}`).then(res => res.data),
  // Notifications
  getNotifications: () => api.get('/client/notifications').then(res => res.data),
  markNotificationRead: (id) => api.patch(`/client/notifications/${id}/read`).then(res => res.data),
};

export default api;
