import BaseToolScreenHandler from './BaseToolScreenHandler';

class BaseTool {
  constructor(canvas) {
    this.canvas = canvas;
    this.isMouseDown = false;
    this.toolState = null;
    this.stateHandler = null;
    this.screenHandlerValue = null;
  }

  static get name() {
    throw new Error('Method is not implemented');
  }

  get optionsElement() { // eslint-disable-line class-methods-use-this
    throw new Error('Method is not implemented');
  }

  get screenHandler() {
    if (this.screenHandlerValue == null) {
      this.screenHandlerValue = new BaseToolScreenHandler(this.toolState, this.stateHandler);
    }

    return this.screenHandlerValue;
  }
}

export default BaseTool;
