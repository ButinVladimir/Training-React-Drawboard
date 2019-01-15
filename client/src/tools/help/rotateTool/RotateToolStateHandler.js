import ToolStateHandler from '../ToolStateHandler';

class RotateToolStateHandler extends ToolStateHandler {
  changeViewState(toolState) {
    this.canvas.viewState.changeRotation(toolState.calculateRotation());
  }
}

export default RotateToolStateHandler;
