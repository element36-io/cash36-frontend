import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MNID } from 'uport-connect';
import { connect } from 'react-redux';
import { TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import StyledButton from '../../../components/StyledButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '40rem'
  },
  headline: {
    marginBottom: '3rem',
    fontWeight: '500'
  },
  textField: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.greys.lightGrey}`,
    padding: '1rem'
  },
  textFieldUsername: {
    border: `1px solid ${theme.palette.greys.lightGrey}`,
    padding: '1rem',
    backgroundColor: theme.palette.greys.headerGrey
  },
  label: {
    fontSize: '1.9rem',
    marginLeft: '1rem',
    marginTop: '1rem'
  },
  input: {
    marginTop: '1rem',
    fontSize: '1.4rem'
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
    backgroundImage: theme.gradients.primary
  },
  forgotPassword: {
    marginTop: '2rem',
    alignSelf: 'flex-start'
  },
  marginBot: {
    marginBottom: '3rem'
  },
  errorMessage: {
    marginLeft: '1rem',
    marginTop: '1rem'
  }
});

class LoginForm extends Component {
  state = {
    password: ''
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    // After log in was clicked
    console.log('username:', MNID.decode(this.props.credentials.networkAddress).address);
    console.log('password:', this.state.password);
  }

  render () {
    const { classes, errorMessage, credentials } = this.props;
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
          Welcome {credentials.name}
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
          value={MNID.decode(credentials.networkAddress).address}
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

export default connect(mapStateToProps)(withStyles(styles)(LoginForm));
