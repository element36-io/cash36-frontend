import React from 'react';
import PropTypes from 'prop-types';
import ActionStatus from '../../../components/ActionStatus';
import TransactionFooter from '../../../components/TransactionFooter';

const SellError = ({ message }) => (
  <div className="sell__sell-status">
    <ActionStatus type="error" title="Selling unsuccessful" />
    <p>{message}</p>
    <TransactionFooter />
  </div>
);

SellError.propTypes = {
  message: PropTypes.string.isRequired
};

export default SellError;
