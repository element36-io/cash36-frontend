import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Nav.scss';

const Nav = (props) => (
  <ul className='auth-nav'>
    <li><Link to='#'>Home</Link></li>
    <li><Link to='#'>Support</Link></li>
    <li className='auth-nav__item'>
      {props.location.pathname === '/login' && <Link to='/register'>Register</Link>}
      {props.location.pathname === '/register' && <Link to='/login'>Login</Link>}
    </li>
  </ul>
);

export default withRouter(Nav);
