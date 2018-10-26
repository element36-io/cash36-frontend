import React, { Component } from 'react';
// import ProptTypes from 'prop-types';
import Responsive from '../../../components/Responsive';
import Logo from '../../../components/Logo';
import LoginHeaderMobile from './LoginHeaderMobile';
import './LoginHeader.scss';

class LoginHeader extends Component {
  render () {
    return (
      <div className='login__header'>
        <Responsive>
          <Logo />
        </Responsive>
        <Responsive isMobile>
          <LoginHeaderMobile />
        </Responsive>
      </div>
    );
  }
}

LoginHeader.propTypes = {

};

export default LoginHeader;
