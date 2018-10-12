import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderAlerts from './HeaderAlerts';
import HeaderNavBtn from './HeaderNavBtn';
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
      const { logout, user } = this.props;

      return (
        <div>
          <HeaderAlerts alertsCount={3} />
          <HeaderNavBtn isActive={activeNav} clickHandler={this.toggleNav} />
          <HeaderMobileDropdown user={user} logout={logout} isActive={activeNav} clickCallback={this.toggleNav} />
        </div>
      );
    }
}

HeaderMobile.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default HeaderMobile;
