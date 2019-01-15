import ToolStateHandler from '../ToolStateHandler';

class ZoomToolStateHandler extends ToolStateHandler {
  changeViewState(toolState) {
    this.canvas.viewState.changeZoom(toolState.calculateZoom());
  }
}

export default ZoomToolStateHandler;
