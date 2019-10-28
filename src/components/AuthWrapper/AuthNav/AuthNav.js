import React from 'react';
import { Link } from 'react-router-dom';

const AuthNav = () => (
  <ul data-testid="auth__nav">
    <li>
      <Link to="#">Home</Link>
    </li>
    <li>
      <Link to="#">Support</Link>
    </li>
  </ul>
);

export default AuthNav;
