import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChooseAmountForm from '../../../components/ChooseAmountForm';
import Avatar from '../../../components/Avatar';
import TruncateString from 'react-truncate-string';
import AvailableBalance from '../../../components/AvailableBalance';
import StepButton from '../../../components/Buttons/StepButton';

import './TransferAmount.scss';

class TransferAmount extends Component {

  state = {
    amount: '',
    symbol: 'EUR36'
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  submitAmount = () => {
    const {amount, symbol} = this.state;
    this.props.submitCallback({amount, symbol});
  }

  isDisabled = () => {
    const {amount, symbol} = this.state;
    const balance = this.props.tokens.filter(token => token.symbol === symbol)[0].balance;
    return !this.state.amount || amount > balance;
  }

  render () {
    const { target, submitCallback, tokens } = this.props;
    const { amount, symbol} = this.state;
    const selectedToken = tokens.filter(token => token.symbol === symbol)[0];

    return (
      <div className='transfer-amount'>
        <div className='transfer-amount__header'>
          <h4>Sending to</h4>
          <Avatar avatarUrl={target.avatarUrl} cssClass='transfer-amount__avatar'/>
          {target.contactName && <span>{target.contactName}</span>}
          <TruncateString text={target.contactAddress}/>
        </div>
        <hr/>
        <ChooseAmountForm
          amount={amount}
          symbol={symbol}
          handleChange={this.handleChange}
        />
        <AvailableBalance balance={selectedToken ? selectedToken.balance : 0} symbol={symbol}/>
        <StepButton text={'Send'} onClick={this.submitAmount} disabled={this.isDisabled()}/>
      </div>
    );
  }
}

TransferAmount.propTypes = {
  target: PropTypes.object.isRequired,
  submitCallback: PropTypes.func.isRequired,
  tokens: PropTypes.array.isRequired,
};

export default TransferAmount;
