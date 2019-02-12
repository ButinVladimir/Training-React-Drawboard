import { shallow } from 'enzyme';
import BrushTool from './BrushTool';
import BrushToolState from './BrushToolState';
import BrushToolStateHandler from './BrushToolStateHandler';
import Canvas from '../Canvas';

describe('BrushTool', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();
    const brushTool = new BrushTool(canvas);

    expect(brushTool.canvas).toBeInstanceOf(Canvas);
    expect(brushTool.toolState).toBeInstanceOf(BrushToolState);
    expect(brushTool.stateHandler).toBeInstanceOf(BrushToolStateHandler);
  });

  it('returns name', () => {
    expect(BrushTool.name).toBe('Brush');
  });

  it('returns options element', () => {
    const brushTool = new BrushTool(null);
    const options = shallow(brushTool.optionsElement);

    expect(options).toMatchSnapshot();
  });

  it('returns deserialized state', () => {
    const serializedObject = {
      points: [[1, 2], [3, 4]],
      width: 5,
      color: '#123456',
    };
    const brushTool = new BrushTool(null);
    const state = brushTool.deserializeState(serializedObject);

    expect(state).toMatchObject(serializedObject);
  });
});
