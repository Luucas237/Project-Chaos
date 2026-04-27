# Project-Chaos

An online multiplayer game powered by a real-time live server, playable across multiple computers on a network.

## Project Structure

```
Project-Chaos/
├── backend/       # Node.js + Express + Socket.IO game server
├── frontend/      # Vite-based web game client (HTML/CSS/JS + Socket.IO)
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- (Optional) [Docker](https://www.docker.com/) & Docker Compose for containerised deployment

---

### 1 – Backend

```bash
cd backend
cp .env.example .env          # configure your environment variables
npm install
npm run dev                   # starts the server with hot-reload
```

The game server listens on **http://localhost:3000** by default.

### 2 – Frontend

```bash
cd frontend
cp .env.example .env          # set VITE_SERVER_URL if needed
npm install
npm run dev                   # starts the Vite dev server
```

Open the URL shown in the terminal (usually **http://localhost:5173**) in your browser.

---

## Multiplayer / Second Computer

1. Start the backend on the **host** machine.
2. Find the host's local IP address (`ipconfig` / `ip a`).
3. On the **second computer**, open a browser and navigate to  
   `http://<HOST_IP>:5173` (frontend) — the client will automatically connect to the backend via Socket.IO.
4. Make sure your firewall allows connections on ports **3000** and **5173**.

For production or cross-network play, deploy using **Docker Compose**:

```bash
docker compose up --build
```

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Backend  | Node.js, Express, Socket.IO       |
| Frontend | Vite, Vanilla JS, Socket.IO-client|
| DevOps   | Docker, Docker Compose            |

## License

MIT