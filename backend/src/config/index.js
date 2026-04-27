"use strict";

require("dotenv").config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  socketPath: process.env.SOCKET_PATH || "/socket.io",
};
