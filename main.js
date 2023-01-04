const resetGameButton = document.getElementById("game-reset");
const startGameButton = document.getElementById("game-start");
const gameScoreDisplay = document.getElementById("game-score__points");

function createArea(selector = "playArea", width = 288, height = 288) {
  const area = document.createElement("canvas");
  area.setAttribute("width", `${width}px;`);
  area.setAttribute("height", `${height}px;`);
  document.getElementById(selector).appendChild(area);
  const ctx = document.querySelector("#playArea canvas").getContext("2d");
  ctx.fillStyle = "rgb(100, 100, 100)";
  ctx.fillRect(0, 0, width, height);
  return ctx;
}

const ctx = createArea();

startGameButton.addEventListener("click", (event) => {
  event.target.style.display = "none";
  game = new Game(ctx, gameScoreDisplay);
});

resetGameButton.addEventListener("click", function () {
  if (game.gameOver) {
    game.resetGame();
    ctx.clearRect(0, 0, 300, 300);
    game = new Game(ctx, gameScoreDisplay);
  }
});
