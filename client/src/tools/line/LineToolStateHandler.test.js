import LineToolStateHandler from './LineToolStateHandler';
import LineToolState from './LineToolState';
import Canvas from '../Canvas';
import ViewState from '../ViewState';

describe('LineToolStateHandler', () => {
  it('handles OnMouseMove event', () => {
    const canvas = {
      updateAndShowBuffer: jest.fn(),
    };
    const toolState = {};
    const stateHandler = new LineToolStateHandler(canvas);

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

    const toolState = new LineToolState();
    const fixRelativeCoordsSpy = jest.spyOn(toolState, 'fixRelativeCoords');
    const serializeSpy = jest.spyOn(toolState, 'serialize');

    const stateHandler = new LineToolStateHandler(canvas);

    stateHandler.onMouseUp(toolState);

    expect(appendBufferSpy).toHaveBeenCalledTimes(1);
    expect(fixRelativeCoordsSpy).toHaveBeenCalledTimes(1);
    expect(fixRelativeCoordsSpy).toHaveBeenCalledWith(3, 4);
    expect(serializeSpy).toHaveBeenCalled();
  });

  it('applies state to context', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');

    const operations = [];
    const context = new Proxy(canvas, {
      get: (object, property) => (...args) => { operations.push([property, ...args]); },
      set: (object, property, value) => {
        Object.assign(object, { property: value }); return true;
      },
    });

    const viewState = new ViewState(1, 2, 3, 4);

    const toolState = new LineToolState();
    toolState.width = 7;
    toolState.color = '#123456';
    toolState.anchorX = 1;
    toolState.anchorY = 2;
    toolState.clientX = 3;
    toolState.clientY = 4;

    const stateHandler = new LineToolStateHandler(canvas);
    stateHandler.applyState(context, viewState, toolState);

    expect(operations.length).toBe(4);
    expect(operations[0]).toMatchObject(['beginPath']);
    expect(operations[1]).toMatchObject(['moveTo', 1, 2]);
    expect(operations[2]).toMatchObject(['lineTo', 3, 4]);
    expect(operations[3]).toMatchObject(['stroke']);
  });
});
