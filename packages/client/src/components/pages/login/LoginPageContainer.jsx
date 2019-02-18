import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import { boardPage } from '../../../routes';

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

    const { registerErrorHandlers } = this.props;
    registerErrorHandlers(this.onError);
  }

  onSetRoom(room) {
    const { locked } = this.state;

    if (locked) {
      return;
    }

    this.setState({ errorMessage: '', room });
  }

  onLogin() {
    const { locked, room } = this.state;
    const { onLogin } = this.props;

    if (locked) {
      return;
    }

    this.setState({ locked: true, errorMessage: '' });
    onLogin(room);
  }

  onError(error) {
    this.setState({ locked: false, errorMessage: error });
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
  registerErrorHandlers: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginPageContainer;
