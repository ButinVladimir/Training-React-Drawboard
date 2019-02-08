import BaseTool from './BaseTool';

class ToolsProvider {
  constructor(canvas) {
    this.registeredTools = new Map();
    this.canvas = canvas;
  }

  registerTool(ToolConstructor) {
    if (ToolConstructor === null || !(ToolConstructor instanceof Function)) {
      throw new TypeError('ToolConstructor must be an constructor of any class extending BaseTool');
    }

    const { name } = ToolConstructor;
    if (name === null || !(typeof name === 'string')) {
      throw new TypeError('Tool name must be a string');
    }

    if (this.registeredTools.has(name)) {
      throw new Error(`${name} has been already registered within the provider`);
    }

    const tool = new ToolConstructor(this.canvas);

    if (tool === null || !(tool instanceof BaseTool)) {
      throw new TypeError('Tool must be an instance of any class extending BaseTool');
    }

    this.registeredTools.set(name, tool);
  }

  getTool(name) {
    if (name === null || !(typeof name === 'string')) {
      throw new TypeError('Tool name must be a string');
    }

    if (!this.registeredTools.has(name)) {
      throw new Error(`${name} is not registered within the provider`);
    }

    return this.registeredTools.get(name);
  }

  getToolsNames() {
    return Array.from(this.registeredTools.keys());
  }
}

export default ToolsProvider;
