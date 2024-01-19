const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let gameState = ["", "", "", "", "", "", "", "", ""];

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the initial game state to the newly connected client
  socket.emit("updateGameState", gameState);

  // Listen for moves from clients
  socket.on("makeMove", ({ move, count }) => {
    // Update the game state with the move
    gameState = move;

    // Broadcast the updated game state to all connected clients
    io.emit("updateGameState", gameState);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
