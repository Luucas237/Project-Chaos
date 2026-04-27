"use strict";

const GameManager = require("../game/GameManager");

const gameManager = new GameManager();

function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log(`[Socket] Player connected: ${socket.id}`);

    socket.on("join_room", ({ roomId }) => {
      const player = { id: socket.id };
      const room = gameManager.joinRoom(roomId, player);
      socket.join(roomId);
      io.to(roomId).emit("room_update", {
        roomId,
        players: Array.from(room.players.keys()),
        state: room.state,
      });
      console.log(`[Socket] ${socket.id} joined room ${roomId}`);
    });

    socket.on("game_action", ({ roomId, action }) => {
      socket.to(roomId).emit("game_action", { playerId: socket.id, action });
    });

    socket.on("leave_room", ({ roomId }) => {
      const room = gameManager.leaveRoom(roomId, socket.id);
      socket.leave(roomId);
      if (room) {
        io.to(roomId).emit("room_update", {
          roomId,
          players: Array.from(room.players.keys()),
          state: room.state,
        });
      }
    });

    socket.on("disconnecting", () => {
      socket.rooms.forEach((roomId) => {
        if (roomId !== socket.id) {
          gameManager.leaveRoom(roomId, socket.id);
          const room = gameManager.getRoomState(roomId);
          if (room) {
            io.to(roomId).emit("room_update", {
              roomId,
              players: Array.from(room.players.keys()),
              state: room.state,
            });
          }
        }
      });
    });

    socket.on("disconnect", () => {
      console.log(`[Socket] Player disconnected: ${socket.id}`);
    });
  });
}

module.exports = { registerSocketHandlers, gameManager };
