import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formatAmount } from '../../helpers/currencies.helpers';
import { getMainWalletAddress } from '../../helpers/wallet.helpers';
import useGetEtherBalance from '../../hooks/useGetEtherBalance';

import './AvailableBalance.scss';

const AvailableBalance = ({ symbol, tokens, hasWallet, mainWallet }) => {
  const selectedToken = tokens.filter(token => token.symbol === symbol)[0];

  const etherBalance = useGetEtherBalance(mainWallet);

  if (!hasWallet) {
    return null;
  }

  if (!selectedToken) {
    return (
      <div className="available-balance">
        Available Balance:
        {`${formatAmount(0)} ${symbol} ${
          etherBalance ? `(${formatAmount(etherBalance)} ether)` : ''
        }`}
      </div>
    );
  }

  return (
    <div className="available-balance">
      Available Balance:{' '}
      {`${formatAmount(selectedToken.balance)} ${symbol} ${
        etherBalance ? `(${formatAmount(etherBalance)} ether)` : ''
      }`}
    </div>
  );
};

AvailableBalance.propTypes = {
  symbol: PropTypes.string.isRequired,
  hasWallet: PropTypes.bool,
  tokens: PropTypes.array,
  mainWallet: PropTypes.string
};

const mapStateToProps = state => {
  return {
    tokens: state.tokens.tokens,
    hasWallet: Boolean(state.wallets.walletList.length),
    mainWallet: getMainWalletAddress(state.wallets.walletList)
  };
};

export default connect(mapStateToProps)(AvailableBalance);
