import React, { Component } from 'react';
import SellToknes from './SellTokens';
import './Sell.scss';

class Sell extends Component {
  state = {
    step: 0,
    amount: '',
    symbol: 'EUR36'
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  nextStep = () => {
    console.log('next step');
  };

  render () {
    const { amount, symbol } = this.state;

    return (
      <div className='sell paper token-actions'>
        <div className='sell__content'>
          <SellToknes amount={amount} symbol={symbol} handleChange={this.handleChange} nextStep={this.nextStep} />
        </div>
      </div>
    );
  }
}

export default Sell;
