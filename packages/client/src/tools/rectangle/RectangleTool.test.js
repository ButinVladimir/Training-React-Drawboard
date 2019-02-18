import { shallow } from 'enzyme';
import RectangleTool from './RectangleTool';
import RectangleToolState from './RectangleToolState';
import RectangleToolStateHandler from './RectangleToolStateHandler';
import Canvas from '../Canvas';

describe('RectangleTool', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();
    const rectangleTool = new RectangleTool(canvas);

    expect(rectangleTool.canvas).toBeInstanceOf(Canvas);
    expect(rectangleTool.toolState).toBeInstanceOf(RectangleToolState);
    expect(rectangleTool.stateHandler).toBeInstanceOf(RectangleToolStateHandler);
  });

  it('returns name', () => {
    expect(RectangleTool.name).toBe('Rectangle');
  });

  it('returns options element', () => {
    const rectangleTool = new RectangleTool(null);
    const options = shallow(rectangleTool.optionsElement);

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
    const rectangleTool = new RectangleTool(null);
    const state = rectangleTool.deserializeState(serializedObject);

    expect(state).toMatchObject(serializedObject);
  });
});
