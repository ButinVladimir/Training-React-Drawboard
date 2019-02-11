import BaseToolStateHandler from './BaseToolStateHandler';
import Canvas from './Canvas';

describe('BaseToolStateHandler', () => {
  let stateHandler;
  let canvas;

  beforeEach(() => {
    canvas = new Canvas();
    stateHandler = new BaseToolStateHandler(canvas);
  });

  it('is instantiated properly', () => {
    expect(stateHandler.canvas).toBe(canvas);
  });

  it('handles onMouseDown event', () => {
    const toolState = {
      onMouseDown: jest.fn(),
    };
    const event = {};

    stateHandler.onMouseDown(toolState, event);
    expect(toolState.onMouseDown).toHaveBeenCalledTimes(1);
    expect(toolState.onMouseDown).toHaveBeenCalledWith(event);
  });

  it('throws an error because onMouseMove is not implemented', () => {
    expect(stateHandler.onMouseMove).toThrow('Method is not implemented');
  });

  it('throws an error because onMouseUp is not implemented', () => {
    expect(stateHandler.onMouseUp).toThrow('Method is not implemented');
  });

  it('throws an error because applyState is not implemented', () => {
    expect(stateHandler.applyState).toThrow('Method is not implemented');
  });
});
