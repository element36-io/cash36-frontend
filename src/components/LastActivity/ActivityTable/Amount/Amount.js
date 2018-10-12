import React from 'react';
import PropTypes from 'prop-types';
import formatAmount from '../../../../helpers/formatAmount';

import './Amount.scss';

const Amount = ({ type, amount, symbol }) => {
  const renderAction = () => {
    if (type === 'SELL') return `+${formatAmount(amount)}`;
    if (type === 'BUY') return `-${formatAmount(amount)}`;
  };
  return (
    <div className='activity-table-amount'>
      <div>{renderAction()}</div>
      <div>{symbol}</div>
    </div>
  );
};

Amount.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired
};

export default Amount;
