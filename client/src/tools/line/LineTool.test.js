import { shallow } from 'enzyme';
import LineTool from './LineTool';
import LineToolState from './LineToolState';
import LineToolStateHandler from './LineToolStateHandler';
import Canvas from '../Canvas';

describe('LineTool', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();
    const lineTool = new LineTool(canvas);

    expect(lineTool.canvas).toBeInstanceOf(Canvas);
    expect(lineTool.toolState).toBeInstanceOf(LineToolState);
    expect(lineTool.stateHandler).toBeInstanceOf(LineToolStateHandler);
  });

  it('returns name', () => {
    expect(LineTool.name).toBe('Line');
  });

  it('returns options element', () => {
    const lineTool = new LineTool(null);
    const options = shallow(lineTool.optionsElement);

    expect(options).toMatchSnapshot();
  });

  it('returns deserialized state', () => {
    const serializedObject = {
      anchorX: 1,
      anchorY: 2,
      clientX: 3,
      clientY: 4,
      width: 5,
      color: '#123456',
    };
    const lineTool = new LineTool(null);
    const state = lineTool.deserializeState(serializedObject);

    expect(state).toMatchObject(serializedObject);
  });
});
