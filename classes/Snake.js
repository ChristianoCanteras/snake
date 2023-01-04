class Snake {
  constructor(ctx) {
    this.ctx = ctx;
    this.pixelsMatrix = [];
    this.direction = "left";
    this.prevPosition = null;
    this.isDead = false;
    this.startSnake();
  }

  startSnake() {
    this.pixelsMatrix.push(new Pixel(this.ctx, 144, 144));
    this.pixelsMatrix[this.pixelsMatrix.length - 1].drawPixel(
      "rgba(150, 150, 150, 1)"
    );
    this.pixelsMatrix.push(
      new Pixel(
        this.ctx,
        this.pixelsMatrix[this.pixelsMatrix.length - 1].returnPosition().x + 12,
        this.pixelsMatrix[this.pixelsMatrix.length - 1].returnPosition().y
      )
    );
    this.pixelsMatrix[this.pixelsMatrix.length - 1].drawPixel();
    this.pixelsMatrix.push(
      new Pixel(
        this.ctx,
        this.pixelsMatrix[this.pixelsMatrix.length - 1].returnPosition().x + 12,
        this.pixelsMatrix[this.pixelsMatrix.length - 1].returnPosition().y
      )
    );
    this.pixelsMatrix[this.pixelsMatrix.length - 1].drawPixel();
    this.pixelsMatrix.push(
      new Pixel(
        this.ctx,
        this.pixelsMatrix[this.pixelsMatrix.length - 1].returnPosition().x + 12,
        this.pixelsMatrix[this.pixelsMatrix.length - 1].returnPosition().y
      )
    );
    this.pixelsMatrix[this.pixelsMatrix.length - 1].drawPixel();
  }

  addPixel(positions) {
    const last = this.pixelsMatrix[this.pixelsMatrix.length - 1].position;
    const beforeLast = this.pixelsMatrix[this.pixelsMatrix.length - 2].position;

    if (beforeLast.x > last.x && beforeLast.y === last.y) {
      this.pixelsMatrix.push(
        new Pixel(this.ctx, positions.x - 12, positions.y)
      );
    }
    if (beforeLast.x < last.x && beforeLast.y === last.y) {
      this.pixelsMatrix.push(
        new Pixel(this.ctx, positions.x + 12, positions.y)
      );
    }
    if (beforeLast.x === last.x && beforeLast.y > last.y) {
      this.pixelsMatrix.push(
        new Pixel(this.ctx, positions.x, positions.y - 12)
      );
    }
    if (beforeLast.x === last.x && beforeLast.y < last.y) {
      this.pixelsMatrix.push(
        new Pixel(this.ctx, positions.x, positions.y + 12)
      );
    }

    this.pixelsMatrix[this.pixelsMatrix.length - 1].drawPixel();
  }

  checkColision() {
    const { x, y } = this.pixelsMatrix[0].position;

    if (276 < x || x < 0 || y < 0 || 276 < y) {
      this.isDead = true;
      return null;
    }

    for (let i = 1; i < this.pixelsMatrix.length - 1; i++) {
      if (
        this.pixelsMatrix[i].position.x === x &&
        this.pixelsMatrix[i].position.y === y
      ) {
        this.isDead = true;
      }
    }
  }

  eatApple(position) {
    if (
      this.pixelsMatrix[0].position.x === position.x &&
      this.pixelsMatrix[0].position.y === position.y
    ) {
      this.tailPosition = this.addPixel(this.tailPosition);
      return true;
    }
  }

  moveSnake() {
    this.pixelMatrix = this.pixelsMatrix.map((pixel, index) => {
      if (index === 0) {
        //sprawdzenie czy pixel jest pierwszy, ruch zgodnie z direction, szary kolor
        this.prevPosition = { ...pixel.position };
        pixel.moveHaed(
          this.direction,
          pixel.position,
          this.pixelsMatrix[1].position
        );
        this.checkColision();
        pixel.drawPixel("rgba(150, 150, 150, 1)");
      } else {
        const nextposition = { ...this.prevPosition };
        this.prevPosition = { ...pixel.position };
        pixel.moveTail(nextposition);
        pixel.drawPixel();
      }

      this.tailPosition =
        this.pixelsMatrix[this.pixelsMatrix.length - 1].returnPosition();
    });
  }
}
