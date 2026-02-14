import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // ✅ Check Auth
  checkAuth: async () => {
    try {
      const res = await axiosInstanace.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      if (error.response?.status === 401) {
        set({ authUser: null });
      } else {
        console.error("Unexpected error in checkAuth:", error);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //  Signup INSIDE store
  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstanace.post("/auth/signup", data);

      set({ authUser: res.data });
      toast.success("Account created successfully");

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
