import React from 'react';
import BaseTool from '../BaseTool';
import RectangleToolState from './RectangleToolState';
import RectangleToolStateHandler from './RectangleToolStateHandler';
import BaseFigureToolOptions from '../../components/tools/figure/BaseFigureToolOptionsContainer';

const RECTANGLE_TOOL_NAME = 'Rectangle';

class RectangleTool extends BaseTool {
  constructor(canvas) {
    super(canvas, new RectangleToolState(), new RectangleToolStateHandler(canvas));
  }

  static get name() {
    return RECTANGLE_TOOL_NAME;
  }

  get optionsElement() {
    return (
      <BaseFigureToolOptions
        key={RECTANGLE_TOOL_NAME}
        toolState={this.toolState}
      />
    );
  }

  deserializeState(stateObj) { // eslint-disable-line class-methods-use-this
    return RectangleToolState.deserialize(stateObj);
  }
}

export default RectangleTool;
