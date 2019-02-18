import BaseTool from './BaseTool';
import ToolsProvider from './ToolsProvider';

describe('ToolsProvider', () => {
  let canvas;
  let toolsProvider;

  class ValidTool extends BaseTool { static get name() { return 'name'; } }

  beforeEach(() => {
    canvas = {};
    toolsProvider = new ToolsProvider(canvas);
  });

  it('is instantiated properly', () => {
    expect(toolsProvider).toMatchObject({
      canvas,
    });
  });

  it('registers tool properly', () => {
    expect(() => { toolsProvider.registerTool(ValidTool); }).not.toThrow();
  });

  it('throws an error when ToolConstructor has invalid type', () => {
    const expectedError = 'ToolConstructor must be an constructor of any class extending BaseTool';

    [null, 1, undefined, false, 'abc']
      .forEach((v) => {
        expect(() => { toolsProvider.registerTool(v); }).toThrow(expectedError);
      });
  });

  it('throws an error when ToolConstructor name has invalid type', () => {
    const expectedError = 'Tool name must be a string';
    let value;
    class InvalidTool extends BaseTool { static get name() { return value; } }

    [null, 1, undefined, false]
      .forEach((v) => {
        expect(() => {
          value = v;
          toolsProvider.registerTool(InvalidTool);
        }).toThrow(expectedError);
      });
  });

  it('throws an error when ToolConstructor returns object with incorrect type', () => {
    const expectedError = 'Tool must be an instance of any class extending BaseTool';
    let value;
    function toolConstructor() { return value; }

    [null, 1, undefined, false, 'abc', []]
      .forEach((v) => {
        expect(() => {
          value = v;
          toolsProvider.registerTool(toolConstructor);
        }).toThrow(expectedError);
      });
  });

  it('throws an error when registers same tool twice', () => {
    expect(() => { toolsProvider.registerTool(ValidTool); }).not.toThrow();
    expect(() => { toolsProvider.registerTool(ValidTool); }).toThrow(
      'name has been already registered within the provider',
    );
  });

  it('returns registered tool', () => {
    toolsProvider.registerTool(ValidTool);

    expect(toolsProvider.getTool('name')).toBeInstanceOf(ValidTool);
  });

  it('throws an error when tool name is invalid', () => {
    [null, 1, undefined, false, []]
      .forEach((v) => {
        expect(() => {
          toolsProvider.getTool(v);
        }).toThrow('Tool name must be a string');
      });
  });

  it('throws an error when tool is not registered', () => {
    expect(() => {
      toolsProvider.getTool('name');
    }).toThrow('name is not registered within the provider');
  });

  it('return tools names when tool is not added', () => {
    expect(toolsProvider.getToolsNames()).toMatchObject([]);
  });

  it('return tools names when tool is added', () => {
    toolsProvider.registerTool(ValidTool);

    expect(toolsProvider.getToolsNames()).toMatchObject(['name']);
  });
});
