import ViewState from './ViewState';

export const DEFAULT_WIDTH = 500;
export const DEFAULT_HEIGHT = 500;
export const DEFAULT_CANVAS_COLOR = '#fff';
export const BORDER_COLOR = '#999';
export const BORDER_WIDTH = 3;

class Canvas {
  constructor() {
    this.viewState = new ViewState();
    this.containerPositionX = 0;
    this.containerPositionY = 0;

    this.screenCanvasValue = null;
    this.screenContext = null;

    this.htmlCanvasElement = document.createElement('canvas');
    this.htmlCanvasElement.setAttribute('width', DEFAULT_WIDTH);
    this.htmlCanvasElement.setAttribute('height', DEFAULT_HEIGHT);

    this.htmlCanvasContext = this.htmlCanvasElement.getContext('2d');
    this.htmlCanvasContext.fillStyle = DEFAULT_CANVAS_COLOR;
    this.htmlCanvasContext.fillRect(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);

    this.bufferCanvasElement = document.createElement('canvas');
    this.bufferCanvasElement.setAttribute('width', DEFAULT_WIDTH);
    this.bufferCanvasElement.setAttribute('height', DEFAULT_HEIGHT);
    this.bufferCanvasContext = this.bufferCanvasElement.getContext('2d');
  }

  get screenCanvas() {
    return this.screenCanvasValue;
  }

  set screenCanvas(value) {
    this.screenCanvasValue = value;
    this.screenContext = value.getContext('2d');
  }

  hide() {
    this.viewState.applyTransformations(this.screenContext);

    this.screenContext.clearRect(
      -2 * BORDER_WIDTH, -2 * BORDER_WIDTH,
      DEFAULT_WIDTH + 4 * BORDER_WIDTH,
      DEFAULT_HEIGHT + 4 * BORDER_WIDTH,
    );
  }

  show() {
    this.viewState.applyTransformations(this.screenContext);

    this.screenContext.strokeStyle = BORDER_COLOR;
    this.screenContext.lineWidth = BORDER_WIDTH;
    this.screenContext.strokeRect(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);

    this.screenContext.drawImage(this.htmlCanvasElement, 0, 0);
  }

  showWithBuffer() {
    this.show();
    this.screenContext.drawImage(this.bufferCanvasElement, 0, 0);
  }

  outputCompletely() {
    this.screenContext.resetTransform();
    this.screenContext.clearRect(0, 0, this.screenCanvas.width, this.screenCanvas.height);

    this.show();
  }

  clearBuffer() {
    this.bufferCanvasContext.resetTransform();
    this.bufferCanvasContext.clearRect(
      0,
      0,
      this.bufferCanvasElement.width,
      this.bufferCanvasElement.height,
    );
  }

  updateAndShowBuffer(stateHandler, toolState) {
    this.clearBuffer();
    this.viewState.applyReverseTransformations(this.bufferCanvasContext);
    this.bufferCanvasContext.translate(-this.containerPositionX, -this.containerPositionY);

    stateHandler.applyState(this.bufferCanvasContext, this.viewState, toolState);

    this.showWithBuffer();
  }

  applyState(stateHandler, viewState, toolState) {
    const oldViewState = this.viewState;
    this.viewState = viewState;

    this.viewState.applyReverseTransformations(this.htmlCanvasContext);
    stateHandler.applyState(this.htmlCanvasContext, this.viewState, toolState);

    this.viewState = oldViewState;

    this.showWithBuffer();
  }

  appendBuffer() {
    this.htmlCanvasContext.resetTransform();
    this.htmlCanvasContext.drawImage(this.bufferCanvasElement, 0, 0);
    this.clearBuffer();

    this.show();
  }
}

export default Canvas;
