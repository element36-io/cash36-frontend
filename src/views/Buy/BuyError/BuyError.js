import React from 'react';
import PropTypes from 'prop-types';
import ActionStatus from '../../../components/ActionStatus';
import TransactionFooter from '../../../components/TransactionFooter';

import './BuyError.scss';

const BuyError = ({ title, message }) => {
  return (
    <div className="buy__buy-status" data-testid="buy-error">
      <ActionStatus type="error" title={title} />
      <p>{message}</p>
      <TransactionFooter />
    </div>
  );
};

BuyError.propTypes = {
  message: PropTypes.string.isRequired
};

export default BuyError;
