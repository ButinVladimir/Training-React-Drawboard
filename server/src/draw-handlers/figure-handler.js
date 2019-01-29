export const FIGURE_TOOL_NAME = 'Figure';

export default (context, viewState, toolState) => {
  if (toolState.points.length > 0) {
    context.beginPath();
    context.moveTo(toolState.points[0][0], toolState.points[0][1]);

    toolState.points.forEach((coords) => {
      context.lineTo(coords[0], coords[1]);
    });

    if (toolState.isAddingPoints) {
      context.lineTo(toolState.clientX, toolState.clientY);
    }

    context.closePath();

    if (toolState.addFill) {
      context.fillStyle = toolState.fillColor; // eslint-disable-line no-param-reassign
      context.fill();
    }

    if (toolState.addBorder) {
      const lineWidth = toolState.borderWidth * viewState.zoom;
      context.lineWidth = lineWidth; // eslint-disable-line no-param-reassign
      context.strokeStyle = toolState.borderColor; // eslint-disable-line no-param-reassign
      context.stroke();
    }
  }
};
