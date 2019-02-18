import BaseToolStateHandler from '../BaseToolStateHandler';

class HelpToolStateHandler extends BaseToolStateHandler {
  onMouseMove(toolState) {
    this.applyState(null, null, toolState);
  }

  onMouseUp(toolState) { // eslint-disable-line class-methods-use-this
    toolState.onMouseUp();

    return null;
  }

  applyState(canvasContext, viewState, toolState) {
    this.canvas.hide();
    this.changeViewState(toolState);
    this.canvas.show();
  }

  changeViewState(toolState) { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }

  restore(toolState) {
    toolState.restore();
    this.applyState(null, null, toolState);
  }
}

export default HelpToolStateHandler;
