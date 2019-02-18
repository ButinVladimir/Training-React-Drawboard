import ZoomToolState from './ZoomToolState';
import { DEFAULT_ZOOM } from '../../ViewState';

describe('ZoomToolState', () => {
  it('is instantiated properly', () => {
    const toolState = new ZoomToolState();

    expect(toolState).toBeInstanceOf(ZoomToolState);
    expect(toolState.zoom).toBe(DEFAULT_ZOOM);
    expect(toolState.speed).toBe(200.0);
  });

  it('restores itself', () => {
    const toolState = new ZoomToolState();
    toolState.zoom = 123;
    toolState.restore();

    expect(toolState.zoom).toBe(DEFAULT_ZOOM);
  });

  it('sets speed to default', () => {
    const toolState = new ZoomToolState();
    toolState.speed = 3;
    toolState.setDefaultSpeed();

    expect(toolState.speed).toBe(200.0);
  });

  it('handles OnMouseUp event', () => {
    const toolState = new ZoomToolState();
    Object.assign(toolState, {
      zoom: 3,
      anchorX: 15,
      anchorY: 6,
      clientX: 5,
      clientY: 30,
      speed: 5,
    });

    toolState.onMouseUp();

    expect(toolState).toMatchObject({
      zoom: 1,
      clientX: 15,
      clientY: 6,
    });
  });

  it('calculates zoom when speed is NaN', () => {
    const toolState = new ZoomToolState();
    toolState.zoom = 2;
    toolState.speed = Number.NaN;
    toolState.anchorX = 7;
    toolState.clientX = 21;

    expect(toolState.calculateZoom()).toBe(2);
  });

  it('calculates zoom when speed is not NaN', () => {
    const toolState = new ZoomToolState();
    toolState.zoom = 2;
    toolState.speed = 7;
    toolState.anchorX = 7;
    toolState.clientX = 21;

    expect(toolState.calculateZoom()).toBe(4);
  });
});
