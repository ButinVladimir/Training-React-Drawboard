import React from 'react';
import BaseTool from '../BaseTool';
import LineToolOptions from './LineToolOptionsContainer';

const LINE_TOOL_NAME = 'Line';

class LineTool extends BaseTool {
  constructor() {
    super();

    this.onSelectWidth = this.onSelectWidth.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);

    this.width = 1;
    this.color = '#000000';
  }

  get name() {
    return LINE_TOOL_NAME;
  }

  onSelectWidth(width) {
    this.width = width;
  }

  onSelectColor(color) {
    this.color = color;
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
