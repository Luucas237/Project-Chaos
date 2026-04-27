"use strict";

require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const config = require("./config");
const routes = require("./routes");
const { registerSocketHandlers } = require("./socket");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  path: config.socketPath,
  cors: {
    origin: config.clientOrigin,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: config.clientOrigin }));
app.use(express.json());

app.use("/api", routes);

registerSocketHandlers(io);

if (require.main === module) {
  httpServer.listen(config.port, () => {
    console.log(`[Server] Project Chaos running on http://localhost:${config.port}`);
    console.log(`[Server] Environment: ${config.nodeEnv}`);
  });
}

module.exports = { app, httpServer, io };
