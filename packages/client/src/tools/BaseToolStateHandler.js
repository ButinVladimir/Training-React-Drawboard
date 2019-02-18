class BaseToolStateHandler {
  constructor(canvas) {
    this.canvas = canvas;
  }

  onMouseDown(toolState, event) { // eslint-disable-line class-methods-use-this
    toolState.onMouseDown(event);
  }

  onMouseMove(toolState) { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }

  onMouseUp(toolState) { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }

  applyState(canvasContext, viewState, toolState) { // eslint-disable-line class-methods-use-this,no-unused-vars,max-len
    throw new Error('Method is not implemented');
  }
}

export default BaseToolStateHandler;
