import Koa from 'koa';
import { createServer } from 'http';
import createIo from 'socket.io';
import socketHandler from './socket-handler';

const app = new Koa();
const http = createServer(app.callback());
const io = createIo(http);

const roomToCanvasMap = new Map();
io.on('connection', socketHandler(roomToCanvasMap));

http.listen(8000, () => {
  console.log('Listening...');
});
