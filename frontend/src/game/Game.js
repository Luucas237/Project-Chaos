export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.players = [];
    this.running = false;
    this._animFrame = null;
  }

  start() {
    this.running = true;
    this._loop();
  }

  stop() {
    this.running = false;
    if (this._animFrame) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
    this._clearCanvas();
  }

  updatePlayers(players) {
    this.players = players;
  }

  _loop() {
    if (!this.running) return;
    this._render();
    this._animFrame = requestAnimationFrame(() => this._loop());
  }

  _clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _render() {
    const { ctx, canvas } = this;
    this._clearCanvas();

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e94560";
    ctx.font = "bold 16px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";

    if (this.players.length < 2) {
      ctx.fillStyle = "#888";
      ctx.fillText("Waiting for players…", canvas.width / 2, canvas.height / 2);
    } else {
      this.players.forEach((id, index) => {
        const x = 100 + index * 200;
        const y = canvas.height / 2;
        ctx.fillStyle = "#e94560";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#eaeaea";
        ctx.fillText(`P${index + 1}`, x, y + 5);
      });
    }
  }
}
