import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import Login from '../components/layout/Login.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';


const mapStateToProps = (state) => {
    return {
      error: state.authentication.error,
      password: state.authentication.password,
      email: state.authentication.email,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, pass) => dispatch(
      UA('AUTHENTICATE', {email, pass})
    ),
    onPasswordChange: val => {
       dispatch(
         new ReducedAction('UPDATE_PASSWORD', 'authentication.password', val)
       );
    },
    onEmailChange: val => {
      dispatch(
        new ReducedAction('UPDATE_EMAIL', 'authentication.email', val)
      );
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
