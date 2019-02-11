import HelpTool from '../HelpTool';
import ZoomToolState from './ZoomToolState';
import ZoomToolStateHandler from './ZoomToolStateHandler';

const ZOOM_TOOL_NAME = 'Zoom';

class ZoomTool extends HelpTool {
  constructor(canvas) {
    super(canvas, new ZoomToolState(), new ZoomToolStateHandler(canvas));

    this.toolKey = ZOOM_TOOL_NAME;
  }

  static get name() {
    return ZOOM_TOOL_NAME;
  }
}

export default ZoomTool;
