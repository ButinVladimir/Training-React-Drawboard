import RotateTool from './RotateTool';
import RotateToolState from './RotateToolState';
import RotateToolStateHandler from './RotateToolStateHandler';
import Canvas from '../../Canvas';

describe('RotateTool', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();
    const rotateTool = new RotateTool(canvas);

    expect(rotateTool).toBeInstanceOf(RotateTool);
    expect(rotateTool.toolState).toBeInstanceOf(RotateToolState);
    expect(rotateTool.stateHandler).toBeInstanceOf(RotateToolStateHandler);
    expect(rotateTool.canvas).toBe(canvas);
    expect(rotateTool.toolKey).toBe('Rotate');
    expect(RotateTool.name).toBe('Rotate');
  });
});
