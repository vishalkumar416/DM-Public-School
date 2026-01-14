import { create } from 'zustand';
import api from '../utils/api';

const useAuthStore = create((set) => ({
  admin: null,
  isAuthenticated: false,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      console.log('🔐 Attempting login...', { email, password: password ? '***' : 'missing' });
      const response = await api.post('/auth/login', { email, password });
      console.log('✅ Login response:', response.data);
      
      if (response.data.success && response.data.token && response.data.admin) {
        const { token, admin } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('admin', JSON.stringify(admin));
        
        set({ admin, isAuthenticated: true, loading: false });
        return { success: true };
      } else {
        console.error('❌ Invalid response structure:', response.data);
        set({ loading: false });
        return {
          success: false,
          message: response.data?.message || 'Invalid response from server',
        };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('   Response:', error.response?.data);
      console.error('   Status:', error.response?.status);
      set({ loading: false });
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed',
      };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      set({ admin: null, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    const adminStr = localStorage.getItem('admin');
    
    if (!token || !adminStr) {
      set({ admin: null, isAuthenticated: false, loading: false });
      return false;
    }

    try {
      const admin = JSON.parse(adminStr);
      // Set admin immediately from localStorage for faster UI
      set({ admin, isAuthenticated: true, loading: false });
      
      // Skip server verification to avoid network errors blocking UI
      // Token will be verified on actual API calls that require auth
      return true;
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      set({ admin: null, isAuthenticated: false, loading: false });
      return false;
    }
  },
}));

export default useAuthStore;





