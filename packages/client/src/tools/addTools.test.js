import ToolsProvider from './ToolsProvider';
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
    const toolsProvider = new ToolsProvider(null);
    const registerSpy = jest.spyOn(toolsProvider, 'registerTool');

    addTools(toolsProvider);

    expect(registerSpy).toHaveBeenCalledTimes(8);
    expect(registerSpy).toHaveBeenCalledWith(MoveTool);
    expect(registerSpy).toHaveBeenCalledWith(ZoomTool);
    expect(registerSpy).toHaveBeenCalledWith(RotateTool);
    expect(registerSpy).toHaveBeenCalledWith(BrushTool);
    expect(registerSpy).toHaveBeenCalledWith(LineTool);
    expect(registerSpy).toHaveBeenCalledWith(RectangleTool);
    expect(registerSpy).toHaveBeenCalledWith(CircleTool);
    expect(registerSpy).toHaveBeenCalledWith(FigureTool);
  });
});
