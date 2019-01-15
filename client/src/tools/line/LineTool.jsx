import React from 'react';
import BaseTool from '../BaseTool';
import LineToolState from './LineToolState';
import LineToolStateHandler from './LineToolStateHandler';
import BaseLineToolOptions from '../../components/tools/line/BaseLineToolOptionsContainer';

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
      <BaseLineToolOptions
        key={LINE_TOOL_NAME}
        toolState={this.toolState}
      />
    );
  }

  unserializeState(stateObj) { // eslint-disable-line class-methods-use-this
    return LineToolState.unserialize(stateObj);
  }
}

export default LineTool;
