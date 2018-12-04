import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import { boardPage } from '../../../routes';
import SocketService from '../../../services/SocketService';

class LoginPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locked: false,
      errorMessage: '',
      room: '',
    };

    this.onError = this.onError.bind(this);
    this.onSetRoom = this.onSetRoom.bind(this);
    this.onLogin = this.onLogin.bind(this);

    const { socketService } = props;
    socketService.setErrorHandlers(this.onError);
  }

  onSetRoom(room) {
    const { locked } = this.state;

    if (locked) {
      return;
    }

    this.setState(() => ({ errorMessage: '', room }));
  }

  onLogin() {
    const { locked, room } = this.state;
    const { socketService, onConnectionEstablished } = this.props;

    if (locked) {
      return;
    }

    this.setState(() => ({ locked: true, errorMessage: '' }));
    socketService.connect(room, onConnectionEstablished);
  }

  onError(error) {
    this.setState(() => ({ locked: false, errorMessage: error, isLoggedIn: false }));
  }

  render() {
    const { isLoggedIn } = this.props;
    const { locked, errorMessage, room } = this.state;

    return (
      <Fragment>
        {isLoggedIn && (
          <Redirect to={boardPage} />
        )}
        {!isLoggedIn && (
          <LoginPage
            locked={locked}
            errorMessage={errorMessage}
            room={room}
            onSetRoom={this.onSetRoom}
            onLogin={this.onLogin}
          />
        )}
      </Fragment>
    );
  }
}

LoginPageContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  socketService: PropTypes.instanceOf(SocketService).isRequired,
  onConnectionEstablished: PropTypes.func.isRequired,
};

export default LoginPageContainer;
