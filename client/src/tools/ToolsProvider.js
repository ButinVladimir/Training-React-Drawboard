import BaseTool from '../components/tools/BaseTool';

class ToolsProvider {
  constructor() {
    this.registeredTools = new Map();
  }

  registerTool(tool) {
    if (tool === null || !(tool instanceof BaseTool)) {
      throw new TypeError('Tool must be an instance of any class extending BaseTool');
    }

    const { name } = tool;
    if (this.registeredTools.has(name)) {
      throw new Error(`${name} has been already registered within the provider`);
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
