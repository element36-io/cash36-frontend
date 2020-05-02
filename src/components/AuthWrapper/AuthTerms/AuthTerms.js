import React from 'react';
import './AuthTerms.scss';

const LoginTerms = () => (
  <div className="login__terms">
    By signing in, you agree to{' '}
    <span>element36 <a 
    href="https://docs.google.com/document/d/e/2PACX-1vQrdc8Y2IXX_wijlgpl5-hW2n18coP-hHup8LwUhQEiD787wx6tiOzvK4IEBawNYC0bTuKueO0M9Lqj/pub"
    target="_blank" >Terms and Conditions</a> & <a 
    href="https://docs.google.com/document/d/e/2PACX-1vSOcC_zA-j1mJMyTsXDHktybyyDEUsU3XE9-kINF2xNCRhhlQ8ul3UYiKpVxRcW4m0k-Bxt7aglHuCV/pub" 
    target="_blank">Privacy Policy</a></span>
  </div>
);

export default LoginTerms;
