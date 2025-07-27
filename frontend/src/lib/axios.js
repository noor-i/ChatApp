// Import the axios library for making HTTP requests
import axios from "axios";

// Create a pre-configured axios instance with a base URL and credentials enabled
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // Base URL for all API requests
  withCredentials: true, // Send cookies with requests (for authentication)
});
