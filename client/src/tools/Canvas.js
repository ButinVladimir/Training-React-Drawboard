export const DEFAULT_DELTA_X = 0.0;
export const DEFAULT_DELTA_Y = 0.0;
export const DEFAULT_ZOOM = 1.0;
export const DEFAULT_ROTATION = 0.0;
export const DEFAULT_WIDTH = 500;
export const DEFAULT_HEIGHT = 500;
export const DEFAULT_CANVAS_COLOR = '#fff';
export const BACKGROUND_COLOR = '#777';
export const BORDER_COLOR = '#999';
export const BORDER_WIDTH = 3;

class Canvas {
  constructor() {
    this.deltaX = DEFAULT_DELTA_X;
    this.deltaY = DEFAULT_DELTA_Y;
    this.zoom = DEFAULT_ZOOM;
    this.rotation = DEFAULT_ROTATION;

    this.screenCanvasValue = null;
    this.screenContext = null;

    this.htmlCanvasElement = document.createElement('canvas');
    this.htmlCanvasElement.setAttribute('width', DEFAULT_WIDTH);
    this.htmlCanvasElement.setAttribute('height', DEFAULT_HEIGHT);

    const context = this.htmlCanvasElement.getContext('2d');
    context.fillStyle = DEFAULT_CANVAS_COLOR;
    context.fillRect(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);

    context.lineWidth = 10;
    context.strokeStyle = '#007';
    context.strokeRect(10, 10, 480, 480);
  }

  get screenCanvas() {
    return this.screenCanvasValue;
  }

  set screenCanvas(screenCanvas) {
    this.screenCanvasValue = screenCanvas;
    this.screenContext = screenCanvas.getContext('2d');
  }

  completeOutput() {
    this.screenContext.resetTransform();
    this.screenContext.fillStyle = BACKGROUND_COLOR;
    this.screenContext.fillRect(0, 0, this.screenCanvas.width, this.screenCanvas.height);

    this.show(this.screenCanvas);
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
    this.screenContext.scale(this.zoom, this.zoom);
    this.screenContext.rotate(this.rotation);
  }

  hide() {
    this.applyTransformations();
    this.screenContext.fillStyle = BACKGROUND_COLOR;
    this.screenContext.fillRect(
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
}

export default Canvas;
