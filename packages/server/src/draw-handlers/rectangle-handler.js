export const RECTANGLE_TOOL_NAME = 'Rectangle';

export default (context, viewState, toolState) => {
  if (toolState.addFill) {
    context.fillStyle = toolState.fillColor; // eslint-disable-line no-param-reassign
    context.fillRect(
      toolState.anchorX,
      toolState.anchorY,
      toolState.clientX - toolState.anchorX,
      toolState.clientY - toolState.anchorY,
    );
  }

  if (toolState.addBorder) {
    const lineWidth = toolState.borderWidth * viewState.zoom;
    context.lineWidth = lineWidth; // eslint-disable-line no-param-reassign
    context.strokeStyle = toolState.borderColor; // eslint-disable-line no-param-reassign
    context.strokeRect(
      toolState.anchorX,
      toolState.anchorY,
      toolState.clientX - toolState.anchorX,
      toolState.clientY - toolState.anchorY,
    );
  }
};
