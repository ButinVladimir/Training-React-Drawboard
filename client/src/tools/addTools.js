import RectangleTool from '../components/tools/rectangle/RectangleTool';
import LineTool from '../components/tools/line/LineTool';

const addTools = (toolsProvider) => {
  toolsProvider.registerTool(new RectangleTool());
  toolsProvider.registerTool(new LineTool());
};

export default addTools;
