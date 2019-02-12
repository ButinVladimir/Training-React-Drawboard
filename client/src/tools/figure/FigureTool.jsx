import React from 'react';
import BaseTool from '../BaseTool';
import FigureToolState from './FigureToolState';
import FigureToolStateHandler from './FigureToolStateHandler';
import BaseFigureToolOptions from '../../components/tools/figure/BaseFigureToolOptionsContainer';

const FIGURE_TOOL_NAME = 'Figure';

class FigureTool extends BaseTool {
  constructor(canvas) {
    super(canvas, new FigureToolState(), new FigureToolStateHandler(canvas));
  }

  static get name() {
    return FIGURE_TOOL_NAME;
  }

  get optionsElement() {
    return (
      <BaseFigureToolOptions
        key={FIGURE_TOOL_NAME}
        toolState={this.toolState}
      />
    );
  }

  onSelect() {
    super.onSelect();

    this.toolState.restore();
  }

  deserializeState(stateObj) { // eslint-disable-line class-methods-use-this
    return FigureToolState.deserialize(stateObj);
  }
}

export default FigureTool;
