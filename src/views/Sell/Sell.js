import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  };

  render () {
    const { amount, symbol } = this.state;
    const selectedToken = this.props.tokens.filter(token => token.symbol === symbol)[0];

    return (
      <div className='sell paper token-actions'>
        <div className='sell__content'>
          <SellToknes amount={amount} symbol={symbol} handleChange={this.handleChange} nextStep={this.nextStep}
            token={selectedToken} />
        </div>
      </div>
    );
  }
}

Sell.propTypes = {
  tokens: PropTypes.array,
  getTokens: PropTypes.func
};

const mapStateToProps = ({ tokens: { tokens = [] } }) => ({
  tokens
});

export default requireAuth(addCash36(connect(mapStateToProps, { getTokens })(Sell)));
