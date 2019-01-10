import React from 'react';
import BaseTool from '../BaseTool';
import CircleToolOptions from './CircleToolOptionsContainer';

const CIRCLE_TOOL_NAME = 'Circle';

class CircleTool extends BaseTool {
  constructor(canvas) {
    super(canvas);

    this.onChangeAddBorder = this.onChangeAddBorder.bind(this);
    this.onSelectBorderWidth = this.onSelectBorderWidth.bind(this);
    this.onSelectBorderColor = this.onSelectBorderColor.bind(this);
    this.onChangeAddFill = this.onChangeAddFill.bind(this);
    this.onSelectFillColor = this.onSelectFillColor.bind(this);
    this.draw = this.draw.bind(this);

    this.addBorder = true;
    this.borderWidth = 1;
    this.borderColor = '#000000';
    this.addFill = true;
    this.fillColor = '#ff0000';

    this.anchorX = 0;
    this.anchorY = 0;
  }

  static get name() {
    return CIRCLE_TOOL_NAME;
  }

  onChangeAddBorder(addBorder) {
    this.addBorder = addBorder;
  }

  onSelectBorderWidth(borderWidth) {
    this.borderWidth = borderWidth;
  }

  onSelectBorderColor(borderColor) {
    this.borderColor = borderColor;
  }

  onChangeAddFill(addFill) {
    this.addFill = addFill;
  }

  onSelectFillColor(fillColor) {
    this.fillColor = fillColor;
  }

  onMouseDown(event) {
    super.onMouseDown(event);
    this.anchorX = event.clientX;
    this.anchorY = event.clientY;
    this.canvas.updateAndShowBuffer(this.draw, event);
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      this.canvas.updateAndShowBuffer(this.draw, event);
    }
  }

  onMouseUp(event) {
    super.onMouseUp(event);
    this.canvas.appendBuffer();
  }

  draw(context, event) {
    const radius = Math.sqrt(
      ((event.clientX - this.anchorX) ** 2) + ((event.clientY - this.anchorY) ** 2),
    );
    context.beginPath();
    context.arc(this.anchorX, this.anchorY, radius, 0, Math.PI * 2);

    if (this.addFill) {
      context.fillStyle = this.fillColor; // eslint-disable-line no-param-reassign
      context.fill();
    }

    if (this.addBorder) {
      const lineWidth = this.borderWidth * this.canvas.zoom;
      context.lineWidth = lineWidth; // eslint-disable-line no-param-reassign
      context.strokeStyle = this.borderColor; // eslint-disable-line no-param-reassign
      context.stroke();
    }
  }

  get optionsElement() {
    return (
      <CircleToolOptions
        addBorder={this.addBorder}
        borderWidth={this.borderWidth}
        borderColor={this.borderColor}
        addFill={this.addFill}
        fillColor={this.fillColor}
        onChangeAddBorder={this.onChangeAddBorder}
        onSelectBorderWidth={this.onSelectBorderWidth}
        onSelectBorderColor={this.onSelectBorderColor}
        onChangeAddFill={this.onChangeAddFill}
        onSelectFillColor={this.onSelectFillColor}
      />
    );
  }
}

export default CircleTool;
