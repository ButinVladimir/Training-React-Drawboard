import { createCanvas } from 'canvas';
import {
  USER_ERROR,
  CONNECTION_ESTABLISHED,
  DRAW,
  GET_IMAGE,
} from './events';
import drawHandler from './draw-handlers/draw-handler';

export default (socket, roomToCanvasMap) => (room) => {
  socket.join(room, (err) => {
    if (err) {
      socket.emit(USER_ERROR, err);
    } else {
      console.log(`User ${socket.id} has joined the room ${room}`);

      let canvas;
      if (!roomToCanvasMap.has(room)) {
        console.log(room, 'does not exists yet');
        canvas = createCanvas(500, 500);
        roomToCanvasMap.set(room, canvas);
      } else {
        console.log(room, 'exists');
        canvas = roomToCanvasMap.get(room);
      }

      socket.emit(CONNECTION_ESTABLISHED);

      socket.on(GET_IMAGE, () => {
        console.log('User requested image in', room);
        socket.emit(GET_IMAGE, canvas.toDataURL());
      });

      socket.on(DRAW, (viewState, toolName, toolState) => {
        drawHandler(canvas, viewState, toolName, toolState);
        socket.to(room).emit(DRAW, viewState, toolName, toolState);
      });
    }
  });
};
