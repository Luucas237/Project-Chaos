"use strict";

const GameManager = require("../src/game/GameManager");

describe("GameManager", () => {
  let manager;

  beforeEach(() => {
    manager = new GameManager();
  });

  describe("createRoom", () => {
    it("should create a new room with 'waiting' state", () => {
      const room = manager.createRoom("room1");
      expect(room.id).toBe("room1");
      expect(room.state).toBe("waiting");
      expect(room.players.size).toBe(0);
    });

    it("should return the existing room if called again with the same id", () => {
      const r1 = manager.createRoom("room1");
      const r2 = manager.createRoom("room1");
      expect(r1).toBe(r2);
    });
  });

  describe("joinRoom", () => {
    it("should add a player to the room", () => {
      manager.joinRoom("room1", { id: "p1" });
      expect(manager.getPlayerCount("room1")).toBe(1);
    });

    it("should transition to 'playing' when 2 players join", () => {
      manager.joinRoom("room1", { id: "p1" });
      const room = manager.joinRoom("room1", { id: "p2" });
      expect(room.state).toBe("playing");
    });
  });

  describe("leaveRoom", () => {
    it("should remove the room when the last player leaves", () => {
      manager.joinRoom("room1", { id: "p1" });
      const result = manager.leaveRoom("room1", "p1");
      expect(result).toBeNull();
      expect(manager.getRoomState("room1")).toBeNull();
    });

    it("should return null for a non-existent room", () => {
      expect(manager.leaveRoom("ghost", "p1")).toBeNull();
    });

    it("should reset state to 'waiting' when a player leaves a playing room", () => {
      manager.joinRoom("room1", { id: "p1" });
      manager.joinRoom("room1", { id: "p2" });
      const room = manager.leaveRoom("room1", "p1");
      expect(room.state).toBe("waiting");
    });
  });

  describe("getRoomState", () => {
    it("should return null for unknown rooms", () => {
      expect(manager.getRoomState("unknown")).toBeNull();
    });
  });
});
