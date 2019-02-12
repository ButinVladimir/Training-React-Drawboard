import RotateToolState from './RotateToolState';
import RotateToolStateHandler from './RotateToolStateHandler';
import Canvas from '../../Canvas';

describe('RotateToolStateHandler', () => {
  it('changes view state', () => {
    const canvas = new Canvas();
    const stateHandler = new RotateToolStateHandler(canvas);

    const toolState = new RotateToolState();
    toolState.onMouseDown({ clientX: 0, clientY: 0 });
    toolState.onMouseMove({ clientX: 200, clientY: 7 });

    const changeRotationSpy = jest.spyOn(canvas.viewState, 'changeRotation');
    stateHandler.changeViewState(toolState);

    expect(changeRotationSpy).toHaveBeenCalledTimes(1);
    expect(changeRotationSpy).toHaveBeenCalledWith(-1);
  });
});
