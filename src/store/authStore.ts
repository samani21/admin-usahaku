import { create } from "zustand";
import axios from "axios";

// Sesuaikan dengan URL backend Lumen kamu
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  is_active: number;
  whatsapp?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  register: (data: any) => Promise<boolean>;
  verifyOtp: (data: any) => Promise<boolean>;
  resendOtp: (data: any) => Promise<boolean>;
  forgotPassword: (data: any) => Promise<boolean>;
  checkForgotPassword: (data: any) => Promise<boolean>;
  resetPassword: (data: any) => Promise<boolean>;
  login: (data: any) => Promise<boolean>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    set({ token });
  },

  register: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/auth/register`, data);
      const { token, user } = res.data;
      set({ token, user, loading: false });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (err: any) {
      const error = err.response?.data?.email ? "Email telah digunakan" :
        err.response?.data?.whatsapp ? "No Whatsapp telah digunakan" :
          err.response?.data?.password ? "Password minimal 6 huruf" : "Gagal register"
      set({ loading: false, error: error });
      return false;
    }

  },

  verifyOtp: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/auth/verify-otp`, data);
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.is_active = 1; // ubah status aktif

        // Simpan kembali ke localStorage
        localStorage.setItem("user", JSON.stringify(user));
      }

      set({ loading: false });
      return true;
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.message || "Gagal verifikasi",
      });
      return false;
    }
  },

  resendOtp: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/auth/resend-otp`, data);
      return true;
    } catch (err: any) {
      set({ loading: false, error: err.response?.data?.message || "Gagal verifikasi" });
      return false;
    }
  },

  login: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/auth/login`, data);
      const { token, user } = res.data;
      set({ token, user, loading: false });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return true;
    } catch (err: any) {
      console.log('err', err)
      set({ loading: false, error: err.response?.data?.message || err.response?.data?.error || "Gagal login" });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    set({ token: null, user: null });
  },

  fetchProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.get(`${API_URL}/auth/profile`);
      set({ user: res.data.user });
    } catch {
      set({ user: null });
    }
  },

  forgotPassword: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/auth/forgot-password`, data);
      set({ loading: false, error: null });
      return true;
    } catch (err: any) {
      set({ loading: false, error: err.response?.data?.message || "Gagal verifikasi" });
      return false;
    }
  },

  checkForgotPassword: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`${API_URL}/auth/check-forgot-password?token=` + data);
      set({ loading: false, error: null });
      return true;
    } catch (err: any) {
      set({ loading: false, error: err.response?.data?.message || "Gagal verifikasi" });
      return false;
    }
  },
  resetPassword: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/auth/reset-password`, data);
      set({ loading: false, error: null });
      return true;
    } catch (err: any) {
      set({ loading: false, error: err.response?.data?.message || "Gagal verifikasi" });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));


export const getToken = () => {
  try {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem("token");
      return jsonValue ? jsonValue : null;
    }
    return null;
  } catch (e) {
    console.error("Error parsing token:", e);
    return null;
  }
};

export const getUserInfo = () => {
  try {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem("user");
      return jsonValue ? JSON.parse(jsonValue) : null;
    }
    return null;
  } catch (e) {
    console.error("Error parsing user:", e);
    return null;
  }
};
export const getCustomerInfo = () => {
  try {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem("customer");
      return jsonValue ? JSON.parse(jsonValue) : null;
    }
    return null;
  } catch (e) {
    console.error("Error parsing user:", e);
    return null;
  }
};