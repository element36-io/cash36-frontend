import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepButton from '../../../components/Buttons/StepButton';
import LoginUsername from '../LoginUsername';
import LoginField from '../LoginField';
import { login } from '../../../store/auth/auth.actions';

const LoginForm = ({ login, creds, useMetamask }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = evt => {
    setPassword(evt.target.value);
    setError(null);
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    setSubmitting(true);

    login(creds, useMetamask, password).catch(error => {
      console.warn(error);
      setError(error);
      setSubmitting(false);
    });
  };

  const firstName = creds.name.split(' ')[0];

  return (
    <form className="login__form" onSubmit={handleFormSubmit}>
      <h2>Welcome</h2>
      <p>
        Welcome back, {firstName}
        <br />
        Please, enter your password
      </p>
      <div className="login__field-wrapper">
        <LoginUsername id={creds.id} />
        <LoginField
          name="password"
          value={password}
          changeHandler={handleInputChange}
          label="Password"
        />
      </div>
      {error && <p className="login__form__error">{error}</p>}
      <StepButton
        variant="raised"
        color="primary"
        type="submit"
        size="large"
        fullWidth
        text="Log in"
        onClick={handleFormSubmit}
        disabled={!password || submitting}
      />
    </form>
  );
};

LoginForm.propTypes = {
  creds: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  useMetamask: PropTypes.bool
};

export default connect(
  null,
  { login }
)(LoginForm);
