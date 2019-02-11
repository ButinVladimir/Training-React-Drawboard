import BaseToolScreenHandler from './BaseToolScreenHandler';

class BaseTool {
  constructor(canvas, toolState, stateHandler) {
    this.canvas = canvas;
    this.toolState = toolState;
    this.stateHandler = stateHandler;
    this.screenHandler = new BaseToolScreenHandler(this.toolState, this.stateHandler);
    this.isMouseDown = false;
  }

  static get name() {
    throw new Error('Method is not implemented');
  }

  get optionsElement() { // eslint-disable-line class-methods-use-this
    throw new Error('Method is not implemented');
  }

  onSelect() {
    this.canvas.clearBuffer();
    this.canvas.show();
  }

  serializeState() {
    return this.toolState.serialize();
  }

  deserializeState(stateObj) { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }
}

export default BaseTool;
