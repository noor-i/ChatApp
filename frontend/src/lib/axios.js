// Import the axios library for making HTTP requests
import axios from "axios";

// Create a pre-configured axios instance with a base URL and credentials enabled
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "/api", // URL for all API requests
  withCredentials: true, // Send cookies with requests (for authentication)
});
