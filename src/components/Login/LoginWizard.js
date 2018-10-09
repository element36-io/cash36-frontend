import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import backgroundImage from '../../assets/background-login.jpg';

import Logo from '../Logo';
import LoginWithUport from './LoginWithUport';
import LoginForm from './LoginForm';
import Nav from './Nav';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    backgroundColor: theme.palette.greys.headerGrey
  },
  leftPanel: {
    width: '40%',
    height: '100vh',
    padding: '4.5rem 6rem',
    position: 'relative'
  },
  rightPanel: {
    backgroundImage: `${theme.gradients.primaryOverlay}, url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    width: '60%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '2rem',
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: '6rem'
  },
  bold: {
    fontWeight: '500'
  },
  bigLogoBox: {
    backgroundImage: theme.gradients.primary,
    borderRadius: 10,
    width: '28rem',
    height: '40rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 2.5rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  logoBoxUpper: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '11rem',
    fontWeight: '500',
    color: theme.palette.common.white
  },
  logoBoxLower: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '6rem',
    fontWeight: '500',
    marginBottom: '2rem',
    color: theme.palette.common.white
  },
  terms: {
    fontSize: '1.2rem',
    position: 'absolute',
    bottom: 20
  },
  nav: {
    position: 'absolute'
  }
});

class LoginWizard extends Component {
  state = {
    currentStep: 1,
    credentials: {}
  }

  _next = (data) => {
    if (data) {
      this.setState({ credentials: data });
    }
    // look familiar?
    let currentStep = this.state.currentStep;
    if (currentStep >= 3) {
      currentStep = 3;
    } else {
      currentStep = currentStep + 1;
    }
    this.setState({
      currentStep: currentStep
    });
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.leftPanel}>
          <div className={classes.header}>
            <Logo />
          </div>
          <div>
            {this.state.currentStep === 1 && <LoginWithUport currentStep={this.state.currentStep} afterValid={this._next} />}
            {this.state.currentStep === 2 && <LoginForm currentStep={this.state.currentStep} afterValid={this._next} credentials={this.state.credentials} />}
          </div>
          <div className={classes.terms}>
            By signing in, you agree to <span className={classes.bold}>Cash36 Terms and Conditions & Privacy Policy</span>
          </div>
        </div>
        <div className={classes.rightPanel}>
          <div className={classes.nav}>
            <Nav />
          </div>
          <div className={classes.bigLogoBox}>
            <Typography className={classes.logoBoxUpper}>36</Typography>
            <Typography className={classes.logoBoxLower}>Cash</Typography>
          </div>
        </div>
      </div>
    );
  }
}

LoginWizard.propTypes = {
  classes: PropTypes.object
};

export default (withStyles(styles)(LoginWizard));
