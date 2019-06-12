import React, { Component } from 'react';
import { connect } from 'react-redux';
import addCash36 from '../../components/cash36';
import { Cash36Contract, Token36Contract } from 'cash36-contracts';
import TransferAddress from './TransferAddress';
import TransferAmount from './TransferAmount';
import BackButton from '../../components/Buttons/BackButton';
import { getTokens } from '../../store/tokens/tokens.actions';
import {
  getContacts,
  removeQuickTransfer
} from '../../store/contacts/contacts.actions';
import TransferConfirmation from './TransferConfirmation';
import TransferSuccess from './TransferSuccess';
import TransferError from './TransferError';

import './Transfer.scss';

class Transfer extends Component {
  constructor (props) {
    super(props);
    console.warn('======== TRANSFER', this.props);
    this.state = {
      step: this.props.quickTransfer ? 1 : 0,
      symbol: 'EUR36',
      amount: '',
      target: this.props.quickTransfer,
      error: null
    };
  }

  componentDidMount () {
    this.props.getTokens();
    this.props.getContacts();
    if (this.props.quickTransfer) this.props.removeQuickTransfer();
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  nextStep = () => {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  };

  previousStep = () => {
    this.setState(prevState => {
      return { step: prevState.step - 1 };
    });
  };

  addTarget = target => {
    this.setState({ target });
    this.nextStep();
  };

  sendTransfer = amount => {
    try {
      this.setState({ step: 2, ...amount }, () => {
        this.transferTokens();
      });
    } catch (error) {
      console.log(error);
    }
  };

  transferTokens = async () => {
    const { web3, networkId, account } = this.props;
    const {
      target: { contactAddress },
      amount,
      symbol
    } = this.state;

    const cash36Contract = new web3.eth.Contract(
      Cash36Contract.abi,
      Cash36Contract.networks[networkId].address
    );
    const tokenAddress = await cash36Contract.methods
      .getTokenBySymbol(symbol)
      .call();
    const token36Contract = new web3.eth.Contract(
      Token36Contract.abi,
      tokenAddress
    );

    // Calculate amount of gas needed and add extra margin of 10%
    const estimate = await token36Contract.methods
      .transfer(contactAddress, amount)
      .estimateGas({ from: account });
    const data = await token36Contract.methods
      .transfer(contactAddress, amount)
      .encodeABI();

    const options = {
      from: account,
      to: tokenAddress,
      gas: estimate + Math.round(estimate * 0.1),
      nonce: await web3.eth.getTransactionCount(account, 'pending'),
      data
    };

    return web3.eth
      .sendTransaction(options)
      .once('transactionHash', hash => {
        if (this._isMounted) this.setState({ step: 3 });
      })
      .on('error', error => {
        console.log(error);
        if (this._isMounted) {
          this.setState({
            step: 4,
            error: 'Transfer has been denied via mobile device'
          });
        }
      });
  };

  renderStep = () => {
    const { amount, symbol, step, target, error } = this.state;
    const {
      web3: { utils },
      contactsList,
      tokens
    } = this.props;

    switch (step) {
      case 1:
        return (
          <TransferAmount
            submitCallback={this.sendTransfer}
            target={target}
            tokens={tokens}
          />
        );
      case 2:
        return <TransferConfirmation target={target} />;
      case 3:
        return (
          <TransferSuccess amount={amount} target={target} symbol={symbol} />
        );
      case 4:
        return <TransferError message={error} />;
      default:
        return (
          <TransferAddress
            submitCallback={this.addTarget}
            contactsList={contactsList}
            utils={utils}
          />
        );
    }
  };

  render () {
    const { step } = this.state;
    return (
      <div className="wrapper">
        <div className="transfer paper">
          <div className="transfer__content">
            {step === 1 && <BackButton onClick={this.previousStep} />}
            {this.renderStep()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  tokens: { tokens = [] },
  auth: { user },
  contacts: { contactsList, quickTransfer }
}) => ({
  tokens,
  account: user.account,
  contactsList,
  quickTransfer
});

export default addCash36(
  connect(
    mapStateToProps,
    { getTokens, getContacts, removeQuickTransfer }
  )(Transfer)
);
