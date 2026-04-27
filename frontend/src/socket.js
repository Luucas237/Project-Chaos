import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "";

const socket = io(SERVER_URL, {
  path: "/socket.io",
  autoConnect: false,
  reconnectionAttempts: 5,
});

export default socket;
