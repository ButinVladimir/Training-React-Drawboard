import BaseToolStateHandler from '../BaseToolStateHandler';

class LineToolStateHandler extends BaseToolStateHandler {
  onMouseMove(toolState) {
    this.canvas.updateAndShowBuffer(this, toolState);
  }

  onMouseUp(toolState) { // eslint-disable-line class-methods-use-this
    this.canvas.appendBuffer();
    toolState.fixRelativeCoords(this.canvas.containerPositionX, this.canvas.containerPositionY);

    return toolState;
  }

  applyState(context, viewState, toolState) { // eslint-disable-line class-methods-use-this
    const width = toolState.width * viewState.zoom;
    context.lineWidth = width; // eslint-disable-line no-param-reassign
    context.strokeStyle = toolState.color; // eslint-disable-line no-param-reassign

    context.beginPath();
    context.moveTo(toolState.anchorX, toolState.anchorY);
    context.lineTo(toolState.clientX, toolState.clientY);
    context.stroke();
  }
}

export default LineToolStateHandler;
