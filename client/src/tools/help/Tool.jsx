import React from 'react';
import BaseTool from '../BaseTool';
import ToolOptions from './ToolOptionsContainer';

const DEFAULT_TOOL_KEY = 'toolKey';

class Tool extends BaseTool {
  constructor(canvas) {
    super(canvas);

    this.toolKey = DEFAULT_TOOL_KEY;

    this.onRestore = this.onRestore.bind(this);
  }

  onRestore() {
    this.stateHandler.restore(this.toolState);
  }

  get optionsElement() {
    return (
      <ToolOptions
        key={this.toolKey}
        toolState={this.toolState}
        onRestore={this.onRestore}
      />
    );
  }
}

export default Tool;
