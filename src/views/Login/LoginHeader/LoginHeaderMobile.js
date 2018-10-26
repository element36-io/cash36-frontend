import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBtn from '../../../components/NavBtn';
import Logo from '../../../components/Logo';

class LoginHeaderMobile extends Component {
  state = {
    isActiveNav: false
  };

  toggleNav = () => {
    this.setState({isActiveNav: !this.state.isActiveNav})
  };

  render () {
    const {isActiveNav} = this.state;
    const {step} = this.props;

    return (
      <div className='login__header'>
        {step !== 0 && <Logo />}
        <NavBtn clickHandler={this.toggleNav} alt={step === 0} isActive={isActiveNav}/>
      </div>
    )
  }
}

LoginHeaderMobile.propTypes = {
  step: PropTypes.number
};

export default LoginHeaderMobile;
