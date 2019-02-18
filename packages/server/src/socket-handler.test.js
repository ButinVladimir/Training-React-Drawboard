import EventEmitter from 'events';
import { DISCONNECT, JOIN_ROOM } from './events';
import socketHandler from './socket-handler';

describe('socketHandler', () => {
  it('wraps map and socket properly', () => {
    const roomToCanvasMap = new Map();
    const socket = new EventEmitter();
    socket.id = 3;
    const onSpy = jest.spyOn(socket, 'on');

    socketHandler(roomToCanvasMap)(socket);

    expect(onSpy.mock.calls.length).toBe(2);
    expect(onSpy.mock.calls[0][0]).toBe(DISCONNECT);
    expect(onSpy.mock.calls[0][1]).toBeInstanceOf(Function);
    expect(onSpy.mock.calls[1][0]).toBe(JOIN_ROOM);
    expect(onSpy.mock.calls[1][1]).toBeInstanceOf(Function);
  });

  it('disconnects', () => {
    const roomToCanvasMap = new Map();
    const socket = new EventEmitter();
    socket.id = 5;
    const logSpy = jest.spyOn(global.console, 'log');

    socketHandler(roomToCanvasMap)(socket);
    socket.emit(DISCONNECT);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenNthCalledWith(1, 'User 5 connected');
    expect(logSpy).toHaveBeenNthCalledWith(2, 'User 5 disconnected');
  });
});
