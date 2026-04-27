import socket from "./socket.js";
import Game from "./game/Game.js";

const lobbyScreen = document.getElementById("lobby");
const gameRoomScreen = document.getElementById("game-room");
const roomIdInput = document.getElementById("room-id");
const joinBtn = document.getElementById("join-btn");
const leaveBtn = document.getElementById("leave-btn");
const statusEl = document.getElementById("status");
const roomNameEl = document.getElementById("room-name");
const playerCountEl = document.getElementById("player-count");
const gameStateEl = document.getElementById("game-state");
const canvas = document.getElementById("game-canvas");

const game = new Game(canvas);
let currentRoom = null;

function showScreen(name) {
  lobbyScreen.classList.toggle("active", name === "lobby");
  gameRoomScreen.classList.toggle("active", name === "game-room");
}

function setStatus(msg) {
  statusEl.textContent = msg;
}

joinBtn.addEventListener("click", () => {
  const roomId = roomIdInput.value.trim();
  if (!roomId) {
    setStatus("Please enter a room ID.");
    return;
  }
  setStatus("Connecting…");
  socket.connect();
  socket.emit("join_room", { roomId });
  currentRoom = roomId;
});

leaveBtn.addEventListener("click", () => {
  if (currentRoom) {
    socket.emit("leave_room", { roomId: currentRoom });
    game.stop();
    currentRoom = null;
    showScreen("lobby");
    setStatus("");
  }
});

socket.on("connect", () => {
  setStatus("Connected.");
});

socket.on("disconnect", () => {
  setStatus("Disconnected from server.");
  game.stop();
  showScreen("lobby");
});

socket.on("room_update", ({ roomId, players, state }) => {
  roomNameEl.textContent = roomId;
  playerCountEl.textContent = players.length;
  gameStateEl.textContent = state;
  game.updatePlayers(players);

  if (!gameRoomScreen.classList.contains("active")) {
    showScreen("game-room");
    game.start();
  }
});

socket.on("connect_error", (err) => {
  setStatus(`Connection error: ${err.message}`);
});
