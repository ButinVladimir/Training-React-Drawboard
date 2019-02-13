import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SocketService from './socketService/SocketService';
import Canvas from './tools/Canvas';
import ToolsProvider from './tools/ToolsProvider';
import addTools from './tools/addTools';
import { register } from './serviceWorker';
import './style.css';

require('dotenv').config();

const socketService = new SocketService();
const canvas = new Canvas();
const toolsProvider = new ToolsProvider(canvas);
addTools(toolsProvider);

ReactDOM.render((
  <BrowserRouter>
    <App
      socketService={socketService}
      toolsProvider={toolsProvider}
      canvas={canvas}
    />
  </BrowserRouter>), document.getElementById('root'));

register();
