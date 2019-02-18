import HelpToolStateHandler from '../HelpToolStateHandler';

class ZoomToolStateHandler extends HelpToolStateHandler {
  changeViewState(toolState) {
    this.canvas.viewState.changeZoom(toolState.calculateZoom());
  }
}

export default ZoomToolStateHandler;
