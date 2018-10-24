import React, { Component } from 'react';
import requireAuth from '../../components/requireAuth';
import API from '../../config/api';
import Responsive from '../../components/Responsive';
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
  };

  nextStep = () => {
    if (this.state.step === 0) {
      if (this.state.amount && this.state.symbol) {
        this.setState({ step: 1 });
      }
    }
  };

  previousStep = () => {
    this.setState((prevState) => {
      return { step: Math.round(prevState.step - 1) };
    });
  };

  handleManualTransferClick = async () => {
    const data = {
      amount: parseInt(this.state.amount),
      symbol: this.state.symbol
    };

    try {
      const response = await API.post('/cash36/buy', data);
      this.setState({
        manualTransferData: response.data,
        step: 2.1
      });
    } catch (error) {
      console.log(error); // TODO, handle the error
    }
  };

  handleAutoTransferClick = () => {
    console.log('auto transfer chosen');
    this.setState({ step: 2.2 });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOrderSubmit = () => {
    console.log('order submitted');
  };

  render () {
    const { step, manualTransferData } = this.state;
    return (
      <div className="page-wrapper">
        <div className='buy paper'>
          {step > 0 && <BackButton onClick={this.previousStep}/>}
          <Responsive>
            <Stepper step={step}/>
          </Responsive>
          <Responsive isMobile>
            {step !== 2.2 && <Stepper step={step}/>}
          </Responsive>
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
              <br/>
              After that you will receive the transfer instructions. Once we receive the amount, the tokens will be credited to your account.
            </span>}
            {step > 2 &&
            <span>
              Please make sure your payment will be triggered from your registered bank account: IBAN CH3343 23 3 32 32 32
            </span>}
          </div>
        </div>
      </div>
    );
  }
}

export default requireAuth(Buy);
