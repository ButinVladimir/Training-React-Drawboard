export const DEFAULT_DELTA_X = 0.0;
export const DEFAULT_DELTA_Y = 0.0;
export const DEFAULT_ZOOM = 1.0;
export const DEFAULT_ROTATION = 0.0;
export const DEFAULT_WIDTH = 500;
export const DEFAULT_HEIGHT = 500;
export const DEFAULT_CANVAS_COLOR = '#fff';
export const BORDER_COLOR = '#999';
export const BORDER_WIDTH = 3;

class Canvas {
  constructor() {
    this.deltaX = DEFAULT_DELTA_X;
    this.deltaY = DEFAULT_DELTA_Y;
    this.zoom = DEFAULT_ZOOM;
    this.rotation = DEFAULT_ROTATION;

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

  outputCompletely() {
    this.screenContext.resetTransform();
    this.screenContext.clearRect(0, 0, this.screenCanvas.width, this.screenCanvas.height);

    this.show();
  }

  changeDelta(deltaX, deltaY) {
    this.hide();
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.show();
  }

  changeZoom(zoom) {
    this.hide();
    this.zoom = zoom;
    this.show();
  }

  changeRotation(rotation) {
    this.hide();
    this.rotation = rotation;
    this.show();
  }

  applyTransformations() {
    this.screenContext.resetTransform();
    this.screenContext.translate(this.deltaX, this.deltaY);
    this.screenContext.rotate(this.rotation);
    this.screenContext.scale(this.zoom, this.zoom);
  }

  hide() {
    this.applyTransformations();

    this.screenContext.clearRect(
      -2 * BORDER_WIDTH, -2 * BORDER_WIDTH,
      DEFAULT_WIDTH + 4 * BORDER_WIDTH,
      DEFAULT_HEIGHT + 4 * BORDER_WIDTH,
    );
  }

  show() {
    this.applyTransformations();

    this.screenContext.strokeStyle = BORDER_COLOR;
    this.screenContext.lineWidth = BORDER_WIDTH;
    this.screenContext.strokeRect(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);

    this.screenContext.drawImage(this.htmlCanvasElement, 0, 0);
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

  updateAndShowBuffer(updateCb, ...args) {
    this.clearBuffer();

    this.bufferCanvasContext.scale(1 / this.zoom, 1 / this.zoom);
    this.bufferCanvasContext.rotate(-this.rotation);
    this.bufferCanvasContext.translate(-this.deltaX, -this.deltaY);
    this.bufferCanvasContext.translate(-this.containerPositionX, -this.containerPositionY);

    updateCb(this.bufferCanvasContext, ...args);

    this.show();
    this.screenContext.drawImage(this.bufferCanvasElement, 0, 0);
  }

  appendBuffer() {
    this.htmlCanvasContext.resetTransform();
    this.htmlCanvasContext.drawImage(this.bufferCanvasElement, 0, 0);
    this.clearBuffer();

    this.show();
  }
}

export default Canvas;
