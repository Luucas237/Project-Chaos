"use strict";

const express = require("express");
const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.get("/info", (_req, res) => {
  res.json({
    name: "Project Chaos",
    version: "1.0.0",
    description: "Online multiplayer game server",
  });
});

module.exports = router;
