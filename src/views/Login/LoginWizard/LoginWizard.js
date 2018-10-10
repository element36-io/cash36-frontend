import React, { Component } from 'react';
import LoginWithUport from '../LoginWithUport';
import LoginForm from '../LoginForm';

class LoginWizard extends Component {
  state = {
    currentStep: 1,
    uportCreds: {}
  }

  _next = (data) => {
    if (data) {
      this.setState({ uportCreds: data });
    }
    // look familiar?
    let { currentStep } = this.state;
    if (currentStep >= 2) {
      currentStep = 2;
    } else {
      currentStep = currentStep + 1;
    }
    this.setState({ currentStep });
  }

  render () {
    const { currentStep, uportCreds } = this.state;
    return (
      <div>
        {currentStep === 1 && <LoginWithUport currentStep={currentStep} afterValid={this._next} />}
        {currentStep === 2 && <LoginForm currentStep={currentStep} afterValid={this._next} uportCreds={uportCreds} />}
      </div>
    );
  }
}

export default LoginWizard;
