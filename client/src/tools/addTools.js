import MoveTool from './help/MoveTool';
import ZoomTool from './help/ZoomTool';
import RotateTool from './help/RotateTool';
import RectangleTool from './rectangle/RectangleTool';
import LineTool from './line/LineTool';

const addTools = (toolsProvider) => {
  toolsProvider.registerTool(MoveTool);
  toolsProvider.registerTool(ZoomTool);
  toolsProvider.registerTool(RotateTool);
  toolsProvider.registerTool(LineTool);
  toolsProvider.registerTool(RectangleTool);
};

export default addTools;
