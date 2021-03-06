import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { boardPage } from './routes';
import AuthGuard from './components/authGuard/AuthGuard';
import LoginPage from './components/pages/login/LoginPageContainer';
import BoardPage from './components/pages/board/BoardPageContainer';
import SocketService from './socketService/SocketService';
import Canvas from './tools/Canvas';
import ToolsProvider from './tools/ToolsProvider';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };

    this.registerErrorHandlers = this.registerErrorHandlers.bind(this);
    this.registerDrawHandler = this.registerDrawHandler.bind(this);
    this.registerGetImageHandler = this.registerGetImageHandler.bind(this);
    this.emitDrawEvent = this.emitDrawEvent.bind(this);
    this.emitGetImageEvent = this.emitGetImageEvent.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(room) {
    const { socketService } = this.props;
    socketService.connect(room, () => {
      this.setState({ isLoggedIn: true });
    });
  }

  registerErrorHandlers(onError) {
    const { socketService } = this.props;
    socketService.setErrorHandlers(onError);
  }

  registerDrawHandler(onDraw) {
    const { socketService } = this.props;
    socketService.setDrawHandler(onDraw);
  }

  registerGetImageHandler(onGetImage) {
    const { socketService } = this.props;
    socketService.setGetImageHandler(onGetImage);
  }

  emitDrawEvent(...args) {
    const { socketService } = this.props;
    socketService.emitDrawEvent(...args);
  }

  emitGetImageEvent() {
    const { socketService } = this.props;
    socketService.emitGetImageEvent();
  }

  render() {
    const { isLoggedIn } = this.state;
    const { toolsProvider, canvas } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={boardPage}
          render={
            () => (
              <AuthGuard isLoggedIn={isLoggedIn}>
                <BoardPage
                  registerErrorHandlers={this.registerErrorHandlers}
                  registerDrawHandler={this.registerDrawHandler}
                  registerGetImageHandler={this.registerGetImageHandler}
                  emitDrawEvent={this.emitDrawEvent}
                  emitGetImageEvent={this.emitGetImageEvent}
                  toolsProvider={toolsProvider}
                  canvas={canvas}
                />
              </AuthGuard>
            )
          }
        />
        <Route
          render={
            () => (
              <LoginPage
                isLoggedIn={isLoggedIn}
                registerErrorHandlers={this.registerErrorHandlers}
                onLogin={this.onLogin}
              />
            )
          }
        />
      </Switch>
    );
  }
}

App.propTypes = {
  socketService: PropTypes.instanceOf(SocketService).isRequired,
  toolsProvider: PropTypes.instanceOf(ToolsProvider).isRequired,
  canvas: PropTypes.instanceOf(Canvas).isRequired,
};

export default App;
