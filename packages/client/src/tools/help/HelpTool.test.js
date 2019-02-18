import { shallow } from 'enzyme';
import HelpTool from './HelpTool';
import HelpToolState from './HelpToolState';
import HelpToolStateHandler from './HelpToolStateHandler';
import Canvas from '../Canvas';

describe('HelpTool', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();
    const toolState = new HelpToolState();
    const stateHandler = new HelpToolStateHandler(canvas);
    const helpTool = new HelpTool(canvas, toolState, stateHandler);

    expect(helpTool).toBeInstanceOf(HelpTool);
    expect(helpTool.canvas).toBe(canvas);
    expect(helpTool.toolState).toBe(toolState);
    expect(helpTool.stateHandler).toBe(stateHandler);
    expect(helpTool.toolKey).toBe('toolKey');
  });

  it('restores its state', () => {
    const canvas = new Canvas();
    const toolState = new HelpToolState();
    const stateHandler = {
      restore: jest.fn(),
    };
    const helpTool = new HelpTool(canvas, toolState, stateHandler);

    helpTool.onRestore();

    expect(stateHandler.restore).toHaveBeenCalledTimes(1);
    expect(stateHandler.restore).toHaveBeenCalledWith(toolState);
  });

  it('returns options element', () => {
    const canvas = new Canvas();
    const toolState = new HelpToolState();
    const stateHandler = new HelpToolStateHandler(canvas);
    const helpTool = new HelpTool(canvas, toolState, stateHandler);

    const options = shallow(helpTool.optionsElement);

    expect(options).toMatchSnapshot();
  });
});
