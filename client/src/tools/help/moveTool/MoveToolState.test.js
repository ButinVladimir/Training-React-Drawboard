import MoveToolState from './MoveToolState';
import { DEFAULT_DELTA_X, DEFAULT_DELTA_Y } from '../../ViewState';

describe('MoveToolState', () => {
  it('is instantiated properly', () => {
    const toolState = new MoveToolState();

    expect(toolState).toBeInstanceOf(MoveToolState);
    expect(toolState.deltaX).toBe(DEFAULT_DELTA_X);
    expect(toolState.deltaY).toBe(DEFAULT_DELTA_Y);
    expect(toolState.speed).toBe(1.0);
  });

  it('restores itself', () => {
    const toolState = new MoveToolState();
    toolState.deltaX = 3;
    toolState.deltaY = 4;
    toolState.restore();

    expect(toolState.deltaX).toBe(DEFAULT_DELTA_X);
    expect(toolState.deltaY).toBe(DEFAULT_DELTA_Y);
  });

  it('sets speed to default', () => {
    const toolState = new MoveToolState();
    toolState.speed = 3;
    toolState.setDefaultSpeed();

    expect(toolState.speed).toBe(1.0);
  });

  it('handles OnMouseUp event', () => {
    const toolState = new MoveToolState();
    Object.assign(toolState, {
      deltaX: 1,
      deltaY: 2,
      anchorX: 5,
      anchorY: 6,
      clientX: 10,
      clientY: 20,
      speed: 3,
    });

    toolState.onMouseUp();

    expect(toolState).toMatchObject({
      deltaX: 16,
      deltaY: 44,
      clientX: 5,
      clientY: 6,
    });
  });

  it('calculates deltaX when speed is NaN', () => {
    const toolState = new MoveToolState();
    toolState.deltaX = 1;
    toolState.speed = Number.NaN;
    toolState.anchorX = 1;
    toolState.clientX = 2;

    expect(toolState.calculateDeltaX()).toBe(1);
  });

  it('calculates deltaX when speed is not NaN', () => {
    const toolState = new MoveToolState();
    toolState.deltaX = 1;
    toolState.speed = 2;
    toolState.anchorX = 1;
    toolState.clientX = 3;

    expect(toolState.calculateDeltaX()).toBe(5);
  });

  it('calculates deltaY when speed is NaN', () => {
    const toolState = new MoveToolState();
    toolState.deltaY = 5;
    toolState.speed = Number.NaN;
    toolState.anchorY = 4;
    toolState.clientY = 1;

    expect(toolState.calculateDeltaY()).toBe(5);
  });

  it('calculates deltaY when speed is not NaN', () => {
    const toolState = new MoveToolState();
    toolState.deltaY = 5;
    toolState.speed = 3;
    toolState.anchorY = 4;
    toolState.clientY = 1;

    expect(toolState.calculateDeltaY()).toBe(-4);
  });
});
