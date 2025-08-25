// Zustand store for managing authentication state in the app.
// Tracks user info, loading states, and provides a function to check authentication status with the backend.
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null, // at first we don't know if user is authenticated or not
  isSigningUp: false, // loading state for signup
  isLoggingIn: false, // loading state for login
  isUpdatingProfile: false, // loading state for updating profile
  isCheckingAuth: true, // loading state for checking if user is authenticated
  onlineUsers: [], // getting all currently logged in users via web sockets
  socket: null,

  checkAuth: async () => {
    try {
      // We already provided the base url in the axios instance baseURL field (axios.js)
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully.");

      get().connectSocket();
    } catch (error) {
      console.log("Error in signup.");
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully.");

      get().connectSocket();
    } catch (error) {
      console.log("Error in logging in.");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully.");
      get().disconnectSocket();
    } catch (error) {
      console.log("Error in logging out");
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated sucessfully.");
    } catch (error) {
      console.log("Error in profile update:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    // Get the current authenticated user from the store
    const { authUser } = get();
    // If there is no authenticated user or the socket is already connected, do nothing
    if (!authUser || get().socket?.connected) return;

    // Create a new Socket.io connection to the backend server
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    set({ socket: socket });

    // Explicitly connect the socket
    socket.connect();

    // Listen for "getOnlineUsers" events emitted from backend io.emit()
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    //Check if connected, only then disconnect
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
