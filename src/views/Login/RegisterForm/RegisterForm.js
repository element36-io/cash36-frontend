import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginUsername from '../LoginUsername';
import LoginField from '../LoginField';
import { register } from '../../../store/auth/auth.actions';
import StepButton from '../../../components/Buttons/StepButton/StepButton';

const RegisterForm = ({ register, creds, useMetamask }) => {
  const [values, setValues] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const { password } = values;
    setSubmitting(true);

    register(creds, useMetamask, password).catch(error => {
      setError(error);
      setSubmitting(false);
    });
  };

  return (
    <form className="login__form" onSubmit={handleFormSubmit}>
      <h2>Welcome</h2>
      <p>
        Welcome aboard, <br /> please, choose a password
      </p>
      <div className="login__field-wrapper">
        <LoginUsername id={creds.id} />
        <LoginField
          name="password"
          value={values.password}
          changeHandler={handleInputChange}
          label="Password"
        />
        <LoginField
          name="confirmPassword"
          value={values.confirmPassword}
          changeHandler={handleInputChange}
          label="Confirm Password"
        />
      </div>
      {error && <p className="login__form__error">{error}</p>}
      <StepButton
        variant="raised"
        color="primary"
        type="submit"
        size="large"
        fullWidth
        text="Register"
        onClick={handleFormSubmit}
        disabled={
          !values.password.length ||
          !values.confirmPassword.length ||
          submitting ||
          values.password !== values.confirmPassword
        }
      />
    </form>
  );
};

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  creds: PropTypes.object.isRequired,
  useMetamask: PropTypes.bool
};

export default connect(
  null,
  { register }
)(RegisterForm);
