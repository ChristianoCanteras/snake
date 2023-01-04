class Game {
  constructor(ctx, scoreDisplay) {
    this.ctx = ctx;
    this.pixelSize = 10;
    this.score = 0;
    this.gameScoreDisplay = scoreDisplay;
    this.speedUp = true;
    this.snake = new Snake(this.ctx);
    this.apple = new Apple(this.ctx, this.snake.pixelsMatrix[0]);
    this.gamePad = document.querySelectorAll(".game-pad button");
    this.intervalIndex = null;
    this.gameSpeed = 300;
    this.keyboardAccess = true;
    this.gameOver = false;
    this.listenerKeyboard();
    this.listenButtons();
    this.playGame();
  }

  playGame() {
    if (this.speedUp) {
      this.speedUp = false;

      this.intervalIndex = setInterval(() => {
        this.ctx.clearRect(0, 0, 300, 300);

        this.snake.moveSnake();
        this.keyboardAccess = true;
        if (this.snake.isDead) {
          clearInterval(this.intervalIndex);
          this.gameOver = true;
          return null;
        }

        if (this.apple.lifeTime < 0) {
          this.apple = new Apple(this.ctx, this.snake.pixelsMatrix[0]);
        } else {
          this.apple.lifeTime--;
        }

        if (this.snake.eatApple(this.apple.position)) {
          this.apple = new Apple(this.ctx, this.snake.pixelsMatrix[0]);
          this.gameSpeed =
            this.gameSpeed < 200 ? this.gameSpeed - 5 : this.gameSpeed - 10;
          this.score += 10;
          this.gameScoreDisplay.innerText = this.score;
          this.speedUp = true;
          clearInterval(this.intervalIndex);
          this.playGame();
        }

        this.apple.drawApple();
      }, this.gameSpeed);
    }
  }

  handleClick = (e) => {
    e.preventDefault();

    if (this.keyboardAccess) {
      this.keyboardAccess = false;

      switch (e.target.dataset.direction || e.keyCode.toString()) {
        case "38":
          if (this.snake.direction !== "down") this.snake.direction = "up";
          break;
        case "37":
          if (this.snake.direction !== "right") this.snake.direction = "left";
          break;
        case "40":
          if (this.snake.direction !== "up") this.snake.direction = "down";
          break;
        case "39":
          if (this.snake.direction !== "left") this.snake.direction = "right";
          break;
      }
    }
  };

  listenerKeyboard() {
    document.addEventListener("keydown", this.handleClick);
  }

  listenButtons() {
    for (let button of this.gamePad) {
      button.addEventListener("click", this.handleClick);
    }
  }

  resetGame() {
    clearInterval(this.intervalIndex);
  }
}
