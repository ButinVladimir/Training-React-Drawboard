import BaseToolStateHandler from '../BaseToolStateHandler';

class BrushToolStateHandler extends BaseToolStateHandler {
  onMouseMove(toolState) {
    this.canvas.updateAndShowBuffer(this, toolState);
  }

  onMouseUp(toolState) { // eslint-disable-line class-methods-use-this
    toolState.onMouseUp();

    this.canvas.appendBuffer();
    toolState.fixRelativeCoords(this.canvas.containerPositionX, this.canvas.containerPositionY);

    return toolState.serialize();
  }

  applyState(context, viewState, toolState) { // eslint-disable-line class-methods-use-this
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
  }
}

export default BrushToolStateHandler;
