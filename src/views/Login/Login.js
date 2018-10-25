import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import uPort from '../../config/uport.config';
import Responsive from '../../components/Responsive';
import LoginSidebar from './LoginSidebar';
import LoginTerms from './LoginTerms';
import LoginHeader from './LoginHeader';

import './Login.scss';

// import LoginWizard from './LoginWizard';

class Login extends Component {
  state = {
    step: 0
  };

  render () {
    const { auth: { isAuthenticated } } = this.props;

    if (isAuthenticated) return <Redirect to='/' />;

    return (
      <div className='login'>
        <div>
          <LoginHeader />
          <div>
            test
          </div>
          <LoginTerms />
        </div>
        <Responsive>
          <LoginSidebar />
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Login);
