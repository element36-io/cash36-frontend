import React from 'react';
import PropTypes from 'prop-types';

import useGetEtherBalance from '../../../hooks/useGetEtherBalance';
import BalanceCard from '../BalanceCard';

const EtherBalanceCard = ({ walletAddress }) => {
  const balance = useGetEtherBalance(walletAddress);

  return <BalanceCard name="Ether" symbol="ETHER" balance={balance} />;
};

EtherBalanceCard.propTypes = {
  walletAddress: PropTypes.string.isRequired
};

export default EtherBalanceCard;
