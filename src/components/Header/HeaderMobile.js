import React, { Component } from 'react';
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

      return (
        <div>
          <HeaderAlerts alertsCount={3} />
          <HeaderNavBtn isActive={activeNav} clickHandler={this.toggleNav} />
          <HeaderMobileDropdown isActive={activeNav} clickCallback={this.toggleNav} />
        </div>
      );
    }
}

export default HeaderMobile;
