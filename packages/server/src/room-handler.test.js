import { createCanvas } from 'canvas';
import EventEmitter from 'events';
import {
  CONNECTION_ESTABLISHED,
  USER_ERROR,
  GET_IMAGE,
  DRAW,
} from './events';
import roomHandler from './room-handler';

describe('roomHandler', () => {
  const room = 'roomName';
  let socket;
  let err;
  let roomToCanvasMap;
  let connectionEstablished;
  let logSpy;

  beforeEach(() => {
    roomToCanvasMap = new Map();
    err = null;

    socket = new EventEmitter();
    socket.id = '7';
    socket.join = (r, cb) => {
      expect(r).toBe(room);

      cb(err);
    };

    connectionEstablished = false;

    logSpy = jest.spyOn(global.console, 'log');
  });

  it('wraps map, socket and room properly when room doesnt exist', () => {
    socket.on(CONNECTION_ESTABLISHED, () => {
      connectionEstablished = true;
    });

    roomHandler(socket, roomToCanvasMap)(room);

    expect(connectionEstablished).toBe(true);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenNthCalledWith(1, 'User 7 has joined the room roomName');
    expect(logSpy).toHaveBeenNthCalledWith(2, 'roomName does not exists yet');
    expect(roomToCanvasMap.has(room)).toBe(true);
  });

  it('wraps map, socket and room properly when room does exist', () => {
    roomToCanvasMap.set(room, createCanvas(500, 500));
    socket.on(CONNECTION_ESTABLISHED, () => {
      connectionEstablished = true;
    });

    roomHandler(socket, roomToCanvasMap)(room);

    expect(connectionEstablished).toBe(true);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenNthCalledWith(1, 'User 7 has joined the room roomName');
    expect(logSpy).toHaveBeenNthCalledWith(2, 'roomName exists');
    expect(roomToCanvasMap.has(room)).toBe(true);
  });

  it('handles an error during joining the room', () => {
    socket.on(USER_ERROR, (e) => {
      expect(e).toBe(err);
    });

    err = new Error('Oh no');
    roomHandler(socket, roomToCanvasMap)(room);
  });

  it('handles getImage event', () => {
    const { emit } = socket;
    socket.emit = jest.fn();

    roomHandler(socket, roomToCanvasMap)(room);
    emit.call(socket, GET_IMAGE);

    expect(socket.emit).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenNthCalledWith(3, 'User 7 has requested image in room roomName');
  });

  it('handles draw event', () => {
    const emitMock = jest.fn();
    socket.to = () => ({
      emit: emitMock,
    });

    roomHandler(socket, roomToCanvasMap)(room);

    const viewState = {
      deltaX: 3,
      deltaY: 4,
      rotation: -1,
      zoom: 10,
    };
    const toolName = 'Line';
    const toolState = {
      anchorX: 5,
      anchorY: 10,
      clientX: 20,
      clientY: 40,
      color: '#bcd',
      width: 9,
    };

    socket.emit(DRAW, viewState, toolName, toolState);

    expect(emitMock).toHaveBeenCalledTimes(1);
    expect(emitMock).toHaveBeenCalledWith(DRAW, viewState, toolName, toolState);
  });
});
