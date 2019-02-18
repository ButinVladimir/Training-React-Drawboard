import React from 'react';
import BaseTool from '../BaseTool';
import CircleToolState from './CircleToolState';
import CircleToolStateHandler from './CircleToolStateHandler';
import BaseFigureToolOptions from '../../components/tools/figure/BaseFigureToolOptionsContainer';

const CIRCLE_TOOL_NAME = 'Circle';

class CircleTool extends BaseTool {
  constructor(canvas) {
    super(canvas, new CircleToolState(), new CircleToolStateHandler(canvas));
  }

  static get name() {
    return CIRCLE_TOOL_NAME;
  }

  get optionsElement() {
    return (
      <BaseFigureToolOptions
        key={CIRCLE_TOOL_NAME}
        toolState={this.toolState}
      />
    );
  }

  deserializeState(stateObj) { // eslint-disable-line class-methods-use-this
    return CircleToolState.deserialize(stateObj);
  }
}

export default CircleTool;
