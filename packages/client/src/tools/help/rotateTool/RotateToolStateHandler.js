import HelpToolStateHandler from '../HelpToolStateHandler';

class RotateToolStateHandler extends HelpToolStateHandler {
  changeViewState(toolState) {
    this.canvas.viewState.changeRotation(toolState.calculateRotation());
  }
}

export default RotateToolStateHandler;
