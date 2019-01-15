import HelpToolStateHandler from '../HelpToolStateHandler';

class MoveToolStateHandler extends HelpToolStateHandler {
  changeViewState(toolState) {
    this.canvas.viewState.changeDelta(toolState.calculateDeltaX(), toolState.calculateDeltaY());
  }
}

export default MoveToolStateHandler;
