import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MNID } from 'uport-connect';
import { TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import StyledButton from '../../../components/StyledButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { login, clearErrors } from '../../../store/auth/auth.actions';
import styles from './MuiStyles';

class LoginForm extends Component {
  state = { password: '' }

  componentWillUnmount () {
    this.props.clearErrors();
  }

  handleInputChange = name => event => {
    this.props.clearErrors();
    this.setState({
      [name]: event.target.value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = MNID.decode(this.props.uportCreds.networkAddress).address;
    const { password } = this.state;
    const user = {
      username,
      name: this.props.uportCreds.name,
      avatarUri: this.props.uportCreds.avatar.uri,
      lastLoggedIn: new Date().getTime()
    };
    this.props.login(username, password, user, () => {
      this.props.history.push('/');
    });
  }

  render () {
    const { classes, errorMessage, uportCreds } = this.props;
    const firstName = uportCreds.name.split(' ')[0];
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
          Welcome, {firstName}
        </Typography>
        <Typography
          variant='subheading'
          color='inherit'
          className={classes.marginBot}
        >
          Please, enter your password
        </Typography>
        <TextField
          name='username'
          label='Username (uPort ID)'
          type='text'
          disabled
          autoComplete='off'
          maring='normal'
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
          name='password'
          label='Password'
          type='password'
          autoComplete='off'
          maring='normal'
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
        <Typography
          className={classes.errorMessage}
        >
          {errorMessage}
        </Typography>
        <StyledButton
          variant='raised'
          color='primary'
          type='submit'
          size='large'
          fullWidth
          className={classes.button}
        >
          <span>Log in</span>
          <ArrowForwardIcon />
        </StyledButton>
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

const mapStateToProps = ({ auth }) => ({ errorMessage: auth.errorMessage });

LoginForm.propTypes = {
  classes: PropTypes.object,
  errorMessage: PropTypes.string,
  history: PropTypes.object,
  login: PropTypes.func
};

export default withRouter(connect(mapStateToProps, { login, clearErrors })(withStyles(styles)(LoginForm)));
