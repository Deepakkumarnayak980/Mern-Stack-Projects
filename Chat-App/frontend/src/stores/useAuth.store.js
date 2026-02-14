import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

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
      const res = await axiosInstance.get("/auth/check");
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
      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data });
      toast.success("Account created successfully");

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
 //LoginPage
   login: async (data) => {
      set({ isLoggingIn: true });
      try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Logged in successfully");
  
        get().connectSocket();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isLoggingIn: false });
      }
    },
//logout
    logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
}));
