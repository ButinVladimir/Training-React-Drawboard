import HelpToolStateHandler from './HelpToolStateHandler';
import Canvas from '../Canvas';

describe('HelpToolStateHandler', () => {
  it('handles OnMouseMove event', () => {
    const stateHandler = new HelpToolStateHandler(null);
    stateHandler.applyState = jest.fn();
    const toolState = {};

    stateHandler.onMouseMove(toolState);

    expect(stateHandler.applyState).toHaveBeenCalledTimes(1);
    expect(stateHandler.applyState).toHaveBeenCalledWith(null, null, toolState);
  });

  it('handles OnMouseUp event', () => {
    const stateHandler = new HelpToolStateHandler(null);
    const toolState = {
      onMouseUp: jest.fn(),
    };

    const result = stateHandler.onMouseUp(toolState);

    expect(toolState.onMouseUp).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('applies state', () => {
    const canvas = new Canvas();
    const stateHandler = new HelpToolStateHandler(canvas);
    const toolState = {};

    canvas.hide = jest.fn();
    stateHandler.changeViewState = jest.fn();
    canvas.show = jest.fn();

    stateHandler.applyState(null, null, toolState);

    expect(canvas.hide).toHaveBeenCalled();
    expect(stateHandler.changeViewState).toHaveBeenCalledTimes(1);
    expect(stateHandler.changeViewState).toHaveBeenCalledWith(toolState);
    expect(canvas.show).toHaveBeenCalled();
  });

  it('throws an error when tries to change view state', () => {
    const stateHandler = new HelpToolStateHandler(null);

    expect(stateHandler.changeViewState).toThrow('Method is not implemented');
  });

  it('restores', () => {
    const stateHandler = new HelpToolStateHandler(null);
    const toolState = {
      restore: jest.fn(),
    };
    stateHandler.applyState = jest.fn();

    stateHandler.restore(toolState);

    expect(toolState.restore).toHaveBeenCalled();
    expect(stateHandler.applyState).toHaveBeenCalledTimes(1);
    expect(stateHandler.applyState).toHaveBeenCalledWith(null, null, toolState);
  });
});
