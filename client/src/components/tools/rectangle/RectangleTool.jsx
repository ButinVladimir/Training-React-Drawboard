import React from 'react';
import BaseTool from '../BaseTool';
import RectangleToolOptions from './RectangleToolOptionsContainer';

const RECTANGLE_TOOL_NAME = 'Rectangle';

class RectangleTool extends BaseTool {
  constructor() {
    super();

    this.onSelectWidth = this.onSelectWidth.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);

    this.width = 1;
    this.color = '#000000';
  }

  get name() {
    return RECTANGLE_TOOL_NAME;
  }

  onSelectWidth(width) {
    this.width = width;
  }

  onSelectColor(color) {
    this.color = color;
  }

  get optionsElement() {
    return (
      <RectangleToolOptions
        width={this.width}
        color={this.color}
        onSelectWidth={this.onSelectWidth}
        onSelectColor={this.onSelectColor}
      />
    );
  }
}

export default RectangleTool;
