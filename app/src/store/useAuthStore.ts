import { create } from "zustand";
import api from "../api/axios";
import type {
  AuthState,
  LoginCredentials,
  User,
  RegisterCredentials,
} from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  // Check if user is logged in on page reload
  checkAuth: async () => {
    try {
      const response = await api.get<User>("/api/user");
      set({ user: response.data, isAuthenticated: true, loading: false });
    } catch (e) {
      set({ user: null, isAuthenticated: false, loading: false });
      console.error(e);
    }
  },

  register: async (credentials: RegisterCredentials) => {
    await api.get("/sanctum/csrf-cookie");

    // Create user in Laravel backend
    await api.post("/api/register", credentials);

    // Fetch created user session
    const response = await api.get<User>("/api/user");

    set({ user: response.data, isAuthenticated: true });
    return response.data;
  },

  // Login action
  login: async (credentials: LoginCredentials) => {
    // 1. Get CSRF Cookie
    await api.get("/sanctum/csrf-cookie");
    // 2. Perform Login
    await api.post("/api/login", credentials);
    // 3. Fetch User
    const response = await api.get<User>("/api/user");
    set({ user: response.data, isAuthenticated: true });
    return response.data;
  },

  // Logout action
  logout: async () => {
    await api.post("/api/logout");
    set({ user: null, isAuthenticated: false });
  },
}));
