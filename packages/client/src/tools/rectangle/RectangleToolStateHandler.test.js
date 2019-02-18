import RectangleToolStateHandler from './RectangleToolStateHandler';
import RectangleToolState from './RectangleToolState';
import Canvas from '../Canvas';
import ViewState from '../ViewState';
import getOperationsProxy from '../../helpers/getOperationsProxy';

describe('RectangleToolStateHandler', () => {
  it('handles OnMouseMove event', () => {
    const canvas = {
      updateAndShowBuffer: jest.fn(),
    };
    const toolState = {};
    const stateHandler = new RectangleToolStateHandler(canvas);

    stateHandler.onMouseMove(toolState);

    expect(canvas.updateAndShowBuffer).toHaveBeenCalledTimes(1);
    expect(canvas.updateAndShowBuffer).toHaveBeenCalledWith(stateHandler, toolState);
  });

  it('handles OnMouseUp event', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');
    canvas.containerPositionX = 3;
    canvas.containerPositionY = 4;
    const appendBufferSpy = jest.spyOn(canvas, 'appendBuffer');

    const toolState = new RectangleToolState();
    const fixRelativeCoordsSpy = jest.spyOn(toolState, 'fixRelativeCoords');
    const serializedObject = {};
    toolState.serialize = jest.fn(() => serializedObject);

    const stateHandler = new RectangleToolStateHandler(canvas);
    const result = stateHandler.onMouseUp(toolState);

    expect(appendBufferSpy).toHaveBeenCalledTimes(1);
    expect(fixRelativeCoordsSpy).toHaveBeenCalledTimes(1);
    expect(fixRelativeCoordsSpy).toHaveBeenCalledWith(3, 4);
    expect(toolState.serialize).toHaveBeenCalled();
    expect(result).toBe(serializedObject);
  });

  it('applies state to context', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new RectangleToolState();
    toolState.addBorder = true;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';
    toolState.anchorX = 1;
    toolState.anchorY = 2;
    toolState.clientX = 3;
    toolState.clientY = 4;

    const stateHandler = new RectangleToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.fillStyle).toBe('#abcdef');
    expect(canvas.screenContext.lineWidth).toBe(3 * 7);
    expect(canvas.screenContext.strokeStyle).toBe('#123456');
    expect(operations).toMatchObject([
      [canvas.screenContext, 'fillRect', 1, 2, 3 - 1, 4 - 2],
      [canvas.screenContext, 'strokeRect', 1, 2, 3 - 1, 4 - 2],
    ]);
  });

  it('applies state to context without border', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new RectangleToolState();
    toolState.addBorder = false;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';
    toolState.anchorX = 1;
    toolState.anchorY = 2;
    toolState.clientX = 3;
    toolState.clientY = 4;

    const stateHandler = new RectangleToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.fillStyle).toBe('#abcdef');
    expect(operations).toMatchObject([
      [canvas.screenContext, 'fillRect', 1, 2, 3 - 1, 4 - 2],
    ]);
  });

  it('applies state to context without fill', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new RectangleToolState();
    toolState.addBorder = true;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = false;
    toolState.fillColor = '#abcdef';
    toolState.anchorX = 1;
    toolState.anchorY = 2;
    toolState.clientX = 3;
    toolState.clientY = 4;

    const stateHandler = new RectangleToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.lineWidth).toBe(3 * 7);
    expect(canvas.screenContext.strokeStyle).toBe('#123456');
    expect(operations).toMatchObject([
      [canvas.screenContext, 'strokeRect', 1, 2, 3 - 1, 4 - 2],
    ]);
  });
});
