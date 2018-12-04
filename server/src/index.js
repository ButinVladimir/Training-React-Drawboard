import Koa from 'koa';
import { createServer } from 'http';
import createIo from 'socket.io';
import socketHandler from './socket-handler';

const app = new Koa();
const http = createServer(app.callback());
const io = createIo(http);

io.on('connection', socketHandler(io));

http.listen(8000, () => {
  console.log('Listening...');
});
