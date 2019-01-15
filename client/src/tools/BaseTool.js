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

  onSelect() {
    this.canvas.clearBuffer();
    this.canvas.show();
  }

  serializeState() {
    return this.toolState.serialize();
  }

  unserializeState(stateObj) { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }
}

export default BaseTool;
