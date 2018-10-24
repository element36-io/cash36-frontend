import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Cash36Contract, Token36Contract } from 'cash36-contracts';
import requireAuth from '../../components/requireAuth';
import SellToknes from './SellTokens';
// import SellConfirmation from './SellConfirmation';
// import SellSuccess from './SellSuccess';
import { getTokens } from '../../store/tokens/tokens.actions';
import addCash36 from '../../components/cash36';
import './Sell.scss';

class Sell extends Component {
  state = {
    step: 0,
    amount: '245',
    symbol: 'EUR36'
  };

  componentDidMount () {
    this.props.getTokens();
    console.log('==================');
    console.log('==================');
    console.log(this.props);
    console.log('==================');
    console.log('==================');
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  nextStep = () => {
    console.log('next step');
    console.log('==================');
    console.log('==================');
    console.log(this.props);
    console.log('==================');
    console.log('==================');
    this.burnTokens();
  };

  async burnTokens (address = this.props.user.username, tokenSymbol = 'EUR36', amount = 20) {
    let { web3, networkId } = this.props;
    // let web3 = this.props.web3;

    const cash36Contract = new web3.eth.Contract(Cash36Contract.abi, Cash36Contract.networks[networkId].address);
    let tokenAddress = await cash36Contract.methods.getTokenBySymbol(tokenSymbol).call();
    const token36Contract = new web3.eth.Contract(Token36Contract.abi, tokenAddress);

    // Calculate amount of gas needed and add extra margin of 10%
    let estimate = await token36Contract.methods.burn(amount).estimateGas({ from: address });
    let data = await token36Contract.methods.burn(amount).encodeABI();

    const options = {
      from: address,
      to: tokenAddress,
      gas: estimate + Math.round(estimate * 0.1),
      nonce: await web3.eth.getTransactionCount(address, 'pending'),
      data
    };

    return web3.eth.sendTransaction(options);
  }

  render () {
    const { amount, symbol } = this.state;
    const selectedToken = this.props.tokens.filter(token => token.symbol === symbol)[0];

    return (
      <div className='wrapper'>
        <div className='sell paper'>
          <div className='sell__content'>
            <SellToknes amount={amount} symbol={symbol} handleChange={this.handleChange} nextStep={this.nextStep}
              token={selectedToken} />
          </div>
        </div>
      </div>
    );
  }
}

Sell.propTypes = {
  tokens: PropTypes.array,
  getTokens: PropTypes.func
};

const mapStateToProps = ({ tokens: { tokens = [] }, auth: { user } }) => ({
  tokens,
  user
});

export default requireAuth(addCash36(connect(mapStateToProps, { getTokens })(Sell)));
