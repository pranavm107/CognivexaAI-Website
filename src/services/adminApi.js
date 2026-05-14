import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v1';

// Create axios instance with auth interceptor
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminApi = {
  // Operational Metrics
  getOpsMetrics: () => api.get('/admin/metrics'),
  
  // Workforce
  getWorkforce: () => api.get('/admin/workforce'),
  getWorkforceAnalytics: () => api.get('/admin/workforce/analytics'),
  
  // Projects
  getProjects: () => api.get('/admin/projects'),
  
  // Finance
  getFinanceOverview: () => api.get('/admin/finance/overview'),
  
  // CRM
  getPipeline: () => api.get('/admin/crm/pipeline'),
  
  // Support
  getTickets: () => api.get('/admin/support/tickets'),
  
  // System
  getSystemHealth: () => api.get('/admin/system/health'),
};

export default api;
