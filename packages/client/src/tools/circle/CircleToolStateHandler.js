import BaseToolStateHandler from '../BaseToolStateHandler';

class CircleToolStateHandler extends BaseToolStateHandler {
  onMouseMove(toolState) {
    this.canvas.updateAndShowBuffer(this, toolState);
  }

  onMouseUp(toolState) { // eslint-disable-line class-methods-use-this
    this.canvas.appendBuffer();
    toolState.fixRelativeCoords(this.canvas.containerPositionX, this.canvas.containerPositionY);

    return toolState.serialize();
  }

  applyState(context, viewState, toolState) { // eslint-disable-line class-methods-use-this
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
  }
}

export default CircleToolStateHandler;
