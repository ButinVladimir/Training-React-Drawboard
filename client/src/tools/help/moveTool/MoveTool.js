import Tool from '../Tool';
import MoveToolState from './MoveToolState';
import MoveToolStateHandler from './MoveToolStateHandler';

const MOVE_TOOL_NAME = 'Move';

class MoveTool extends Tool {
  constructor(canvas) {
    super(canvas);

    this.toolKey = MOVE_TOOL_NAME;
    this.toolState = new MoveToolState();
    this.stateHandler = new MoveToolStateHandler(canvas);
  }

  static get name() {
    return MOVE_TOOL_NAME;
  }
}

export default MoveTool;
