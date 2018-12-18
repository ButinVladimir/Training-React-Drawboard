import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const LoginPage = ({
  locked,
  errorMessage,
  room,
  onSetRoom,
  onLogin,
}) => (
  <div className="login-container">
    <div className="row">
      <div className="col header">Room:</div>
      <div className="col">
        <input className="input" value={room} onChange={e => onSetRoom(e.target.value)} />
      </div>
    </div>
    {errorMessage && (
      <div className="row">
        <div className="col">
          {errorMessage}
        </div>
      </div>
    )}
    <div className="row right">
      <div className="col">
        <button type="button" disabled={locked} onClick={onLogin}>Log in</button>
      </div>
    </div>
  </div>
);

LoginPage.propTypes = {
  locked: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  room: PropTypes.string.isRequired,
  onSetRoom: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
  errorMessage: '',
};

export default LoginPage;
