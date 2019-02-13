import CircleToolStateHandler from './CircleToolStateHandler';
import CircleToolState from './CircleToolState';
import Canvas from '../Canvas';
import ViewState from '../ViewState';
import getOperationsProxy from '../../helpers/getOperationsProxy';

describe('CircleToolStateHandler', () => {
  it('handles OnMouseMove event', () => {
    const canvas = {
      updateAndShowBuffer: jest.fn(),
    };
    const toolState = {};
    const stateHandler = new CircleToolStateHandler(canvas);

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

    const toolState = new CircleToolState();
    const fixRelativeCoordsSpy = jest.spyOn(toolState, 'fixRelativeCoords');
    const serializedObject = {};
    toolState.serialize = jest.fn(() => serializedObject);

    const stateHandler = new CircleToolStateHandler(canvas);
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

    const toolState = new CircleToolState();
    toolState.addBorder = true;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';
    toolState.anchorX = 1;
    toolState.anchorY = 2;
    toolState.clientX = 3;
    toolState.clientY = 4;
    const radius = 2 * Math.sqrt(2);

    const stateHandler = new CircleToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.fillStyle).toBe('#abcdef');
    expect(canvas.screenContext.lineWidth).toBe(3 * 7);
    expect(canvas.screenContext.strokeStyle).toBe('#123456');
    expect(operations.length).toBe(4);
    expect(operations[0]).toMatchObject(['beginPath']);
    expect(operations[1]).toMatchObject(['arc', 1, 2, radius, 0, Math.PI * 2]);
    expect(operations[2]).toMatchObject(['fill']);
    expect(operations[3]).toMatchObject(['stroke']);
  });

  it('applies state to context without border', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new CircleToolState();
    toolState.addBorder = false;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';
    toolState.anchorX = 1;
    toolState.anchorY = 2;
    toolState.clientX = 3;
    toolState.clientY = 4;
    const radius = 2 * Math.sqrt(2);

    const stateHandler = new CircleToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.fillStyle).toBe('#abcdef');
    expect(operations.length).toBe(3);
    expect(operations[0]).toMatchObject(['beginPath']);
    expect(operations[1]).toMatchObject(['arc', 1, 2, radius, 0, Math.PI * 2]);
    expect(operations[2]).toMatchObject(['fill']);
  });

  it('applies state to context without fill', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const contextProxy = getOperationsProxy(canvas.screenContext, operations);

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new CircleToolState();
    toolState.addBorder = true;
    toolState.borderWidth = 7;
    toolState.borderColor = '#123456';
    toolState.addFill = false;
    toolState.fillColor = '#abcdef';
    toolState.anchorX = 1;
    toolState.anchorY = 2;
    toolState.clientX = 3;
    toolState.clientY = 4;
    const radius = 2 * Math.sqrt(2);

    const stateHandler = new CircleToolStateHandler(canvas);
    stateHandler.applyState(contextProxy, viewState, toolState);

    expect(canvas.screenContext.lineWidth).toBe(3 * 7);
    expect(canvas.screenContext.strokeStyle).toBe('#123456');
    expect(operations.length).toBe(3);
    expect(operations[0]).toMatchObject(['beginPath']);
    expect(operations[1]).toMatchObject(['arc', 1, 2, radius, 0, Math.PI * 2]);
    expect(operations[2]).toMatchObject(['stroke']);
  });
});
