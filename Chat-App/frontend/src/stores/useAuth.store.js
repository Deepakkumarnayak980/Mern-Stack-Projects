import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // 🔹 Check if user is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstanace.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      // 401 = user not logged in (normal case)
      if (error.response?.status === 401) {
        set({ authUser: null });
      } else {
        console.error("Unexpected error in checkAuth:", error);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
