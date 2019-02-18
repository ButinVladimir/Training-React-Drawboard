import ZoomTool from './ZoomTool';
import ZoomToolState from './ZoomToolState';
import ZoomToolStateHandler from './ZoomToolStateHandler';
import Canvas from '../../Canvas';

describe('ZoomTool', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();
    const zoomTool = new ZoomTool(canvas);

    expect(zoomTool).toBeInstanceOf(ZoomTool);
    expect(zoomTool.toolState).toBeInstanceOf(ZoomToolState);
    expect(zoomTool.stateHandler).toBeInstanceOf(ZoomToolStateHandler);
    expect(zoomTool.canvas).toBe(canvas);
    expect(zoomTool.toolKey).toBe('Zoom');
    expect(ZoomTool.name).toBe('Zoom');
  });
});
