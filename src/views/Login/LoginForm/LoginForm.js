import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepButton from '../../../components/Buttons/StepButton';
import LoginUsername from '../LoginUsername';
import LoginField from '../LoginField';
import { login, createUserObject } from '../../../store/auth/auth.actions';

class LoginForm extends Component {
  state = {
    password: '',
    error: null,
    isSubmitting: false
  };

  handleInputChange = evt => {
    const { name, value } = evt.target;

    this.setState({
      [name]: value,
      error: null
    });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    const { login, uportCreds } = this.props;
    const { password } = this.state;
    const { user, username } = createUserObject(uportCreds);

    this.setState({ isSubmitting: true });

    login(username, password, user)
      .catch(error => {
        this.setState({ error, isSubmitting: false });
      });
  };

  render () {
    const { uportCreds } = this.props;
    const { password, error, isSubmitting } = this.state;
    const firstName = uportCreds.name.split(' ')[0];

    return (
      <form className='login__form' onSubmit={this.handleFormSubmit}>
        <h2>Welcome</h2>
        <p>
          Welcome back, {firstName}<br />
          Please, enter your password
        </p>
        <div className='login__field-wrapper'>
          <LoginUsername networkAddress={uportCreds.networkAddress} />
          <LoginField name='password' value={password} changeHandler={this.handleInputChange} label='Password' />
        </div>
        {error && <p className='login__form__error'>{error}</p>}
        <StepButton
          variant='raised'
          color='primary'
          type='submit'
          size='large'
          fullWidth
          text='Log in'
          onClick={this.handleFormSubmit}
          disabled={!password || isSubmitting}
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  uportCreds: PropTypes.object.isRequired
};

export default connect(null, { login })(LoginForm);
