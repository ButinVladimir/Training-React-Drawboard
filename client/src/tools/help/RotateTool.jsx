import React from 'react';
import BaseTool from '../BaseTool';
import ToolOptions from './ToolOptionsContainer';
import { DEFAULT_ROTATION } from '../Canvas';

const ROTATE_TOOL_NAME = 'Rotate';
const DEFAULT_SPEED = 200.0;

class RotateTool extends BaseTool {
  constructor(canvas) {
    super(canvas);

    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.onRestore = this.onRestore.bind(this);
    this.anchor = 0;
    this.initialRotation = 0;

    this.speed = DEFAULT_SPEED;
  }

  static get name() {
    return ROTATE_TOOL_NAME;
  }

  onChangeSpeed(speed) {
    this.speed = speed;
  }

  onRestore() {
    this.canvas.changeRotation(DEFAULT_ROTATION);
  }

  onMouseDown(event) {
    super.onMouseDown(event);
    this.anchor = event.clientX;
    this.initialRotation = this.canvas.rotation;
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      this.canvas.changeRotation(
        this.initialRotation - (event.clientX - this.anchor) / this.speed,
      );
    }
  }

  get optionsElement() {
    const currentValue = `${this.canvas.rotation}`;

    return (
      <ToolOptions
        key={ROTATE_TOOL_NAME}
        speed={this.speed}
        currentValue={currentValue}
        defaultSpeed={DEFAULT_SPEED}
        onChangeSpeed={this.onChangeSpeed}
        onRestore={this.onRestore}
      />
    );
  }
}

export default RotateTool;
