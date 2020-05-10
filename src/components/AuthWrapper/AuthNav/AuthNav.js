import React from 'react';
import { Link } from 'react-router-dom';

const AuthNav = () => (
  <ul data-testid="auth__nav">
    <li>
      <Link href="https://github.e36.io/">Demo</Link>
    </li>
    <li>
      <Link href="https://www.element36.io">Home</Link>
    </li>
    <li>
      <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeZwzmZ-TzqXbxkS48b1VJrWMfhmBM8sOY0AdcGmh_mxy62uQ/viewform?usp=sf_link">Support</Link>
    </li>
  </ul>
);

export default AuthNav;
