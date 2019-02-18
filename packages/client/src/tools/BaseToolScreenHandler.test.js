import BaseToolScreenHandler from './BaseToolScreenHandler';

describe('BaseToolScreenHandler', () => {
  let toolState;
  let stateHandler;
  let screenHandler;

  beforeEach(() => {
    toolState = {
      onMouseDown: jest.fn(),
      onMouseMove: jest.fn(),
    };

    stateHandler = {
      onMouseMove: jest.fn(),
      onMouseUp: jest.fn(),
    };

    screenHandler = new BaseToolScreenHandler(toolState, stateHandler);
  });

  it('is instantiated properly', () => {
    expect(screenHandler).toMatchObject({
      toolState,
      stateHandler,
      isMouseDown: false,
    });
  });

  it('handles onMouseDown event when mouse wasnt down', () => {
    const event = {};
    screenHandler.onMouseDown(event);
    expect(screenHandler.isMouseDown).toBe(true);
    expect(toolState.onMouseDown).toHaveBeenCalledTimes(1);
    expect(toolState.onMouseDown).toHaveBeenCalledWith(event);
  });

  it('handles onMouseDown event when mouse was down', () => {
    const event = {};
    screenHandler.isMouseDown = true;
    screenHandler.onMouseDown(event);
    expect(screenHandler.isMouseDown).toBe(true);
    expect(toolState.onMouseDown).not.toHaveBeenCalled();
  });

  it('handles onMouseUp event when mouse wasnt down', () => {
    expect(screenHandler.onMouseUp()).toBeNull();
    expect(screenHandler.isMouseDown).toBe(false);
    expect(stateHandler.onMouseUp).not.toHaveBeenCalled();
  });

  it('handles onMouseUp event when mouse was down', () => {
    screenHandler.isMouseDown = true;
    const returnObject = {};
    stateHandler.onMouseUp = jest.fn(() => returnObject);

    expect(screenHandler.onMouseUp()).toBe(returnObject);
    expect(screenHandler.isMouseDown).toBe(false);
    expect(stateHandler.onMouseUp).toHaveBeenCalledTimes(1);
    expect(stateHandler.onMouseUp).toHaveBeenCalledWith(toolState);
  });

  it('handles onMouseMove event when mouse wasnt down', () => {
    const event = {};
    screenHandler.onMouseMove(event);

    expect(screenHandler.isMouseDown).toBe(false);
    expect(toolState.onMouseMove).not.toHaveBeenCalled();
    expect(stateHandler.onMouseMove).not.toHaveBeenCalled();
  });

  it('handles onMouseMove event when mouse was down', () => {
    const changedState = {};
    const event = {};
    toolState.onMouseMove = jest.fn(() => { screenHandler.toolState = changedState; });

    screenHandler.isMouseDown = true;
    screenHandler.onMouseMove(event);

    expect(screenHandler.isMouseDown).toBe(true);
    expect(toolState.onMouseMove).toHaveBeenCalledTimes(1);
    expect(toolState.onMouseMove).toHaveBeenCalledWith(event);
    expect(stateHandler.onMouseMove).toHaveBeenCalledTimes(1);
    expect(stateHandler.onMouseMove).toHaveBeenCalledWith(changedState);
  });
});
