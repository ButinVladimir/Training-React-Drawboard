import BrushToolStateHandler from './BrushToolStateHandler';
import BrushToolState from './BrushToolState';
import Canvas from '../Canvas';
import ViewState from '../ViewState';
import getOperationsProxy from '../../helpers/getOperationsProxy';

describe('BrushToolStateHandler', () => {
  it('handles OnMouseMove event', () => {
    const canvas = {
      updateAndShowBuffer: jest.fn(),
    };
    const toolState = {};
    const stateHandler = new BrushToolStateHandler(canvas);

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

    const toolState = new BrushToolState();
    const fixRelativeCoordsSpy = jest.spyOn(toolState, 'fixRelativeCoords');
    const serializedObject = {};
    toolState.serialize = jest.fn(() => serializedObject);

    const stateHandler = new BrushToolStateHandler(canvas);
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

    const toolState = new BrushToolState();
    toolState.width = 7;
    toolState.color = '#123456';
    toolState.points = [[1, 2], [3, 4], [5, 6]];

    const stateHandler = new BrushToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.lineWidth).toBe(3 * 7);
    expect(canvas.screenContext.strokeStyle).toBe('#123456');

    expect(operations).toMatchObject([
      [canvas.screenContext, 'beginPath'],
      [canvas.screenContext, 'moveTo', 1, 2],
      [canvas.screenContext, 'lineTo', 1, 2],
      [canvas.screenContext, 'lineTo', 3, 4],
      [canvas.screenContext, 'lineTo', 5, 6],
      [canvas.screenContext, 'stroke'],
    ]);
  });

  it('applies state to context without points', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new BrushToolState();
    toolState.width = 7;
    toolState.color = '#123456';
    toolState.points = [];

    const stateHandler = new BrushToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(operations.length).toBe(0);
  });
});
