import React from 'react';
import { mount } from 'enzyme';
import BoardPageContainer from './BoardPageContainer';
import ToolsProvider from '../../../tools/ToolsProvider';
import addTools from '../../../tools/addTools';
import Canvas from '../../../tools/Canvas';

describe('BoardPageContainer', () => {
  it('renders properly', () => {
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);
    const emitGetImageEventMock = jest.fn();
    const windowAddEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const outputCompletelySpy = jest.spyOn(canvas, 'outputCompletely');

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={() => {}}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={emitGetImageEventMock}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);
    const state = component.state();

    expect(component).toMatchSnapshot();
    expect(state).toMatchObject({
      errorMessage: '',
      selectedToolName: 'Move',
    });
    expect(emitGetImageEventMock).toHaveBeenCalled();
    expect(windowAddEventListenerSpy).toHaveBeenCalled();
    expect(outputCompletelySpy).toHaveBeenCalledTimes(1);
  });

  it('unnmounts properly', () => {
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);
    const windowRemoveEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={() => {}}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    component.unmount();

    expect(windowRemoveEventListenerSpy).toHaveBeenCalled();
  });


  it('handles onResize event', () => {
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);
    const outputCompletelySpy = jest.spyOn(canvas, 'outputCompletely');

    mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={() => {}}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    window.dispatchEvent(new Event('resize'));
    expect(outputCompletelySpy).toHaveBeenCalledTimes(2);
  });

  it('handles onError event', () => {
    const errorMessage = 'An error occurred';
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);
    let onError;

    const component = mount(<BoardPageContainer
      registerErrorHandlers={(cb) => { onError = cb; }}
      registerDrawHandler={() => {}}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    onError(errorMessage);
    const state = component.state();

    expect(state).toMatchObject({ errorMessage });
  });

  it('handles onDraw event when buffer is not loaded', async () => {
    let onDraw;
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={(cb) => { onDraw = cb; }}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const instance = component.instance();

    expect(instance.buffer.length).toBe(0);

    const viewStateObj = {};
    const toolName = 'toolName';
    const toolStateObj = {};

    onDraw(viewStateObj, toolName, toolStateObj);

    expect(instance.buffer).toMatchObject([
      {
        viewStateObj,
        toolName,
        toolStateObj,
      },
    ]);
  });

  it('handles onDraw event when buffer is loaded', async () => {
    let onDraw;
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={(cb) => { onDraw = cb; }}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const instance = component.instance();
    instance.bufferLoaded = true;
    instance.onDrawSingleOperation = jest.fn();

    const viewStateObj = {};
    const toolName = 'toolName';
    const toolStateObj = {};

    onDraw(viewStateObj, toolName, toolStateObj);

    expect(instance.buffer.length).toBe(0);
    expect(instance.onDrawSingleOperation).toHaveBeenCalledWith(
      viewStateObj,
      toolName,
      toolStateObj,
    );
  });

  it('handles onGetImage event', async () => {
    let getImage;
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={() => {}}
      registerGetImageHandler={(cb) => { getImage = cb; }}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    canvas.addPreloadedImage = jest.fn();
    const instance = component.instance();
    instance.buffer = [1, 2, 3];
    instance.onDrawSingleOperation = jest.fn();

    await getImage();

    expect(canvas.addPreloadedImage).toHaveBeenCalled();
    expect(instance.onDrawSingleOperation).toHaveBeenCalledTimes(3);
    expect(instance.bufferLoaded).toBe(true);
  });
});
