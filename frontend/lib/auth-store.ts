"use client";

import { create } from "zustand";

export type UserRole = "STUDENT" | "FACULTY" | "MASTER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("erp_token", token);
      window.localStorage.setItem("erp_user", JSON.stringify(user));
    }
    set({ user, token });
  },
  clearAuth: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("erp_token");
      window.localStorage.removeItem("erp_user");
    }
    set({ user: null, token: null });
  },
}));

