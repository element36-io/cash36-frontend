import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavButton from '../../../components/NavButton';
import LoginNav from '../LoginNav';

class LoginHeaderMobile extends Component {
  state = {
    isActiveNav: false
  };

  toggleNav = () => {
    this.setState({ isActiveNav: !this.state.isActiveNav });
  };

  render () {
    const { isActiveNav } = this.state;
    const { step } = this.props;

    return (
      <div className="login__header">
        <NavButton
          clickHandler={this.toggleNav}
          alt={step === 0 && !isActiveNav}
          isActive={isActiveNav}
        />
        <div
          className={`login__header__dropdown ${isActiveNav ? 'active' : ''}`}
        >
          <div className="paper">
            <LoginNav />
          </div>
        </div>
      </div>
    );
  }
}

LoginHeaderMobile.propTypes = {
  step: PropTypes.number
};

export default LoginHeaderMobile;
