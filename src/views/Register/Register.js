import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AuthContainer from '../../components/AuthContainer';
import RegisterForm from './RegisterForm';

class Register extends Component {
  render () {
    return (
      this.props.authed
        ? <Redirect to='/' />
        : <AuthContainer>
          <RegisterForm />
        </AuthContainer>

    );
  }
}

const mapStateToProps = ({ auth }) => ({ authed: auth.isAuthenticated });

export default connect(mapStateToProps)(Register);
