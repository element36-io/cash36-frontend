import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTokens } from '../../store/tokens/tokens.actions';
import { getMainWalletAddress } from '../../helpers/wallet.helpers';
import BalanceCard from '../BalanceCard';
import EtherBalanceCard from '../BalanceCard/EtherBalanceCard';
import useGet from '../../hooks/useGet';

import './BalanceCards.scss';

export const BalanceCards = ({ tokens, getTokens, walletList }) => {
  const hasWallet = Boolean(walletList.length);

  let walletAddress;

  const tokensError = useGet(getTokens)[1];

  if (hasWallet) {
    walletAddress = getMainWalletAddress(walletList);
  }

  if (tokensError) {
    return (
      <div className="balance-cards error-text">
        Fetching data error - {tokensError}
      </div>
    );
  }

  return (
    <div
      className={`balance-cards ${tokens.length > 3 ? '--space-between' : ''}`}
    >
      {tokens.map(({ symbol, name, balance }) => (
        <BalanceCard key={name} name={name} symbol={symbol} balance={balance} />
      ))}
      {hasWallet && walletAddress && (
        <EtherBalanceCard walletAddress={walletAddress} />
      )}
    </div>
  );
};

const mapStateToProps = ({
  tokens: { tokens = [] },
  wallets: { walletList }
}) => ({
  tokens,
  walletList,
  hasWallet: Boolean(walletList.length)
});

BalanceCards.propTypes = {
  getTokens: PropTypes.func.isRequired,
  tokens: PropTypes.array.isRequired,
  walletList: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  { getTokens }
)(BalanceCards);
