import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import SocketService from './socketService/SocketService';
import * as socketEvents from './socketService/socket-events';
import ToolsProvider from './tools/ToolsProvider';
import addTools from './tools/addTools';
import Canvas from './tools/Canvas';

describe('App', () => {
  it('renders properly', () => {
    const socketService = new SocketService();
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    addTools(toolsProvider);

    const component = shallow(<App
      socketService={socketService}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    expect(component).toMatchSnapshot();
  });

  it('connects', () => {
    const socketService = new SocketService();
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);

    const component = shallow(<App
      socketService={socketService}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const instance = component.instance();
    const roomName = 'testRoom';

    expect(component.state().isLoggedIn).toBe(false);

    instance.onLogin(roomName);
    socketService.io.mockHandlers.get(socketEvents.CONNECT)();
    socketService.io.mockHandlers.get(socketEvents.CONNECTION_ESTABLISHED)();

    expect(socketService.io.connect).toHaveBeenCalled();
    expect(socketService.io.emit).toHaveBeenCalledTimes(1);
    expect(socketService.io.emit).toHaveBeenCalledWith(socketEvents.JOIN_ROOM, roomName);
    expect(component.state().isLoggedIn).toBe(true);
  });

  it('registers error handlers', () => {
    const socketService = new SocketService();
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    socketService.setErrorHandlers = jest.fn();
    const errorHandlerCallback = jest.fn();

    const component = shallow(<App
      socketService={socketService}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const instance = component.instance();

    instance.registerErrorHandlers(errorHandlerCallback);

    expect(socketService.setErrorHandlers).toHaveBeenCalledWith(errorHandlerCallback);
  });

  it('registers draw handler', () => {
    const socketService = new SocketService();
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    socketService.setDrawHandler = jest.fn();
    const drawHandlerCallback = jest.fn();

    const component = shallow(<App
      socketService={socketService}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const instance = component.instance();

    instance.registerDrawHandler(drawHandlerCallback);

    expect(socketService.setDrawHandler).toHaveBeenCalledWith(drawHandlerCallback);
  });

  it('registers get image handler', () => {
    const socketService = new SocketService();
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);
    socketService.setGetImageHandler = jest.fn();
    const getImageCallback = jest.fn();

    const component = shallow(<App
      socketService={socketService}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const instance = component.instance();

    instance.registerGetImageHandler(getImageCallback);

    expect(socketService.setGetImageHandler).toHaveBeenCalledWith(getImageCallback);
  });

  it('emits Draw event', () => {
    const socketService = new SocketService();
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);

    const component = shallow(<App
      socketService={socketService}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const instance = component.instance();
    const arg = {};
    instance.emitDrawEvent(arg);

    expect(socketService.io.emit).toHaveBeenCalledTimes(1);
    expect(socketService.io.emit).toHaveBeenCalledWith(socketEvents.DRAW, arg);
  });

  it('emits GetImage event', () => {
    const socketService = new SocketService();
    const canvas = new Canvas();
    const toolsProvider = new ToolsProvider(canvas);

    const component = shallow(<App
      socketService={socketService}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />);

    const instance = component.instance();
    instance.emitGetImageEvent();

    expect(socketService.io.emit).toHaveBeenCalledTimes(1);
    expect(socketService.io.emit).toHaveBeenCalledWith(socketEvents.GET_IMAGE);
  });
});
