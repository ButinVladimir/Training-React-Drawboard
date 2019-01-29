import brushHandler, { BRUSH_TOOL_NAME } from './brush-handler';
import lineHandler, { LINE_TOOL_NAME } from './line-handler';
import rectangleHandler, { RECTANGLE_TOOL_NAME } from './rectangle-handler';
import circleHandler, { CIRCLE_TOOL_NAME } from './circle-handler';
import figureHandler, { FIGURE_TOOL_NAME } from './figure-handler';

export default (canvas, viewState, toolName, toolState) => {
  console.log('Apply tool', toolName);
  const context = canvas.getContext('2d');
  context.resetTransform();
  context.scale(1 / viewState.zoom, 1 / viewState.zoom);
  context.rotate(-viewState.rotation);
  context.translate(-viewState.deltaX, -viewState.deltaY);

  switch (toolName) {
    case BRUSH_TOOL_NAME:
      brushHandler(context, viewState, toolState);
      break;
    case LINE_TOOL_NAME:
      lineHandler(context, viewState, toolState);
      break;
    case RECTANGLE_TOOL_NAME:
      rectangleHandler(context, viewState, toolState);
      break;
    case CIRCLE_TOOL_NAME:
      circleHandler(context, viewState, toolState);
      break;
    case FIGURE_TOOL_NAME:
      figureHandler(context, viewState, toolState);
      break;
    default: console.log('Unrecognized tool name');
  }
};
