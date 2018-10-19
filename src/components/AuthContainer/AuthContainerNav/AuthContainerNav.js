import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import './AuthContainerNav.scss';

export const AuthContainerNav = props => {
  const { showRegister, location: { pathname } } = props;

  return (
    <ul className='auth-nav'>
      <li><Link to='#'>Home</Link></li>
      <li><Link to='#'>Support</Link></li>
      <li>
        {
          pathname === '/login'
            ? showRegister ? <Link to='/register'>Register</Link> : <span>Register</span>
            : <Link to='/login'>Login</Link>
        }
      </li>
    </ul>
  );
};
AuthContainerNav.propTypes = {
  showRegister: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(AuthContainerNav);
