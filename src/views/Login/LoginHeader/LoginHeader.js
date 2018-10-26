import React  from 'react';
import PropTypes from 'prop-types';
import Responsive from '../../../components/Responsive';
import Logo from '../../../components/Logo';
import LoginHeaderMobile from './LoginHeaderMobile';
import './LoginHeader.scss';

const LoginHeader = props => {
  const {step} = props;

  return (
    <div className='login__header'>
      <Responsive>
        <Logo />
      </Responsive>
      <Responsive isMobile>
        <LoginHeaderMobile step={step}/>
      </Responsive>
    </div>
  );
};

LoginHeader.propTypes = {
  step: PropTypes.number
};

export default LoginHeader;
