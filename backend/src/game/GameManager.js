"use strict";

class GameManager {
  constructor() {
    this.rooms = new Map();
  }

  createRoom(roomId) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, { id: roomId, players: new Map(), state: "waiting" });
    }
    return this.rooms.get(roomId);
  }

  joinRoom(roomId, player) {
    const room = this.createRoom(roomId);
    room.players.set(player.id, player);
    if (room.players.size >= 2 && room.state === "waiting") {
      room.state = "playing";
    }
    return room;
  }

  leaveRoom(roomId, playerId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    room.players.delete(playerId);
    if (room.players.size === 0) {
      this.rooms.delete(roomId);
      return null;
    }
    if (room.state === "playing") {
      room.state = "waiting";
    }
    return room;
  }

  getRoomState(roomId) {
    return this.rooms.get(roomId) || null;
  }

  getPlayerCount(roomId) {
    const room = this.rooms.get(roomId);
    return room ? room.players.size : 0;
  }
}

module.exports = GameManager;
