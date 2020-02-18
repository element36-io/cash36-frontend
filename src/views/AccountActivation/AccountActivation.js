import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { Redirect, useLocation, useHistory, Link } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import { getQueryStringValue } from '../../helpers/wallet.helpers';
import { activateUser } from '../../store/auth/auth.actions';
import './AccountActivation.scss';

const AccountActivation = () => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const code = getQueryStringValue(location.search, 'code');

  const validateCode = async () => {
    if (!code) return;
    try {
      await activateUser(code);
      history.push('/login');
    } catch (error) {
      setError(
        'Your activation link has expired, click below to resend the activation code'
      );
    }
  };

  useEffect(() => {
    validateCode();
  }, []);

  if (!code) return <Redirect to="/login" />;

  return (
    <AuthWrapper message="">
      <div className="account-activation">
        {error ? (
          <div className="account-activation__message">
            <p>{error}</p>
            <p className="paragraph-link-gray">
              <Link to="/resend-activation">Resend activation link</Link>
            </p>
          </div>
        ) : (
          <CircularProgress color="primary" size={50} />
        )}
      </div>
    </AuthWrapper>
  );
};

export default AccountActivation;
