import ToolStateHandler from '../ToolStateHandler';

class MoveToolStateHandler extends ToolStateHandler {
  changeViewState(toolState) {
    this.canvas.viewState.changeDelta(toolState.calculateDeltaX(), toolState.calculateDeltaY());
  }
}

export default MoveToolStateHandler;
