import HelpTool from '../HelpTool';
import MoveToolState from './MoveToolState';
import MoveToolStateHandler from './MoveToolStateHandler';

const MOVE_TOOL_NAME = 'Move';

class MoveTool extends HelpTool {
  constructor(canvas) {
    super(canvas, new MoveToolState(), new MoveToolStateHandler(canvas));

    this.toolKey = MOVE_TOOL_NAME;
  }

  static get name() {
    return MOVE_TOOL_NAME;
  }
}

export default MoveTool;
