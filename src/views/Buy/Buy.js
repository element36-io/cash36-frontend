import React, { Component } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import StyledButton from '../../components/StyledButton';
import Stepper from './Stepper';
import BuyTokens from './BuyTokens';
import PaymentMethod from './PaymentMethod';
import { isNumeric } from 'validator';

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

  onAmountSubmit = () => {
    console.log(this.state.amount);
  }

  onAmountChange = (event) => {
    const { name, value } = event.target;
    if (isNumeric(value) || value === '') {
      this.setState({ [name]: value });
    }
  }

  onSymbolChange = (event) => {
    const symbol = event.target.value;
    this.setState({ symbol });
  }

  render () {
    const { step } = this.state;
    return (
      <div className='buy paper'>
        <Stepper step={step} />
        <div className='buy__content'>
          {step === 0 && <BuyTokens onSubmit={this.onAmountSubmit} amount={this.state.amount} onAmountChange={this.onAmountChange} onSymbolChange={this.onSymbolChange} symbol={this.state.symbol} />}
          {step === 1 && <PaymentMethod />}
          <StyledButton
            variant='raised'
            color='primary'
            type='button'
            size='large'
            fullWidth
            className='buy__next-btn'
            onClick={step === 0 || 1 || 2 ? this.nextStep : this.submitOrder}
          >
            <span>{step === 0 || 1 || 2 ? 'Next Step' : 'Submit Order'}</span>
            <ArrowForwardIcon />
          </StyledButton>
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
