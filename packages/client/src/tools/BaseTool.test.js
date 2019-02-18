import BaseToolScreenHandler from './BaseToolScreenHandler';
import BaseTool from './BaseTool';

describe('BaseTool', () => {
  let tool;
  let canvas;
  let toolState;
  let stateHandler;

  beforeEach(() => {
    canvas = {};
    toolState = {};
    stateHandler = {};
    tool = new BaseTool(canvas, toolState, stateHandler);
  });

  it('is instantiated without error', () => {
    expect(tool).toBeInstanceOf(BaseTool);
    expect(tool.canvas).toBe(canvas);
    expect(tool.toolState).toBe(toolState);
    expect(tool.stateHandler).toBe(stateHandler);
    expect(tool.screenHandler).toBeInstanceOf(BaseToolScreenHandler);
    expect(tool.screenHandler.toolState).toBe(toolState);
    expect(tool.screenHandler.stateHandler).toBe(stateHandler);
    expect(tool.isMouseDown).toBe(false);
  });

  it('throws an error when tries to return name', () => {
    expect(() => BaseTool.name).toThrow('Method is not implemented');
  });

  it('throws an error when tries to options element', () => {
    expect(() => tool.optionsElement).toThrow('Method is not implemented');
  });

  it('handles OnSelect event', () => {
    let bufferCleared = false;
    canvas.clearBuffer = jest.fn(() => { bufferCleared = true; });
    canvas.show = jest.fn(() => expect(bufferCleared).toBe(true));
    tool.onSelect();

    expect(canvas.clearBuffer).toHaveBeenCalledTimes(1);
    expect(canvas.show).toHaveBeenCalledTimes(1);
  });

  it('serializes state', () => {
    toolState.serialize = jest.fn();
    tool.serializeState();

    expect(toolState.serialize).toHaveBeenCalledTimes(1);
  });

  it('throws an error when tries to deserialize state', () => {
    expect(() => tool.deserializeState()).toThrow('Method is not implemented');
  });
});
