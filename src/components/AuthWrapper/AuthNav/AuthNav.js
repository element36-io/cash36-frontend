import React from 'react';
//import { Link } from 'react-router-dom';

const AuthNav = () => (
  <ul data-testid="auth__nav">
    <li>
      <a href="https://github.e36.io/" target="_blank"   rel="noopener noreferrer">
        Demo</a>
    </li>
    <li>
      <a href="https://www.element36.io"target="_blank"   rel="noopener noreferrer">
        Home</a>
    </li>
    <li>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZwzmZ-TzqXbxkS48b1VJrWMfhmBM8sOY0AdcGmh_mxy62uQ/viewform?usp=sf_link" target="_blank"  rel="noopener noreferrer" >
        Support</a>
    </li>
  </ul>
);

export default AuthNav;
