import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
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
      setError(error);
    }
  };

  useEffect(() => {
    validateCode();
  }, []);

  if (!code) return <Redirect to="/login" />;

  return (
    <AuthWrapper>
      <div className="account-activation">
        {error ? (
          <p>{error}</p>
        ) : (
          <CircularProgress color="primary" size={50} />
        )}
      </div>
    </AuthWrapper>
  );
};

export default AccountActivation;
