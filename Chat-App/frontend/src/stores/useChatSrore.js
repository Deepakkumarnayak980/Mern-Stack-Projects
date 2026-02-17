import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // ================= GET USERS =================
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users"); // ✅ FIXED
      set({ users: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load users"
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ================= GET MESSAGES =================
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`); // ✅ FIXED
      set({ messages: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load messages"
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));
