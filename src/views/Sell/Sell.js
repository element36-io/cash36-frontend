import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Cash36Contract, Token36Contract } from 'cash36-contracts';
import SellTokens from './SellTokens';
import SellConfirmation from './SellConfirmation';
import SellSuccess from './SellSuccess';
import SellError from './SellError';
import { getTokens } from '../../store/tokens/tokens.actions';
import addCash36 from '../../components/cash36';
import './Sell.scss';

class Sell extends Component {
  state = {
    step: 0,
    amount: '',
    symbol: 'EUR36',
    error: null
  };

  componentDidMount () {
    this.props.getTokens();
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  nextStep = () => {
    this.setState({ step: 1 });
    this.burnTokens();
  };

  burnTokens = async () => {
    let { web3, networkId, user: { username } } = this.props;
    const { symbol, amount } = this.state;

    const cash36Contract = new web3.eth.Contract(Cash36Contract.abi, Cash36Contract.networks[networkId].address);
    const tokenAddress = await cash36Contract.methods.getTokenBySymbol(symbol).call();
    const token36Contract = new web3.eth.Contract(Token36Contract.abi, tokenAddress);

    // Calculate amount of gas needed and add extra margin of 10%
    const estimate = await token36Contract.methods.burn(amount).estimateGas({ from: username });
    const data = await token36Contract.methods.burn(amount).encodeABI();

    const options = {
      from: username,
      to: tokenAddress,
      gas: estimate + Math.round(estimate * 0.1),
      nonce: await web3.eth.getTransactionCount(username, 'pending'),
      data
    };

    return web3.eth.sendTransaction(options)
      .on('receipt', () => {
        if (this._isMounted) this.setState({ step: 2 });
      })
      .on('error', () => {
        // Update with proper error message
        if (this._isMounted) this.setState({ step: 3, error: 'Selling token was unsuccessful' });
      });
  };

  renderStep = () => {
    const { amount, symbol, step, error } = this.state;
    const selectedToken = this.props.tokens.filter(token => token.symbol === symbol)[0];

    switch (step) {
      case 1:
        return <SellConfirmation />;
      case 2:
        return <SellSuccess amount={amount} symbol={symbol} />;
      case 3:
        return <SellError message={error} />;
      default:
        return <SellTokens amount={amount} symbol={symbol} handleChange={this.handleChange} nextStep={this.nextStep}
          token={selectedToken} />;
    }
  };

  render () {
    return (
      <div className='wrapper'>
        <div className='sell paper'>
          <div className='sell__content'>
            {this.renderStep()}
          </div>
        </div>
      </div>
    );
  }
}

Sell.propTypes = {
  tokens: PropTypes.array,
  getTokens: PropTypes.func,
  receiptCallback: PropTypes.func
};

const mapStateToProps = ({ tokens: { tokens = [] }, auth: { user } }) => ({
  tokens,
  user
});

export default addCash36(connect(mapStateToProps, { getTokens })(Sell));
