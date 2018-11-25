import React, { Component } from 'react';
import { connect } from 'react-redux';
import addCash36 from '../../components/cash36';
import { Cash36Contract, Token36Contract } from 'cash36-contracts';
import TransferAddress from './TransferAddress';
import ChooseTransferAmount from './ChooseTransferAmount';
import BackButton from '../../components/Buttons/BackButton';
import { getTokens } from '../../store/tokens/tokens.actions';
import TransferConfirmation from './TransferConfirmation';
import TransferSuccess from './TransferSuccess';
import TransferError from './TransferError';

import './Transfer.scss';

class Transfer extends Component {
  state = {
    step: 0,
    symbol: 'EUR36',
    amount: '',
    error: null
  };

  componentDidMount () {
    this.props.getTokens();
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  nextStep = () => {
    this.setState((prevState) => ({ step: prevState.step + 1 }));
  }

  previousStep = () => {
    this.setState((prevState) => {
      return { step: Math.round(prevState.step - 1) };
    });
  };

  handleAddressSubmit = () => {
      this.nextStep();
  }

  handleAmountChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSendTransferClick = () => {
    try {
      this.setState({ step: 2 });
      this.transferTokens();
    } catch (error) {
      console.log(error);
    }
  }

  transferTokens = async () => {
    const { web3, networkId, username } = this.props;
    const { address, symbol, amount } = this.state;

    const cash36Contract = new web3.eth.Contract(Cash36Contract.abi, Cash36Contract.networks[networkId].address);
    const tokenAddress = await cash36Contract.methods.getTokenBySymbol(symbol).call();
    const token36Contract = new web3.eth.Contract(Token36Contract.abi, tokenAddress);

    // Calculate amount of gas needed and add extra margin of 10%
    const estimate = await token36Contract.methods.transfer(address, amount).estimateGas({ from: username });
    const data = await token36Contract.methods.transfer(address, amount).encodeABI();

    const options = {
      from: username,
      to: tokenAddress,
      gas: estimate + Math.round(estimate * 0.1),
      nonce: await web3.eth.getTransactionCount(username, 'pending'),
      data
    };

    return web3.eth.sendTransaction(options)
      .once('transactionHash', hash => {
        if (this._isMounted) this.setState({ step: 3 });
      })
      .on('error', error => {
        console.log(error);
        if (this._isMounted) this.setState({ step: 4, error: 'Transfer has been denied via mobile device' });
      });
  }

  renderStep = () => {
    const { amount, symbol, step, address, error } = this.state;
    const {web3: {utils}} = this.props;
    const selectedToken = this.props.tokens.filter(token => token.symbol === symbol)[0];

    switch (step) {
      case 1:
        return (
          <ChooseTransferAmount
            symbol={symbol}
            amount={amount}
            handleChange={this.handleAmountChange}
            address={address}
            token={selectedToken}
            handleSendTransferClick={this.handleSendTransferClick}
          />
        );
      case 2:
        return <TransferConfirmation address={address} />;
      case 3:
        return <TransferSuccess amount={amount} address={address} symbol={symbol} />;
      case 4:
        return <TransferError message={error} />;
      default:
        return (
          <TransferAddress
            submitCallback={this.handleAddressSubmit}
            utils={utils}
          />
        );
    }
  };

  render () {
    const { step } = this.state;
    return (
      <div className='wrapper'>
        <div className='transfer paper'>
          <div className='transfer__content'>
            {step === 1 && <BackButton onClick={this.previousStep} />}
            {this.renderStep()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tokens: { tokens = [] }, auth: { user } }) => ({
  tokens,
  username: user.username
});

export default addCash36(connect(mapStateToProps, { getTokens })(Transfer));
