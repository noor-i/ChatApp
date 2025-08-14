import { Server } from "socket.io";
import http from "http";
import express from "express";

// Create an Express app for handling HTTP requests
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.io server attached to the HTTP server
// This enables real-time communication (web sockets)
// CORS allows connections from your frontend (localhost:5173)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// Listen for new socket connections from clients
io.on("connection", (socket) => {
  // This runs every time a client connects via Socket.io
  console.log("A user connected", socket.id);

  // Listen for when the client disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

// Export the Express app, HTTP server, and Socket.io server for use elsewhere
export { app, server, io };
