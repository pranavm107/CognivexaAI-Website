import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v1';

const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to standardize data access
publicApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data || error.message);
  }
);

export const inquiryService = {
  submit: (formData) => publicApi.post('/public/inquiries', formData),
};

export const bookingService = {
  getAvailability: (params) => publicApi.get('/public/bookings/availability', { params }),
  create: (bookingData) => publicApi.post('/public/bookings', bookingData),
};

export const cmsService = {
  getServices: () => publicApi.get('/public/services'),
  getPortfolio: () => publicApi.get('/public/portfolio'),
  getTeams: () => publicApi.get('/specialized-teams?active=true'),
  getConceptProjects: () => publicApi.get('/concept-projects?active=true'),
  getContent: (slug) => publicApi.get(`/public/content/${slug}`),
  getSEO: (slug) => publicApi.get(`/public/seo/${slug}`),
  getFAQs: () => publicApi.get('/public/faqs'),
  getProcessSteps: (type) => publicApi.get(`/public/process-steps${type ? `?type=${type}` : ''}`),
  getFeatures: (category) => publicApi.get(`/public/features${category ? `?category=${category}` : ''}`),
};

export default publicApi;
