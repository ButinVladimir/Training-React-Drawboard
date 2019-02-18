import BaseToolStateHandler from '../BaseToolStateHandler';

class RectangleToolStateHandler extends BaseToolStateHandler {
  onMouseMove(toolState) {
    this.canvas.updateAndShowBuffer(this, toolState);
  }

  onMouseUp(toolState) { // eslint-disable-line class-methods-use-this
    this.canvas.appendBuffer();
    toolState.fixRelativeCoords(this.canvas.containerPositionX, this.canvas.containerPositionY);

    return toolState.serialize();
  }

  applyState(context, viewState, toolState) { // eslint-disable-line class-methods-use-this
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
  }
}

export default RectangleToolStateHandler;
