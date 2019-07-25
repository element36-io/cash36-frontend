import React from 'react';
import PropTypes from 'prop-types';
import ActionStatus from '../../../components/ActionStatus';
import TransactionFooter from '../../../components/TransactionFooter';

import './BuyError.scss';

const BuyError = ({ message }) => {
  return (
    <div className="buy__buy-status">
      <ActionStatus type="error" title="Buy unsuccessful" />
      <p>{message}</p>
      <TransactionFooter />
    </div>
  );
};

BuyError.propTypes = {
  message: PropTypes.string.isRequired
};

export default BuyError;
