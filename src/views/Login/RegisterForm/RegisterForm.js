import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MNID } from 'uport-connect';
import { TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { register, login, clearErrors } from '../../../store/auth/auth.actions';
import styles from './MuiStyles';

// Remove MUI from this form, it's not needed
class RegisterForm extends Component {
  state = { password: '', confirmPassword: '', passwordError: '' };

  componentWillUnmount () {
    this.props.clearErrors();
  }

  handleInputChange = name => event => {
    if (this.props.errorMessage) {
      this.props.clearErrors();
    }
    this.setState({
      [name]: event.target.value
    });
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    const { password, confirmPassword } = this.state;
    const { register, login, history, uportCreds } = this.props;
    const username = MNID.decode(uportCreds.networkAddress).address;
    const user = {
      username,
      name: uportCreds.name,
      avatarUri: uportCreds.avatar ? uportCreds.avatar.uri : null,
      lastLoggedIn: new Date().getTime()
    };

    if (!password) {
      this.setState({ passwordError: 'Please enter a password' });
    } else if (password === confirmPassword) {
      this.setState({ passwordError: '' });

      await register(username, password, user.avatarUri);
      await login(username, password, user);
      history.push('/');
    } else {
      this.setState({ passwordError: 'Make sure passwords are a match' });
    }
  };

  render () {
    const { classes, uportCreds, errorMessage } = this.props;
    const { passwordError } = this.state;
    return (
      <div className='login__form'>
        <form
          className={classes.root}
          onSubmit={this.handleFormSubmit}
        >
          <h2>Welcome</h2>
          <p>Welcome aboard, <br /> please, choose a password</p>
          <TextField
            name='username'
            label='Username (uPort ID)'
            type='text'
            disabled
            autoComplete='off'
            value={MNID.decode(uportCreds.networkAddress).address}
            fullWidth
            className={classes.textFieldUsername}
            InputProps={{
              disableUnderline: true,
              className: classes.input
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.label
            }}
          />
          <TextField
            label='Password'
            type='password'
            autoComplete='off'
            value={this.state.password}
            onChange={this.handleInputChange('password')}
            fullWidth
            className={classes.textField}
            InputProps={{
              disableUnderline: true,
              className: classes.input
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.label
            }}
          />
          <TextField
            label='Confirm Password'
            type='password'
            autoComplete='off'
            value={this.state.confirmPassword}
            onChange={this.handleInputChange('confirmPassword')}
            fullWidth
            className={classes.textField}
            InputProps={{
              disableUnderline: true,
              className: classes.input
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.label
            }}
          />
          <Typography
            className={classes.errorMessage}
          >
            {errorMessage ? <span>{errorMessage}</span> : <span>{passwordError}</span>}
          </Typography>
          <DefaultButton
            variant='raised'
            color='primary'
            type='submit'
            size='large'
            fullWidth
            className={classes.button}
          >
            <span>Register</span>
            <ArrowForwardIcon />
          </DefaultButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ errorMessage: auth.errorMessage });

RegisterForm.propTypes = {
  classes: PropTypes.object,
  errorMessage: PropTypes.string,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  uportCreds: PropTypes.object
};

export default withRouter(connect(mapStateToProps, { register, login, clearErrors })(withStyles(styles)(RegisterForm)));
