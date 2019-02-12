import { shallow } from 'enzyme';
import FigureTool from './FigureTool';
import FigureToolState from './FigureToolState';
import FigureToolStateHandler from './FigureToolStateHandler';
import Canvas from '../Canvas';

describe('FigureTool', () => {
  it('is instantiated properly', () => {
    const canvas = new Canvas();
    const figureTool = new FigureTool(canvas);

    expect(figureTool.canvas).toBeInstanceOf(Canvas);
    expect(figureTool.toolState).toBeInstanceOf(FigureToolState);
    expect(figureTool.stateHandler).toBeInstanceOf(FigureToolStateHandler);
  });

  it('returns name', () => {
    expect(FigureTool.name).toBe('Figure');
  });

  it('returns options element', () => {
    const figureTool = new FigureTool(null);
    const options = shallow(figureTool.optionsElement);

    expect(options).toMatchSnapshot();
  });

  it('handles OnSelect event', () => {
    const canvas = new Canvas();
    canvas.screenCanvas = document.createElement('canvas');
    const figureTool = new FigureTool(canvas);
    const restoreSpy = jest.spyOn(figureTool.toolState, 'restore');

    figureTool.onSelect();
    expect(restoreSpy).toHaveBeenCalled();
  });

  it('returns deserialized state', () => {
    const serializedObject = {
      points: [[1, 2], [30, 40]],
      addBorder: true,
      borderwidth: 5,
      borderColor: '#123456',
      addFill: false,
      fillcolor: '#abcdef',
    };
    const figureTool = new FigureTool(null);
    const state = figureTool.deserializeState(serializedObject);

    expect(state).toMatchObject(serializedObject);
  });
});
