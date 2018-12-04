import { DISCONNECT, JOIN_ROOM } from './events';
import roomHandler from './room-handler';

const socketHandler = () => (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on(DISCONNECT, () => {
    console.log(`User ${socket.id} disconnected`);
  });

  socket.on(JOIN_ROOM, roomHandler(socket));
};

export default socketHandler;
