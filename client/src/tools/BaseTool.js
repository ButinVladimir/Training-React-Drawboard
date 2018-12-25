class BaseTool {
  constructor(canvas) {
    this.canvas = canvas;
    this.isMouseDown = false;
  }

  static get name() {
    throw new Error('Method is not implemented');
  }

  get optionsElement() { // eslint-disable-line class-methods-use-this
    throw new Error('Method is not implemented');
  }

  onMouseDown() {
    this.isMouseDown = true;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onMouseMove(event) { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }
}

export default BaseTool;
