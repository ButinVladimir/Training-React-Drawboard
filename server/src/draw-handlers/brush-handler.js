export const BRUSH_TOOL_NAME = 'Brush';

export default (context, viewState, toolState) => {
  if (toolState.points.length > 0) {
    context.beginPath();
    context.moveTo(toolState.points[0][0], toolState.points[0][1]);

    toolState.points.forEach((coords) => {
      context.lineTo(coords[0], coords[1]);
    });

    const lineWidth = toolState.width * viewState.zoom;
    context.lineWidth = lineWidth; // eslint-disable-line no-param-reassign
    context.strokeStyle = toolState.color; // eslint-disable-line no-param-reassign
    context.stroke();
  }
};
