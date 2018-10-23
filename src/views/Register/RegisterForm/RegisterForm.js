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

class RegisterForm extends Component {
  state = { password: '', confirmPassword: '', passwordError: '' }

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
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = MNID.decode(this.props.uportCreds.networkAddress).address;

    const { password, confirmPassword } = this.state;
    const user = {
      username,
      name: this.props.uportCreds.name,
      avatarUri: this.props.uportCreds.avatar ? this.props.uportCreds.avatar.uri : null,
      lastLoggedIn: new Date().getTime()
    };

    if (!password) {
      this.setState({ passwordError: 'Please enter a password' });
    } else if (password === confirmPassword) {
      this.setState({ passwordError: '' });
      this.props.register(username, password, user.avatarUri, () => {
        this.props.login(username, password, user, () => {
          this.props.history.push('/');
        });
      });
    } else {
      this.setState({ passwordError: 'Make sure passwords are a match' });
    }
  }

  render () {
    const { classes, uportCreds, errorMessage } = this.props;
    const { passwordError } = this.state;
    return (
      <form
        className={classes.root}
        onSubmit={this.handleFormSubmit}
      >
        <Typography
          variant='display1'
          color='inherit'
          className={classes.headline}
        >
          Welcome
        </Typography>
        <Typography
          variant='subheading'
          color='inherit'
        >
          Welcome aboard
        </Typography>
        <Typography
          variant='subheading'
          color='inherit'
          className={classes.marginBot}
        >
          Please, choose a password
        </Typography>
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
        <Typography
          className={classes.forgotPassword}
          color='textSecondary'
          gutterBottom
        >
        Forgot password?
        </Typography>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ uportCreds: auth.uportCreds, errorMessage: auth.errorMessage });

RegisterForm.propTypes = {
  classes: PropTypes.object,
  errorMessage: PropTypes.string,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  uportCreds: PropTypes.object
};

export default withRouter(connect(mapStateToProps, { register, login, clearErrors })(withStyles(styles)(RegisterForm)));
