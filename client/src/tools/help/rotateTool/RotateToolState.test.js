import RotateToolState from './RotateToolState';
import { DEFAULT_ROTATION } from '../../ViewState';

describe('RotateToolState', () => {
  it('is instantiated properly', () => {
    const toolState = new RotateToolState();

    expect(toolState).toBeInstanceOf(RotateToolState);
    expect(toolState.rotation).toBe(DEFAULT_ROTATION);
    expect(toolState.speed).toBe(200.0);
  });

  it('restores itself', () => {
    const toolState = new RotateToolState();
    toolState.rotation = 123;
    toolState.restore();

    expect(toolState.rotation).toBe(DEFAULT_ROTATION);
  });

  it('sets speed to default', () => {
    const toolState = new RotateToolState();
    toolState.speed = 3;
    toolState.setDefaultSpeed();

    expect(toolState.speed).toBe(200.0);
  });

  it('handles OnMouseUp event', () => {
    const toolState = new RotateToolState();
    Object.assign(toolState, {
      rotation: 3,
      anchorX: 5,
      anchorY: 6,
      clientX: 20,
      clientY: 30,
      speed: 3,
    });

    toolState.onMouseUp();

    expect(toolState).toMatchObject({
      rotation: -2,
      clientX: 5,
      clientY: 6,
    });
  });

  it('calculates rotation when speed is NaN', () => {
    const toolState = new RotateToolState();
    toolState.rotation = 3;
    toolState.speed = Number.NaN;
    toolState.anchorX = 3;
    toolState.clientX = 9;

    expect(toolState.calculateRotation()).toBe(3);
  });

  it('calculates rotation when speed is not NaN', () => {
    const toolState = new RotateToolState();
    toolState.rotation = 3;
    toolState.speed = 2;
    toolState.anchorX = 3;
    toolState.clientX = 9;

    expect(toolState.calculateRotation()).toBe(0);
  });
});
