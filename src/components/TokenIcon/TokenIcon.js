import React from 'react';
import PropTypes from 'prop-types';
import euroIcon from '../../assets/BalanceCard/euro-icon.svg';
import dollarIcon from '../../assets/BalanceCard/dollar-icon.svg';
import poundIcon from '../../assets/BalanceCard/pound-icon.svg';
import francIcon from '../../assets/BalanceCard/franc-icon.svg';
import etherIcon from '../../assets/BalanceCard/ether-icon.svg';

const TokenIcon = ({ symbol }) => {
  switch (symbol) {
    case 'EUR36':
      return <img src={euroIcon} alt="EURO TOKEN" />;
    case 'USD36':
      return <img src={dollarIcon} alt="DOLLAR TOKEN" />;
    case 'GBP36':
      return <img src={poundIcon} alt="POUND TOKEN" />;
    case 'CHF36':
      return <img src={francIcon} alt="FRANC TOKEN" />;
    case 'ETHER':
      return <img src={etherIcon} alt="ETHER ICON" />;
    default:
      return null;
  }
};

TokenIcon.propTypes = {
  symbol: PropTypes.string.isRequired
};

export default TokenIcon;
