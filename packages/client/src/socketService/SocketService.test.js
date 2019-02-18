import SocketService from './SocketService';
import * as socketEvents from './socket-events';

describe('SocketService', () => {
  const url = 'testing.url:9000';
  let backupUrl;

  const addExistingHandlers = (socketService, events, existingHandlerMock) => {
    events.forEach(event => socketService.io.on(event, existingHandlerMock));
  };

  const checkExistingHandlers = (socketService, events, existingHandlerMock) => {
    events.forEach((event) => {
      expect(socketService.io.mockHandlers.get(event)).not.toBe(existingHandlerMock);
    });
  };

  beforeAll(() => {
    backupUrl = process.env.REACT_APP_SERVER_URL;
    process.env.REACT_APP_SERVER_URL = url;
  });

  afterAll(() => {
    process.env.REACT_APP_SERVER_URL = backupUrl;
  });

  it('is instantiated properly', () => {
    const socketService = new SocketService();

    expect(socketService.io.url).toBe(url);
    expect(socketService.io.options).toMatchObject({
      autoConnect: false,
      reconnection: false,
    });
  });

  it('connects', () => {
    const room = 'roomToConnect';
    const socketService = new SocketService();
    const onConnectMock = jest.fn();
    const events = [
      socketEvents.CONNECT,
      socketEvents.CONNECTION_ESTABLISHED,
    ];

    const existingHandlerMock = jest.fn();
    addExistingHandlers(socketService, events, existingHandlerMock);

    socketService.connect(room, onConnectMock);

    expect(socketService.io).toHaveProperty('mockHandlers');
    checkExistingHandlers(socketService, events, existingHandlerMock);
    expect(socketService.io.connect).toHaveBeenCalled();

    socketService.io.mockHandlers.get(socketEvents.CONNECT)();

    expect(socketService.io.emit).toHaveBeenCalledTimes(1);
    expect(socketService.io.emit).toHaveBeenCalledWith(socketEvents.JOIN_ROOM, room);

    socketService.io.mockHandlers.get(socketEvents.CONNECTION_ESTABLISHED)();

    expect(onConnectMock).toHaveBeenCalled();
  });

  it('sets error handlers', () => {
    const socketService = new SocketService();
    const onErrorMock = jest.fn();
    const events = [
      socketEvents.CONNECT_ERROR,
      socketEvents.RECONNECT_ERROR,
      socketEvents.ERROR,
      socketEvents.USER_ERROR,
      socketEvents.DISCONNECT,
    ];

    const existingHandlerMock = jest.fn();
    addExistingHandlers(socketService, events, existingHandlerMock);

    socketService.setErrorHandlers(onErrorMock);

    expect(socketService.io).toHaveProperty('mockHandlers');
    checkExistingHandlers(socketService, events, existingHandlerMock);

    events.forEach(event => socketService.io.mockHandlers.get(event)('some error'));

    expect(onErrorMock).toHaveBeenCalledTimes(5);
    expect(onErrorMock).toHaveBeenNthCalledWith(1, 'Cannot connect to the server');
    expect(onErrorMock).toHaveBeenNthCalledWith(2, 'Cannot reconnect to the server');
    expect(onErrorMock).toHaveBeenNthCalledWith(3, 'An error occured: some error');
    expect(onErrorMock).toHaveBeenNthCalledWith(4, 'An error occured: some error');
    expect(onErrorMock).toHaveBeenNthCalledWith(5, 'An disconnect occured');
  });

  it('sets draw handler', () => {
    const socketService = new SocketService();
    const events = [socketEvents.DRAW];
    const onDrawMock = jest.fn();

    const existingHandlerMock = jest.fn();
    addExistingHandlers(socketService, events, existingHandlerMock);

    socketService.setDrawHandler(onDrawMock);

    expect(socketService.io).toHaveProperty('mockHandlers');
    checkExistingHandlers(socketService, events, existingHandlerMock);
    expect(socketService.io.mockHandlers.get(socketEvents.DRAW)).toBe(onDrawMock);
  });

  it('sets get image handler', () => {
    const socketService = new SocketService();
    const events = [socketEvents.GET_IMAGE];
    const onGetImageMock = jest.fn();

    const existingHandlerMock = jest.fn();
    addExistingHandlers(socketService, events, existingHandlerMock);

    socketService.setGetImageHandler(onGetImageMock);

    expect(socketService.io).toHaveProperty('mockHandlers');
    checkExistingHandlers(socketService, events, existingHandlerMock);
    expect(socketService.io.mockHandlers.get(socketEvents.GET_IMAGE)).toBe(onGetImageMock);
  });

  it('emits draw event', () => {
    const socketService = new SocketService();
    socketService.emitDrawEvent(1, 2, 3);

    expect(socketService.io.emit).toHaveBeenCalledTimes(1);
    expect(socketService.io.emit).toHaveBeenCalledWith(socketEvents.DRAW, 1, 2, 3);
  });

  it('emits get image event', () => {
    const socketService = new SocketService();
    socketService.emitGetImageEvent();

    expect(socketService.io.emit).toHaveBeenCalledTimes(1);
    expect(socketService.io.emit).toHaveBeenCalledWith(socketEvents.GET_IMAGE);
  });
});
