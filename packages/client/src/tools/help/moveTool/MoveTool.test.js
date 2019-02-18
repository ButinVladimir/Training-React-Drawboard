import MoveTool from './MoveTool';
import MoveToolState from './MoveToolState';
import MoveToolStateHandler from './MoveToolStateHandler';
import Canvas from '../../Canvas';

describe('MoveTool', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();
    const moveTool = new MoveTool(canvas);

    expect(moveTool).toBeInstanceOf(MoveTool);
    expect(moveTool.toolState).toBeInstanceOf(MoveToolState);
    expect(moveTool.stateHandler).toBeInstanceOf(MoveToolStateHandler);
    expect(moveTool.canvas).toBe(canvas);
    expect(moveTool.toolKey).toBe('Move');
    expect(MoveTool.name).toBe('Move');
  });
});
