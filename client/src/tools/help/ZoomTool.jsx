import React from 'react';
import BaseTool from '../BaseTool';
import ToolOptions from './ToolOptionsContainer';
import { DEFAULT_ZOOM } from '../Canvas';

const ZOOM_TOOL_NAME = 'Zoom';
const DEFAULT_SPEED = 200.0;

class ZoomTool extends BaseTool {
  constructor(canvas) {
    super(canvas);

    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.onRestore = this.onRestore.bind(this);
    this.anchor = 0;
    this.initialRotation = 0;

    this.speed = DEFAULT_SPEED;
  }

  static get name() {
    return ZOOM_TOOL_NAME;
  }

  onChangeSpeed(speed) {
    this.speed = speed;
  }

  onRestore() {
    this.canvas.changeZoom(DEFAULT_ZOOM);
  }

  onMouseDown(event) {
    super.onMouseDown(event);
    this.anchor = event.clientX;
    this.initialRotation = this.canvas.zoom;
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      this.canvas.changeZoom(
        this.initialRotation + (event.clientX - this.anchor) / this.speed,
      );
    }
  }

  get optionsElement() {
    return (
      <ToolOptions
        key={ZOOM_TOOL_NAME}
        speed={this.speed}
        defaultSpeed={DEFAULT_SPEED}
        onChangeSpeed={this.onChangeSpeed}
        onRestore={this.onRestore}
      />
    );
  }
}

export default ZoomTool;
