import React from 'react';
import BaseTool from '../BaseTool';
import LineToolState from './LineToolState';
import LineToolStateHandler from './LineToolStateHandler';
import LineToolOptions from './LineToolOptionsContainer';

const LINE_TOOL_NAME = 'Line';

class LineTool extends BaseTool {
  constructor(canvas) {
    super(canvas);

    this.toolState = new LineToolState();
    this.stateHandler = new LineToolStateHandler(canvas);
  }

  static get name() {
    return LINE_TOOL_NAME;
  }

  get optionsElement() {
    return (
      <LineToolOptions
        toolState={this.toolState}
      />
    );
  }
}

export default LineTool;
