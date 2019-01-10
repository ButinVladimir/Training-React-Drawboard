import React from 'react';
import BaseTool from '../BaseTool';
import ToolOptions from './ToolOptionsContainer';
import { DEFAULT_DELTA_X, DEFAULT_DELTA_Y } from '../Canvas';

const MOVE_TOOL_NAME = 'Move';
const DEFAULT_SPEED = 1.0;

class MoveTool extends BaseTool {
  constructor(canvas) {
    super(canvas);

    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.onRestore = this.onRestore.bind(this);
    this.anchorX = 0;
    this.anchorY = 0;
    this.initialDeltaX = 0;
    this.initialDeltaY = 0;

    this.speed = DEFAULT_SPEED;
  }

  static get name() {
    return MOVE_TOOL_NAME;
  }

  onChangeSpeed(speed) {
    this.speed = speed;
  }

  onRestore() {
    this.canvas.changeDelta(DEFAULT_DELTA_X, DEFAULT_DELTA_Y);
  }

  onMouseDown(event) {
    super.onMouseDown(event);
    this.anchorX = event.clientX;
    this.anchorY = event.clientY;
    this.initialDeltaX = this.canvas.deltaX;
    this.initialDeltaY = this.canvas.deltaY;
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      this.canvas.changeDelta(
        this.initialDeltaX + (event.clientX - this.anchorX) * this.speed,
        this.initialDeltaY + (event.clientY - this.anchorY) * this.speed,
      );
    }
  }

  get optionsElement() {
    return (
      <ToolOptions
        key={MOVE_TOOL_NAME}
        speed={this.speed}
        defaultSpeed={DEFAULT_SPEED}
        onChangeSpeed={this.onChangeSpeed}
        onRestore={this.onRestore}
      />
    );
  }
}

export default MoveTool;
