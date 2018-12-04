import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginPage } from '../../routes';

const AuthGuard = ({ isLoggedIn, children }) => ((isLoggedIn)
  ? (
    <Fragment>
      {children}
    </Fragment>
  )
  : (
    <Redirect to={loginPage} />
  )
);

AuthGuard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default AuthGuard;
