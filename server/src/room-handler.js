import { USER_ERROR, CONNECTION_ESTABLISHED, DRAW } from './events';

export default socket => (room) => {
  socket.join(room, (err) => {
    if (err) {
      socket.emit(USER_ERROR, err);
    } else {
      console.log(`User ${socket.id} has joined the room ${room}`);
      socket.emit(CONNECTION_ESTABLISHED);

      socket.on(DRAW, (...args) => {
        socket.to(room).emit(DRAW, ...args);
      });
    }
  });
};
