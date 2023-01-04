class GamePad {
  constructor(f) {
    functionRefence = f;
    this.gamePad = document.querySelectorAll(".game-pad button");
    this.listenButtons();
  }

  handleclick = (event) => {
    this.functionRefence(event.target.dataset.direction);
  };

  listenButtons() {
    for (button of this.buttons) {
      button.addEventListener("click", this.handelhandleclick);
      console.log(button);
    }
  }
}
