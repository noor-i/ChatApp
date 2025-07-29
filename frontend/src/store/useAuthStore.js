// Zustand store for managing authentication state in the app.
// Tracks user info, loading states, and provides a function to check authentication status with the backend.
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null, // at first we don't know if user is authenticated or not
  isSigningUp: false, // loading state for signup
  isLoggingIn: false, // loading state for login
  isUpdatingProfile: false, // loading state for updating profile
  isCheckingAuth: true, // loading state for checking if user is authenticated

  checkAuth: async () => {
    try {
      // We already provided the base url in the axios instance baseURL field (axios.js)
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {},
}));
