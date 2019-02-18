import React from 'react';
import { mount } from 'enzyme';
import BoardPageContainer from './BoardPageContainer';
import ToolsProvider from '../../../tools/ToolsProvider';
import addTools from '../../../tools/addTools';
import Canvas from '../../../tools/Canvas';
import ViewState from '../../../tools/ViewState';
import LineToolState from '../../../tools/line/LineToolState';

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
    instance.onDrawSingleOperation = jest.fn();

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
    expect(instance.onDrawSingleOperation).not.toHaveBeenCalled();
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

  it('handles onDrawSingleOperation event', () => {
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

    const applyStateSpy = jest.spyOn(canvas, 'applyState');
    const instance = component.instance();
    instance.bufferLoaded = true;

    const viewState = new ViewState();
    const toolName = 'Line';
    const toolState = new LineToolState();
    toolState.color = '#aaa';
    toolState.width = 3;

    onDraw(viewState.serialize(), toolName, toolState.serialize());

    expect(applyStateSpy).toHaveBeenCalledTimes(1);
    expect(applyStateSpy.mock.calls.length).toBe(1);
    expect(applyStateSpy.mock.calls[0][0]).toBe(toolsProvider.getTool(toolName).stateHandler);
    expect(applyStateSpy.mock.calls[0][1]).toMatchObject(viewState);
    expect(applyStateSpy.mock.calls[0][2]).toMatchObject(toolState);
  });

  it('handles onChangeTool event', () => {
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={() => {}}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const instance = component.instance();
    const toolName = 'Line';
    const tool = toolsProvider.getTool(toolName);
    const onSelectSpy = jest.spyOn(tool, 'onSelect');

    expect(component.state().selectedToolName).not.toBe(toolName);

    instance.onChangeTool(toolName);

    expect(onSelectSpy).toHaveBeenCalled();
    expect(component.state().selectedToolName).toBe(toolName);
  });

  it('handles onMouseDown event', () => {
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={() => {}}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const event = { clientX: 5, clientY: 10 };
    const tool = toolsProvider.getTool(toolsProvider.getToolsNames()[0]);
    const onMouseDownSpy = jest.spyOn(tool.screenHandler, 'onMouseDown');

    component.instance().onMouseDown(event);

    expect(onMouseDownSpy).toHaveBeenCalledWith(event);
  });

  it('handles onMouseUp event when select tool is Move', () => {
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={() => {}}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const onMouseDownEvent = { clientX: 5, clientY: 5 };
    const onMouseMoveEvent = { clientX: 15, clientY: 15 };
    const toolName = 'Move';
    const tool = toolsProvider.getTool(toolName);
    const onMouseUpSpy = jest.spyOn(tool.screenHandler, 'onMouseUp');

    const instance = component.instance();
    instance.onChangeTool(toolName);
    instance.onMouseDown(onMouseDownEvent);
    instance.onMouseMove(onMouseMoveEvent);
    instance.onMouseUp();

    expect(onMouseUpSpy).toHaveBeenCalled();
    expect(onMouseUpSpy).toHaveReturnedWith(null);
  });

  it('handles onMouseUp event when select tool is Line', () => {
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);
    const emitDrawEventMock = jest.fn();

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={() => {}}
      registerGetImageHandler={() => {}}
      emitDrawEvent={emitDrawEventMock}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const onMouseDownEvent = { clientX: 5, clientY: 5 };
    const onMouseMoveEvent = { clientX: 15, clientY: 15 };
    const toolName = 'Line';
    const tool = toolsProvider.getTool(toolName);
    const onMouseUpSpy = jest.spyOn(tool.screenHandler, 'onMouseUp');

    const instance = component.instance();
    instance.onChangeTool(toolName);
    instance.onMouseDown(onMouseDownEvent);
    instance.onMouseMove(onMouseMoveEvent);
    instance.onMouseUp();

    expect(onMouseUpSpy).toHaveBeenCalled();
    expect(onMouseUpSpy).not.toHaveReturnedWith(null);
    expect(emitDrawEventMock.mock.calls.length).toBe(1);
    expect(emitDrawEventMock.mock.calls[0]).toMatchObject([
      canvas.viewState.serialize(),
      toolName,
      tool.toolState.serialize(),
    ]);
  });

  it('handles onMouseMove event', () => {
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);

    const component = mount(<BoardPageContainer
      registerErrorHandlers={() => {}}
      registerDrawHandler={() => {}}
      registerGetImageHandler={() => {}}
      emitDrawEvent={() => {}}
      emitGetImageEvent={() => {}}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const event = { clientX: 5, clientY: 10 };
    const tool = toolsProvider.getTool(toolsProvider.getToolsNames()[0]);
    const onMouseMoveSpy = jest.spyOn(tool.screenHandler, 'onMouseMove');

    component.instance().onMouseMove(event);

    expect(onMouseMoveSpy).toHaveBeenCalledWith(event);
  });
});
