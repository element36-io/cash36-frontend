import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';
import HeaderAlerts from './HeaderAlerts';
import navLinks from './navLinks';

class HeaderDesktop extends Component {
    state = {
      openMenu: false,
      menuAnchor: null
    };

    handleMenuOpen = evt => {
      this.setState({ openMenu: true, menuAnchor: evt.currentTarget });
    };

    handleMenuClose = () => {
      this.setState({ openMenu: false, menuAnchor: null });
    };

    render () {
      const { logout, user } = this.props;
      const { menuAnchor, openMenu } = this.state;

      return (
        <Fragment>
          <ul>
            {navLinks.map(link => <li key={link.label}>
              <NavLink exact activeClassName='selected'
                to={link.url}>{link.label}</NavLink></li>
            )}
          </ul>
          <div>
            <HeaderAlerts alertsCount={3} />
            <HeaderMenu logout={logout} closeCallback={this.handleMenuClose}
              openCallback={this.handleMenuOpen} anchorEl={menuAnchor}
              open={openMenu} user={user}
            />
          </div>
        </Fragment>
      );
    }
}

HeaderDesktop.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  notifications: PropTypes.object
};

export default HeaderDesktop;
