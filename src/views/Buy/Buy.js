import React, { Component } from 'react';
import Stepper from './Stepper';
import BuyTokens from './BuyTokens';
import PaymentMethod from './PaymentMethod';

import './Buy.scss';

class Buy extends Component {
  state = {
    step: 0,
    amount: '',
    symbol: 'EUR36',
    errorMessage: ''
  }

  nextStep = () => {
    if (this.state.step === 0) {
      if (this.state.amount && this.state.symbol) {
        this.setState({ step: 1 });
      }
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render () {
    const { step } = this.state;
    return (
      <div className='buy paper'>
        <Stepper step={step} />
        <div className='buy__content'>
          {step === 0 &&
            <BuyTokens
              handleChange={this.handleChange}
              amount={this.state.amount}
              symbol={this.state.symbol}
              nextStep={this.nextStep}
            />}
          {step === 1 && <PaymentMethod />}
        </div>
        <div className='buy__footer'>
          Buying cash36 Tokens is as simple as a bank transfer. First, choose amount and type of Token you wish to buy.
          <br />
          After that you will receive the transfer instructions. Once we receive the amount, the tokens will be credited to your account.
        </div>
      </div>
    );
  }
}

export default Buy;
