import Canvas, {
  BORDER_COLOR,
  BORDER_WIDTH,
  DEFAULT_CANVAS_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
} from './Canvas';
import ViewState from './ViewState';
import getOperationsProxy from '../helpers/getOperationsProxy';

describe('Canvas', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();

    expect(canvas.viewState).toBeInstanceOf(ViewState);
    expect(canvas.containerPositionX).toBe(0);
    expect(canvas.containerPositionY).toBe(0);

    expect(canvas.screenCanvasValue).toBeNull();
    expect(canvas.screenContext).toBeNull();

    expect(canvas.htmlCanvasElement).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas.htmlCanvasElement.getAttribute('width')).toBe(DEFAULT_WIDTH.toString());
    expect(canvas.htmlCanvasElement.getAttribute('height')).toBe(DEFAULT_HEIGHT.toString());
    expect(canvas.htmlCanvasContext).toBeInstanceOf(CanvasRenderingContext2D);
    expect(canvas.htmlCanvasContext.fillStyle).toBe(DEFAULT_CANVAS_COLOR);

    expect(canvas.bufferCanvasElement).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas.bufferCanvasElement.getAttribute('width')).toBe(DEFAULT_WIDTH.toString());
    expect(canvas.bufferCanvasElement.getAttribute('height')).toBe(DEFAULT_HEIGHT.toString());
    expect(canvas.bufferCanvasContext).toBeInstanceOf(CanvasRenderingContext2D);
  });

  it('sets and gets ScreenCanvas properly', () => {
    const canvas = new Canvas();

    const screenCanvas = document.createElement('canvas');

    expect(canvas.screenCanvas).toBeNull();
    expect(canvas.screenContext).toBeNull();

    canvas.screenCanvas = screenCanvas;

    expect(canvas.screenCanvas).toBe(screenCanvas);
    expect(canvas.screenCanvas).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas.screenContext).toBeInstanceOf(CanvasRenderingContext2D);
  });

  it('hides', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');
    const operations = [];

    const { screenContext } = canvas;

    canvas.screenContext = getOperationsProxy(canvas.screenContext, operations);

    canvas.hide();

    expect(operations).toMatchObject([
      [screenContext, 'resetTransform'],
      [screenContext, 'translate', 0, 0],
      [screenContext, 'rotate', 0],
      [screenContext, 'scale', 1, 1],
      [
        screenContext,
        'clearRect',
        -2 * BORDER_WIDTH,
        -2 * BORDER_WIDTH,
        DEFAULT_WIDTH + 4 * BORDER_WIDTH,
        DEFAULT_HEIGHT + 4 * BORDER_WIDTH,
      ],
    ]);
  });

  it('shows', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');
    const operations = [];

    const { screenContext } = canvas;
    canvas.screenContext = getOperationsProxy(canvas.screenContext, operations);

    canvas.show();

    expect(screenContext).toMatchObject({
      strokeStyle: BORDER_COLOR,
      lineWidth: BORDER_WIDTH,
    });
    expect(operations).toMatchObject([
      [screenContext, 'resetTransform'],
      [screenContext, 'translate', 0, 0],
      [screenContext, 'rotate', 0],
      [screenContext, 'scale', 1, 1],
      [
        screenContext,
        'strokeRect',
        0,
        0,
        DEFAULT_WIDTH,
        DEFAULT_HEIGHT,
      ],
      [
        screenContext,
        'drawImage',
        canvas.htmlCanvasElement,
        0,
        0,
      ],
    ]);
  });

  it('shows with buffer', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');
    canvas.show = jest.fn();

    canvas.showWithBuffer();

    expect(canvas.show).toHaveBeenCalled();
    expect(canvas.screenContext.drawImage).toHaveBeenCalledTimes(1);
    expect(canvas.screenContext.drawImage).toHaveBeenCalledWith(canvas.bufferCanvasElement, 0, 0);
  });

  it('outputs completely', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');
    canvas.show = jest.fn();
    const operations = [];

    const { screenContext } = canvas;
    canvas.screenContext = getOperationsProxy(canvas.screenContext, operations);

    canvas.outputCompletely();

    expect(canvas.show).toHaveBeenCalled();
    expect(operations).toMatchObject([
      [screenContext, 'resetTransform'],
      [screenContext, 'clearRect', 0, 0, canvas.screenCanvas.width, canvas.screenCanvas.height],
    ]);
  });

  it('clears buffer', () => {
    const canvas = new Canvas();
    const operations = [];

    const { bufferCanvasContext } = canvas;
    canvas.bufferCanvasContext = getOperationsProxy(canvas.bufferCanvasContext, operations);

    canvas.clearBuffer();

    expect(operations).toMatchObject([
      [bufferCanvasContext, 'resetTransform'],
      [bufferCanvasContext, 'clearRect', 0, 0, canvas.bufferCanvasElement.width, canvas.bufferCanvasElement.height],
    ]);
  });

  it('updates and shows buffer', () => {
    const canvas = new Canvas();
    canvas.containerPositionX = 10;
    canvas.containerPositionY = 20;
    canvas.clearBuffer = jest.fn();
    canvas.viewState.applyReverseTransformations = jest.fn();
    canvas.showWithBuffer = jest.fn();

    const toolState = {};
    const stateHandler = {
      applyState: jest.fn(),
    };

    canvas.updateAndShowBuffer(stateHandler, toolState);

    expect(canvas.clearBuffer).toHaveBeenCalled();
    expect(canvas.viewState.applyReverseTransformations)
      .toHaveBeenCalledWith(canvas.bufferCanvasContext);
    expect(canvas.bufferCanvasContext.translate)
      .toHaveBeenCalledWith(-10, -20);
    expect(stateHandler.applyState)
      .toHaveBeenCalledWith(canvas.bufferCanvasContext, canvas.viewState, toolState);
    expect(canvas.showWithBuffer).toHaveBeenCalled();
  });

  it('applies state', () => {
    const canvas = new Canvas();
    const viewState = new ViewState();
    const applyReverseTransformationsSpy = jest.spyOn(viewState, 'applyReverseTransformations');
    canvas.showWithBuffer = jest.fn();

    const toolState = {};
    const stateHandler = {
      applyState: jest.fn(),
    };

    canvas.applyState(stateHandler, viewState, toolState);

    expect(applyReverseTransformationsSpy).toHaveBeenCalledWith(canvas.htmlCanvasContext);
    expect(stateHandler.applyState)
      .toHaveBeenCalledWith(canvas.htmlCanvasContext, viewState, toolState);
    expect(canvas.showWithBuffer).toHaveBeenCalled();
  });

  it('appends buffer', () => {
    const canvas = new Canvas();
    canvas.clearBuffer = jest.fn();
    canvas.show = jest.fn();

    canvas.appendBuffer();

    expect(canvas.htmlCanvasContext.resetTransform).toHaveBeenCalled();
    expect(canvas.htmlCanvasContext.drawImage)
      .toHaveBeenCalledWith(canvas.bufferCanvasElement, 0, 0);
    expect(canvas.clearBuffer).toHaveBeenCalled();
    expect(canvas.show).toHaveBeenCalled();
  });

  it('adds preloaded image', async () => {
    /* eslint-disable func-names */
    Object.defineProperty(Image.prototype, 'src', {
      get() {
        return null;
      },
      set() {
        this.onload();
      },
    });
    /* eslint-enable func-names */
    const canvas = new Canvas();
    canvas.show = jest.fn();

    const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
    await expect(canvas.addPreloadedImage(image)).resolves.not.toThrow();
    expect(canvas.htmlCanvasContext.drawImage).toHaveBeenCalled();
    expect(canvas.show).toHaveBeenCalled();
  });
});
