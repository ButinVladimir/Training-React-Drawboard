import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { boardPage } from './routes';
import AuthGuard from './components/authGuard/AuthGuard';
import LoginPage from './components/pages/login/LoginPageContainer';
import BoardPage from './components/pages/board/BoardPage';
import SocketService from './services/SocketService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };

    this.onConnectionEstablished = this.onConnectionEstablished.bind(this);

    this.socketService = new SocketService();
  }

  onConnectionEstablished() {
    this.setState(() => ({ isLoggedIn: true }));
  }

  render() {
    const {
      isLoggedIn,
    } = this.state;

    return (
      <Switch>
        <Route
          exact
          path={boardPage}
          render={
            () => (
              <AuthGuard isLoggedIn={isLoggedIn}>
                <BoardPage />
              </AuthGuard>
            )
          }
        />
        <Route
          render={
            () => (
              <LoginPage
                isLoggedIn={isLoggedIn}
                socketService={this.socketService}
                onConnectionEstablished={this.onConnectionEstablished}
              />
            )
          }
        />
      </Switch>
    );
  }
}

export default App;
