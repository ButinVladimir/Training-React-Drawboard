import React from 'react';
import BaseTool from '../BaseTool';
import BrushToolState from './BrushToolState';
import BrushToolStateHandler from './BrushToolStateHandler';
import BaseLineToolOptions from '../../components/tools/line/BaseLineToolOptionsContainer';

const BRUSH_TOOL_NAME = 'Brush';

class BrushTool extends BaseTool {
  constructor(canvas) {
    super(canvas, new BrushToolState(), new BrushToolStateHandler(canvas));
  }

  static get name() {
    return BRUSH_TOOL_NAME;
  }

  get optionsElement() {
    return (
      <BaseLineToolOptions
        key={BRUSH_TOOL_NAME}
        toolState={this.toolState}
      />
    );
  }

  deserializeState(stateObj) { // eslint-disable-line class-methods-use-this
    return BrushToolState.deserialize(stateObj);
  }
}

export default BrushTool;
