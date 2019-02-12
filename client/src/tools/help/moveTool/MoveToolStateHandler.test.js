import MoveToolState from './MoveToolState';
import MoveToolStateHandler from './MoveToolStateHandler';
import Canvas from '../../Canvas';

describe('MoveToolStateHandler', () => {
  it('changes view state', () => {
    const canvas = new Canvas();
    const stateHandler = new MoveToolStateHandler(canvas);

    const toolState = new MoveToolState();
    toolState.onMouseDown({ clientX: 0, clientY: 0 });
    toolState.onMouseMove({ clientX: 5, clientY: 7 });

    const changeDeltaSpy = jest.spyOn(canvas.viewState, 'changeDelta');
    stateHandler.changeViewState(toolState);

    expect(changeDeltaSpy).toHaveBeenCalledTimes(1);
    expect(changeDeltaSpy).toHaveBeenCalledWith(5, 7);
  });
});
