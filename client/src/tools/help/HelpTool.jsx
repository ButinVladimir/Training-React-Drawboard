import React from 'react';
import BaseTool from '../BaseTool';
import HelpToolOptions from '../../components/tools/help/HelpToolOptionsContainer';

const DEFAULT_TOOL_KEY = 'toolKey';

class HelpTool extends BaseTool {
  constructor(canvas, toolState, stateHandler) {
    super(canvas, toolState, stateHandler);

    this.toolKey = DEFAULT_TOOL_KEY;

    this.onRestore = this.onRestore.bind(this);
  }

  onRestore() {
    this.stateHandler.restore(this.toolState);
  }

  get optionsElement() {
    return (
      <HelpToolOptions
        key={this.toolKey}
        toolState={this.toolState}
        onRestore={this.onRestore}
      />
    );
  }
}

export default HelpTool;
