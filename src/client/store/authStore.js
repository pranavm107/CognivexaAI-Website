import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v1';

export const useClientAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      client: null,
      tokens: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const response = await axios.post(`${API_URL}/client/auth/login`, { email, password });
          const { user, client, tokens } = response.data.data;
          set({ user, client, tokens, isAuthenticated: true });
          return response.data;
        } catch (error) {
          throw error.response?.data || error.message;
        }
      },

      register: async (data) => {
        try {
          const response = await axios.post(`${API_URL}/client/auth/register`, data);
          const { user, client, tokens } = response.data.data;
          set({ user, client, tokens, isAuthenticated: true });
          return response.data;
        } catch (error) {
          throw error.response?.data || error.message;
        }
      },

      logout: () => {
        set({ user: null, client: null, tokens: null, isAuthenticated: false });
        localStorage.removeItem('client-auth-storage');
      },

      updateUser: (userData) => {
        set((state) => ({ user: { ...state.user, ...userData } }));
      },

      setTokens: (tokens) => {
        set({ tokens });
      },
    }),
    {
      name: 'client-auth-storage',
    }
  )
);
