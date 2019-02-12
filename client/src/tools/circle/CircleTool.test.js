import { shallow } from 'enzyme';
import CircleTool from './CircleTool';
import CircleToolState from './CircleToolState';
import CircleToolStateHandler from './CircleToolStateHandler';
import Canvas from '../Canvas';

describe('CircleTool', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();
    const circleTool = new CircleTool(canvas);

    expect(circleTool.canvas).toBeInstanceOf(Canvas);
    expect(circleTool.toolState).toBeInstanceOf(CircleToolState);
    expect(circleTool.stateHandler).toBeInstanceOf(CircleToolStateHandler);
  });

  it('returns name', () => {
    expect(CircleTool.name).toBe('Circle');
  });

  it('returns options element', () => {
    const circleTool = new CircleTool(null);
    const options = shallow(circleTool.optionsElement);

    expect(options).toMatchSnapshot();
  });

  it('returns deserialized state', () => {
    const serializedObject = {
      anchorX: 1,
      anchorY: 2,
      clientX: 3,
      clientY: 4,
      addBorder: true,
      borderwidth: 5,
      borderColor: '#123456',
      addFill: false,
      fillcolor: '#abcdef',
    };
    const circleTool = new CircleTool(null);
    const state = circleTool.deserializeState(serializedObject);

    expect(state).toMatchObject(serializedObject);
  });
});
