import React from 'react';
import { Link } from 'react-router-dom';
import './LoginSidebar.scss';

const LoginSidebar = () => (
  <div className='login__sidebar'>
    <ul>
      <li><Link to='#'>Home</Link></li>
      <li><Link to='#'>Support</Link></li>
    </ul>
  </div>
);
export default LoginSidebar;
