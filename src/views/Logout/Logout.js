import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { logout } from '../../store/auth/auth.actions';
import StyledButton from '../../components/StyledButton';

import './Logout.scss';

class Logout extends Component {
  componentDidMount () {
    this.props.logout();
  }
  render () {
    return (
      <div className='logout'>
        <Typography
          variant='subheading'
          color='textPrimary'
        >
          You have been logged out
        </Typography>
        <Link to='/login'>
          <StyledButton
            variant='raised'
            color='primary'
            className='logout__home-button'
          >
            Home
          </StyledButton>
        </Link>
      </div>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func
};

export default connect(null, { logout })(Logout);
