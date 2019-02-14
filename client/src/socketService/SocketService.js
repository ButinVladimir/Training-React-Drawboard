import io from 'socket.io-client';
import * as socketEvents from './socket-events';

export default class SocketService {
  constructor() {
    this.io = io(process.env.REACT_APP_SERVER_URL, {
      autoConnect: false,
      reconnection: false,
    });
  }

  connect(room, onConnect) {
    this.io
      .off(socketEvents.CONNECT)
      .on(socketEvents.CONNECT, () => this.io.emit(socketEvents.JOIN_ROOM, room))
      .off(socketEvents.CONNECTION_ESTABLISHED)
      .on(socketEvents.CONNECTION_ESTABLISHED, onConnect);

    this.io.connect();
  }

  setErrorHandlers(onError) {
    this.io
      .off(socketEvents.CONNECT_ERROR)
      .on(socketEvents.CONNECT_ERROR, () => {
        onError('Cannot connect to the server');
      })
      .off(socketEvents.RECONNECT_ERROR)
      .on(socketEvents.RECONNECT_ERROR, () => {
        onError('Cannot reconnect to the server');
      })
      .off(socketEvents.ERROR)
      .on(socketEvents.ERROR, (error) => {
        onError(`An error occured: ${error}`);
      })
      .off(socketEvents.USER_ERROR)
      .on(socketEvents.USER_ERROR, (error) => {
        onError(`An error occured: ${error}`);
      })
      .off(socketEvents.DISCONNECT)
      .on(socketEvents.DISCONNECT, () => {
        onError('An disconnect occured');
      });
  }

  setDrawHandler(onDraw) {
    this.io
      .off(socketEvents.DRAW)
      .on(socketEvents.DRAW, onDraw);
  }

  setGetImageHandler(onGetImage) {
    this.io
      .off(socketEvents.GET_IMAGE)
      .on(socketEvents.GET_IMAGE, onGetImage);
  }

  emitDrawEvent(...args) {
    this.io.emit(socketEvents.DRAW, ...args);
  }

  emitGetImageEvent() {
    this.io.emit(socketEvents.GET_IMAGE);
  }
}
