import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginUsername from '../LoginUsername';
import LoginField from '../LoginField';
import { register, createUserObject } from '../../../store/auth/auth.actions';
import StepButton from '../../../components/Buttons/StepButton/StepButton';

class RegisterForm extends Component {
  state = {
    password: '',
    confirmPassword: '',
    error: null,
    isSubmitting: false
  };

  handleInputChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    const { password } = this.state;
    const { register, uportCreds } = this.props;
    const { user, username } = createUserObject(uportCreds);
    this.setState({ isSubmitting: true });

    register(username, password, user)
      .catch(error => this.setState({ error, isSubmitting: false }));
  };

  render () {
    const { uportCreds } = this.props;
    const { error, password, confirmPassword, isSubmitting } = this.state;
    return (
      <form className="login__form" onSubmit={this.handleFormSubmit}>
        <h2>Welcome</h2>
        <p>Welcome aboard, <br /> please, choose a password</p>
        <div className="login__field-wrapper">
          <LoginUsername networkAddress={uportCreds.networkAddress} />
          <LoginField name="password" value={password} changeHandler={this.handleInputChange} label="Password" />
          <LoginField name="confirmPassword" value={confirmPassword} changeHandler={this.handleInputChange}
            label="Confirm Password" />
        </div>
        {error && <p className="login__form__error">{error}</p>}
        <StepButton
          variant="raised"
          color="primary"
          type="submit"
          size="large"
          fullWidth
          text="Register"
          onClick={this.handleFormSubmit}
          disabled={!password.length || !confirmPassword.length || isSubmitting || password !== confirmPassword}
        />
      </form>
    );
  }
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  uportCreds: PropTypes.object.isRequired
};

export default connect(null, { register })(RegisterForm);
