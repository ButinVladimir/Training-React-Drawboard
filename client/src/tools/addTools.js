import MoveTool from './help/moveTool/MoveTool';
import ZoomTool from './help/zoomTool/ZoomTool';
import RotateTool from './help/rotateTool/RotateTool';
import BrushTool from './brush/BrushTool';
import LineTool from './line/LineTool';
import RectangleTool from './rectangle/RectangleTool';
import CircleTool from './circle/CircleTool';
import FigureTool from './figure/FigureTool';

const addTools = (toolsProvider) => {
  toolsProvider.registerTool(MoveTool);
  toolsProvider.registerTool(ZoomTool);
  toolsProvider.registerTool(RotateTool);
  toolsProvider.registerTool(BrushTool);
  toolsProvider.registerTool(LineTool);
  toolsProvider.registerTool(RectangleTool);
  toolsProvider.registerTool(CircleTool);
  toolsProvider.registerTool(FigureTool);
};

export default addTools;
