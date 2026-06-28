import { create } from 'zustand';
import type { AuthUser } from '@/types';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
  setTokens: (token: string, refreshToken: string) => void;
  clearError: () => void;
}

const ADMIN_CREDENTIALS = { username: 'admin', password: 'olma93' };

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: API chaqiruvni qo'shish
      // const response = await authApi.login(username, password);
      // set({ user: response.user, token: response.token, refreshToken: response.refreshToken, isAuthenticated: true });

      if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
        throw new Error('Login yoki parol noto\'g\'ri');
      }

      const mockUser: AuthUser = {
        id: '1',
        email: 'admin@condor.uz',
        name: 'Administrator',
        role: 'admin',
        created_at: new Date().toISOString(),
      };

      set({
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login xatosi' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ 
      user: null, 
      token: null, 
      refreshToken: null, 
      isAuthenticated: false,
      error: null,
    });
  },

  setUser: (user: AuthUser | null) => {
    set({ user, isAuthenticated: !!user });
  },

  setTokens: (token: string, refreshToken: string) => {
    set({ token, refreshToken });
  },

  clearError: () => {
    set({ error: null });
  },
}));
