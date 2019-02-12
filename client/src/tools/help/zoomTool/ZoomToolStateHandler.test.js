import ZoomToolState from './ZoomToolState';
import ZoomToolStateHandler from './ZoomToolStateHandler';
import Canvas from '../../Canvas';

describe('ZoomToolStateHandler', () => {
  it('changes view state', () => {
    const canvas = new Canvas();
    const stateHandler = new ZoomToolStateHandler(canvas);

    const toolState = new ZoomToolState();
    toolState.onMouseDown({ clientX: 0, clientY: 0 });
    toolState.onMouseMove({ clientX: 100, clientY: 7 });

    const changeZoomSpy = jest.spyOn(canvas.viewState, 'changeZoom');
    stateHandler.changeViewState(toolState);

    expect(changeZoomSpy).toHaveBeenCalledTimes(1);
    expect(changeZoomSpy).toHaveBeenCalledWith(1.5);
  });
});
