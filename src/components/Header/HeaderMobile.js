import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderAlerts from './HeaderAlerts';
import NavBtn from '../NavBtn';
import HeaderMobileDropdown from './HeaderMobileDropdown';

class HeaderMobile extends Component {
  state = {
    activeNav: false
  };

  toggleNav = () => {
    this.setState({ activeNav: !this.state.activeNav });
  };

  render () {
    const { activeNav } = this.state;
    const { logout } = this.props;

    return (
      <div>
        <HeaderAlerts />
        <NavBtn isActive={activeNav} clickHandler={this.toggleNav} />
        <HeaderMobileDropdown
          logout={logout}
          isActive={activeNav}
          clickCallback={this.toggleNav}
        />
      </div>
    );
  }
}

HeaderMobile.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default HeaderMobile;
