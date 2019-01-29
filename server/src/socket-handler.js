import { DISCONNECT, JOIN_ROOM } from './events';
import roomHandler from './room-handler';

const socketHandler = roomToCanvasMap => (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on(DISCONNECT, () => {
    console.log(`User ${socket.id} disconnected`);
  });

  socket.on(JOIN_ROOM, roomHandler(socket, roomToCanvasMap));
};

export default socketHandler;
