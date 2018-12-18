import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SocketService from './socketService/SocketService';
import ToolsProvider from './tools/ToolsProvider';
import addTools from './tools/addTools';
import { register } from './serviceWorker';
import './style.css';

const socketService = new SocketService();
const toolsProvider = new ToolsProvider();
addTools(toolsProvider);

ReactDOM.render((
  <BrowserRouter>
    <App
      socketService={socketService}
      toolsProvider={toolsProvider}
    />
  </BrowserRouter>), document.getElementById('root'));

register();
