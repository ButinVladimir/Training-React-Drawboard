import MoveTool from './help/moveTool/MoveTool';
import ZoomTool from './help/zoomTool/ZoomTool';
import RotateTool from './help/rotateTool/RotateTool';
import LineTool from './line/LineTool';
import RectangleTool from './rectangle/RectangleTool';
import CircleTool from './circle/CircleTool';

const addTools = (toolsProvider) => {
  toolsProvider.registerTool(MoveTool);
  toolsProvider.registerTool(ZoomTool);
  toolsProvider.registerTool(RotateTool);
  toolsProvider.registerTool(LineTool);
  toolsProvider.registerTool(RectangleTool);
  toolsProvider.registerTool(CircleTool);
};

export default addTools;
