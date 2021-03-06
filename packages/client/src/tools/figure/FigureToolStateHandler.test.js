import FigureToolStateHandler from './FigureToolStateHandler';
import FigureToolState from './FigureToolState';
import Canvas from '../Canvas';
import ViewState from '../ViewState';
import getOperationsProxy from '../../helpers/getOperationsProxy';

describe('FigureToolStateHandler', () => {
  it('handles OnMouseMove event', () => {
    const canvas = {
      updateAndShowBuffer: jest.fn(),
    };
    const toolState = {};
    const stateHandler = new FigureToolStateHandler(canvas);

    stateHandler.onMouseMove(toolState);

    expect(canvas.updateAndShowBuffer).toHaveBeenCalledTimes(1);
    expect(canvas.updateAndShowBuffer).toHaveBeenCalledWith(stateHandler, toolState);
  });

  it('handles OnMouseUp event when is adding points', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');
    const updateAndShowBufferSpy = jest.spyOn(canvas, 'updateAndShowBuffer');

    const toolState = new FigureToolState();
    const onMouseUpSpy = jest.spyOn(toolState, 'onMouseUp');
    toolState.isAddingPoints = true;
    toolState.clientX = 30;
    toolState.clientY = 40;
    toolState.points = [[1, 2]];

    const stateHandler = new FigureToolStateHandler(canvas);
    const result = stateHandler.onMouseUp(toolState);

    expect(onMouseUpSpy).toHaveBeenCalledTimes(1);
    expect(updateAndShowBufferSpy).toHaveBeenCalledTimes(1);
    expect(updateAndShowBufferSpy).toHaveBeenCalledWith(stateHandler, toolState);
    expect(result).toBeNull();
  });

  it('handles OnMouseUp event when is not adding points', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');
    canvas.containerPositionX = 10;
    canvas.containerPositionY = 20;
    const appendBufferSpy = jest.spyOn(canvas, 'appendBuffer');

    const toolState = new FigureToolState();
    const onMouseUpSpy = jest.spyOn(toolState, 'onMouseUp');
    const fixRelativeCoordsSpy = jest.spyOn(toolState, 'fixRelativeCoords');
    toolState.isAddingPoints = true;
    toolState.clientX = 30;
    toolState.clientY = 40;
    toolState.points = [[1, 2], [30, 40]];
    const serializedObject = {};
    toolState.serialize = jest.fn(() => serializedObject);

    const stateHandler = new FigureToolStateHandler(canvas);
    const result = stateHandler.onMouseUp(toolState);

    expect(onMouseUpSpy).toHaveBeenCalledTimes(1);
    expect(appendBufferSpy).toHaveBeenCalledTimes(1);
    expect(fixRelativeCoordsSpy).toHaveBeenCalledTimes(1);
    expect(fixRelativeCoordsSpy).toHaveBeenCalledWith(10, 20);
    expect(result).toBe(serializedObject);
  });

  it('applies state to context without points', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new FigureToolState();
    toolState.addBorder = true;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';
    toolState.points = [];

    const stateHandler = new FigureToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(operations.length).toBe(0);
  });


  it('applies state to context', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new FigureToolState();
    toolState.addBorder = true;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';
    toolState.points = [[10, 10], [100, 10], [100, 100]];
    toolState.isAddingPoints = false;

    const stateHandler = new FigureToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.fillStyle).toBe('#abcdef');
    expect(canvas.screenContext.lineWidth).toBe(3 * 7);
    expect(canvas.screenContext.strokeStyle).toBe('#123456');
    expect(operations).toMatchObject([
      [canvas.screenContext, 'beginPath'],
      [canvas.screenContext, 'moveTo', 10, 10],
      [canvas.screenContext, 'lineTo', 10, 10],
      [canvas.screenContext, 'lineTo', 100, 10],
      [canvas.screenContext, 'lineTo', 100, 100],
      [canvas.screenContext, 'closePath'],
      [canvas.screenContext, 'fill'],
      [canvas.screenContext, 'stroke'],
    ]);
  });

  it('applies state to context without border', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new FigureToolState();
    toolState.addBorder = false;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';
    toolState.points = [[10, 10], [100, 10], [100, 100]];
    toolState.isAddingPoints = false;

    const stateHandler = new FigureToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.fillStyle).toBe('#abcdef');
    expect(operations).toMatchObject([
      [canvas.screenContext, 'beginPath'],
      [canvas.screenContext, 'moveTo', 10, 10],
      [canvas.screenContext, 'lineTo', 10, 10],
      [canvas.screenContext, 'lineTo', 100, 10],
      [canvas.screenContext, 'lineTo', 100, 100],
      [canvas.screenContext, 'closePath'],
      [canvas.screenContext, 'fill'],
    ]);
  });

  it('applies state to context without fill', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new FigureToolState();
    toolState.addBorder = true;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = false;
    toolState.fillColor = '#abcdef';
    toolState.points = [[10, 10], [100, 10], [100, 100]];
    toolState.isAddingPoints = false;

    const stateHandler = new FigureToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.lineWidth).toBe(3 * 7);
    expect(canvas.screenContext.strokeStyle).toBe('#123456');
    expect(operations).toMatchObject([
      [canvas.screenContext, 'beginPath'],
      [canvas.screenContext, 'moveTo', 10, 10],
      [canvas.screenContext, 'lineTo', 10, 10],
      [canvas.screenContext, 'lineTo', 100, 10],
      [canvas.screenContext, 'lineTo', 100, 100],
      [canvas.screenContext, 'closePath'],
      [canvas.screenContext, 'stroke'],
    ]);
  });

  it('applies state to context when adding points', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new FigureToolState();
    toolState.addBorder = true;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';
    toolState.points = [[10, 10], [100, 10], [100, 100]];
    toolState.isAddingPoints = true;
    toolState.clientX = 10;
    toolState.clientY = 100;

    const stateHandler = new FigureToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.lineWidth).toBe(3 * 7);
    expect(canvas.screenContext.strokeStyle).toBe('#123456');
    expect(canvas.screenContext.fillStyle).toBe('#abcdef');
    expect(operations).toMatchObject([
      [canvas.screenContext, 'beginPath'],
      [canvas.screenContext, 'moveTo', 10, 10],
      [canvas.screenContext, 'lineTo', 10, 10],
      [canvas.screenContext, 'lineTo', 100, 10],
      [canvas.screenContext, 'lineTo', 100, 100],
      [canvas.screenContext, 'lineTo', 10, 100],
      [canvas.screenContext, 'closePath'],
      [canvas.screenContext, 'fill'],
      [canvas.screenContext, 'stroke'],
    ]);
  });
});
