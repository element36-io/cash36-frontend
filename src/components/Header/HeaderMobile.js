import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderAlerts from './HeaderAlerts';
import NavBtn from '../NavBtn';
import HeaderMobileDropdown from './HeaderMobileDropdown';

class HeaderMobile extends Component {
    state = {
      activeNav: false,
      showVerification: false
    };

    toggleNav = () => {
      this.setState({ activeNav: !this.state.activeNav });
    };

    openVerification = () => {
      this.setState({ showVerification: true });
    };

    closeVerification = () => {
      this.setState({ showVerification: false });
    };

    render () {
      const { activeNav, showVerification } = this.state;
      const { logout, user } = this.props;

      return (
        <div>
          <HeaderAlerts />
          <NavBtn isActive={activeNav} clickHandler={this.toggleNav} />
          <HeaderMobileDropdown logout={logout} isActive={activeNav} clickCallback={this.toggleNav} openVerification={this.openVerification} />
        </div>
      );
    }
}

HeaderMobile.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default HeaderMobile;
