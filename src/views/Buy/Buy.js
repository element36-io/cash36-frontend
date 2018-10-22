import React, { Component } from 'react';
import API from '../../config/api';
import Stepper from './Stepper';
import BuyTokens from './BuyTokens';
import PaymentMethod from './PaymentMethod';
import InitiateManualPayment from './InitiateManualPayment';
import InitiateAutoPayment from './InitiateAutoPayment';
import BackButton from '../../components/Buttons/BackButton';

import './Buy.scss';

class Buy extends Component {
  state = {
    step: 0,
    amount: '',
    symbol: 'EUR36',
    manualTransferData: null
  }

  nextStep = () => {
    if (this.state.step === 0) {
      if (this.state.amount && this.state.symbol) {
        this.setState({ step: 1 });
      }
    }

    if (this.state.step === 1) {
      this.onManualTransferClick();
    }
  }

  previousStep = () => {
    this.setState((prevState) => {
      return { step: parseInt(prevState.step - 1) };
    });
  }

  handleManualTransferClick = async () => {
    console.log(this.state.amount, this.state.symbol);
    const data = {
      amount: parseInt(this.state.amount),
      symbol: this.state.symbol
    };
    const response = await API.post('/cash36/buy', data);
    this.setState({
      manualTransferData: response.data,
      step: 2.1
    });
  }

  handleAutoTransferClick = () => {
    console.log('auto transfer chosen');
    this.setState({ step: 2.2 });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleOrderSubmit = () => {
    console.log('order submitted');
  }

  render () {
    const { step, manualTransferData } = this.state;
    return (
      <div className='buy paper'>
        {step > 0 && <BackButton onClick={this.previousStep} />}
        <Stepper step={step} />
        <div className='buy__content'>
          {step === 0 &&
            <BuyTokens
              handleChange={this.handleChange}
              amount={this.state.amount}
              symbol={this.state.symbol}
              nextStep={this.nextStep}
            />}
          {step === 1 &&
            <PaymentMethod
              next={this.nextStep}
              handleManualTransferClick={this.handleManualTransferClick}
              handleAutoTransferClick={this.handleAutoTransferClick}
            />}
          {step === 2.1 &&
            <InitiateManualPayment
              next={this.nextStep}
              handleOrderSubmit={this.handleOrderSubmit}
              transferData={manualTransferData}
            />}
          {step === 2.2 &&
            <InitiateAutoPayment
              next={this.nextStep}
            />}
        </div>
        <div className='buy__footer'>
          {(step < 2) &&
            <span>
              Buying cash36 Tokens is as simple as a bank transfer. First, choose amount and type of Token you wish to buy.
              <br />
              After that you will receive the transfer instructions. Once we receive the amount, the tokens will be credited to your account.
            </span>}
          {step > 2 &&
            <span>
              Please make sure your payment will be triggered from your registered bank account: IBAN CH3343 23 3 32 32 32
            </span>}
        </div>
      </div>
    );
  }
}

export default Buy;
