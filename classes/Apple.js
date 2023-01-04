class Apple {
  constructor(ctx, head) {
    this.ctx = ctx;
    this.position = this.drawPosition();
    this.size = 10;
    this.lifeTime =
      (Math.sqrt(Math.pow(head.position.x - this.position.x, 2)) +
        Math.sqrt(Math.pow(head.position.y - this.position.y, 2))) /
        12 +
      3;
    this.drawApple();
  }

  drawPosition() {
    //zmodyfikować tak byy jabłka nie generowały się w koordynatach węża
    let min = Math.ceil(1);
    let max = Math.floor(23);
    const x = (Math.floor(Math.random() * (max - min + 1)) + min) * 12;
    const y = (Math.floor(Math.random() * (max - min + 1)) + min) * 12;
    return { x, y };
  }

  drawApple() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
