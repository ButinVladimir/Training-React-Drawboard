import BaseToolStateHandler from '../BaseToolStateHandler';

class FigureToolStateHandler extends BaseToolStateHandler {
  onMouseMove(toolState) {
    this.canvas.updateAndShowBuffer(this, toolState);
  }

  onMouseUp(toolState) { // eslint-disable-line class-methods-use-this
    toolState.onMouseUp();

    if (!toolState.isAddingPoints) {
      this.canvas.appendBuffer();
      toolState.fixRelativeCoords(this.canvas.containerPositionX, this.canvas.containerPositionY);

      return toolState.serialize();
    }

    this.canvas.updateAndShowBuffer(this, toolState);

    return null;
  }

  applyState(context, viewState, toolState) { // eslint-disable-line class-methods-use-this
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
  }
}

export default FigureToolStateHandler;
