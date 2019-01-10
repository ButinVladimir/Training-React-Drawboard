import React from 'react';
import BaseTool from '../BaseTool';
import LineToolOptions from './LineToolOptionsContainer';

const LINE_TOOL_NAME = 'Line';

class LineTool extends BaseTool {
  constructor(canvas) {
    super(canvas);

    this.onSelectWidth = this.onSelectWidth.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);
    this.draw = this.draw.bind(this);

    this.width = 1;
    this.color = '#000000';
  }

  static get name() {
    return LINE_TOOL_NAME;
  }

  onSelectWidth(width) {
    this.width = width;
  }

  onSelectColor(color) {
    this.color = color;
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
    context.lineWidth = this.width * this.canvas.zoom; // eslint-disable-line no-param-reassign
    context.strokeStyle = this.color; // eslint-disable-line no-param-reassign
    context.beginPath();
    context.moveTo(this.anchorX, this.anchorY);
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
  }

  get optionsElement() {
    return (
      <LineToolOptions
        width={this.width}
        color={this.color}
        onSelectWidth={this.onSelectWidth}
        onSelectColor={this.onSelectColor}
      />
    );
  }
}

export default LineTool;
