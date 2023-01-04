class Pixel {
  constructor(ctx, x, y, size = 10, gap = 2) {
    this.ctx = ctx;
    this.size = size;
    this.gap = gap;
    this.position = { x: x, y: y };
  }
  drawPixel(color = "rgba(50, 50, 50, 1)") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  moveHaed(direction) {
    switch (direction) {
      case "up":
        this.position.y -= 12;
        break;
      case "left":
        this.position.x -= 12;
        break;
      case "down":
        this.position.y += 12;
        break;
      case "right":
        this.position.x += 12;
        break;
    }
  }

  moveTail(prevPosition) {
    this.position.x = prevPosition.x;
    this.position.y = prevPosition.y;
  }

  returnPosition() {
    return this.position;
  }
}
