import apiClient from './apiClient';

/**
 * Admin Enterprise Operations API
 */
export const adminApi = {
  // Ops Dashboard
  getOpsDashboard: () => apiClient.get('/admin/ops/dashboard'),
  getActivityFeed: () => apiClient.get('/admin/ops/activity'),
  
  // Client Management
  getClients: () => apiClient.get('/admin/ops/clients'),
  impersonateClient: (clientId) => apiClient.post(`/admin/ops/clients/${clientId}/impersonate`),
  
  // Project Monitoring
  getProjectMonitor: () => apiClient.get('/admin/ops/projects/monitor'),
  
  // Existing Admin Workspaces (assuming they map to standard endpoints)
  getAnalytics: (period) => apiClient.get(`/admin/analytics?period=${period}`),
  getBookings: () => apiClient.get('/admin/bookings'),
  getInquiries: () => apiClient.get('/admin/inquiries'),
  getNotifications: () => apiClient.get('/admin/notifications'),
  
  // CMS & Content
  getServices: () => apiClient.get('/admin/services'),
  getPortfolio: () => apiClient.get('/admin/portfolio'),
  getTeam: () => apiClient.get('/admin/team'),
  
  // Settings
  getSettings: () => apiClient.get('/admin/settings'),
  updateSettings: (data) => apiClient.patch('/admin/settings', data),

  // Financial Operations
  getFinancialHealth: () => apiClient.get('/admin/finance/ops/health'),
  getAgingReport: () => apiClient.get('/admin/finance/ops/aging-report'),

  // Enterprise Operational Platform (Priority 4)
  getWorkforceTeam: () => apiClient.get('/admin/workforce/team'),
  getWorkforceAnalytics: () => apiClient.get('/admin/workforce/analytics'),
  onboardEmployee: (data) => apiClient.post('/admin/workforce/onboard', data),
  getSalesPipeline: () => apiClient.get('/admin/ops-platform/crm/pipeline'),
  getTickets: () => apiClient.get('/admin/ops-platform/support/tickets'),
  createTicket: (data) => apiClient.post('/admin/ops-platform/support/tickets', data),

  // Tenant & Commercial (Priority 5)
  getTenantBranding: () => apiClient.get('/tenant/branding'),
  updateTenantBranding: (data) => apiClient.patch('/tenant/branding', data),

  // Ops Cockpit (Priority 8)
  getOpsQueues: () => apiClient.get('/admin/ops-cockpit/queues'),
  getOpsTimeline: (params) => apiClient.get('/admin/ops-cockpit/timeline', { params }),
};
