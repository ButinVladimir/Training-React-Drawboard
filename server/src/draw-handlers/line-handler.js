export const LINE_TOOL_NAME = 'Line';

export default (context, viewState, toolState) => {
  const width = toolState.width * viewState.zoom;
  context.lineWidth = width; // eslint-disable-line no-param-reassign
  context.strokeStyle = toolState.color; // eslint-disable-line no-param-reassign

  context.beginPath();
  context.moveTo(toolState.anchorX, toolState.anchorY);
  context.lineTo(toolState.clientX, toolState.clientY);
  context.stroke();
};
