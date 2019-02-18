import HelpTool from '../HelpTool';
import RotateToolState from './RotateToolState';
import RotateToolStateHandler from './RotateToolStateHandler';

const ROTATE_TOOL_NAME = 'Rotate';

class RotateTool extends HelpTool {
  constructor(canvas) {
    super(canvas, new RotateToolState(), new RotateToolStateHandler(canvas));

    this.toolKey = ROTATE_TOOL_NAME;
  }

  static get name() {
    return ROTATE_TOOL_NAME;
  }
}

export default RotateTool;
