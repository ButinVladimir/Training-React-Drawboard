export const CIRCLE_TOOL_NAME = 'Circle';

export default (context, viewState, toolState) => {
  const radius = Math.sqrt(
    ((toolState.clientX - toolState.anchorX) ** 2)
      + ((toolState.clientY - toolState.anchorY) ** 2),
  );
  context.beginPath();
  context.arc(toolState.anchorX, toolState.anchorY, radius, 0, Math.PI * 2);

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
};
