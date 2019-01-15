import Tool from '../Tool';
import RotateToolState from './RotateToolState';
import RotateToolStateHandler from './RotateToolStateHandler';

const ROTATE_TOOL_NAME = 'Rotate';

class RotateTool extends Tool {
  constructor(canvas) {
    super(canvas);

    this.toolKey = ROTATE_TOOL_NAME;
    this.toolState = new RotateToolState();
    this.stateHandler = new RotateToolStateHandler(canvas);
  }

  static get name() {
    return ROTATE_TOOL_NAME;
  }
}

export default RotateTool;