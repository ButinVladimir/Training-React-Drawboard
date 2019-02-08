import MoveTool from './help/moveTool/MoveTool';
import ZoomTool from './help/zoomTool/ZoomTool';
import RotateTool from './help/rotateTool/RotateTool';
import BrushTool from './brush/BrushTool';
import LineTool from './line/LineTool';
import RectangleTool from './rectangle/RectangleTool';
import CircleTool from './circle/CircleTool';
import FigureTool from './figure/FigureTool';
import addTools from './addTools';

describe('addTools', () => {
  it('runs without error', () => {
    const toolsSet = new Set();
    const toolsProvider = {
      registerTool: jest.fn(toolConstructor => toolsSet.add(toolConstructor)),
    };

    addTools(toolsProvider);

    expect(toolsSet.size).toBe(8);
    expect(toolsSet.has(MoveTool)).toBe(true);
    expect(toolsSet.has(ZoomTool)).toBe(true);
    expect(toolsSet.has(RotateTool)).toBe(true);
    expect(toolsSet.has(BrushTool)).toBe(true);
    expect(toolsSet.has(LineTool)).toBe(true);
    expect(toolsSet.has(RectangleTool)).toBe(true);
    expect(toolsSet.has(CircleTool)).toBe(true);
    expect(toolsSet.has(FigureTool)).toBe(true);
  });
});
