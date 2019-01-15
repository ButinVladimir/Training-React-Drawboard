import Tool from '../Tool';
import ZoomToolState from './ZoomToolState';
import ZoomToolStateHandler from './ZoomToolStateHandler';

const ZOOM_TOOL_NAME = 'Zoom';

class ZoomTool extends Tool {
  constructor(canvas) {
    super(canvas);

    this.toolKey = ZOOM_TOOL_NAME;
    this.toolState = new ZoomToolState();
    this.stateHandler = new ZoomToolStateHandler(canvas);
  }

  static get name() {
    return ZOOM_TOOL_NAME;
  }
}

export default ZoomTool;
