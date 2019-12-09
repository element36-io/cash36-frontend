import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, TextField } from '@material-ui/core';
import DefaultButton from '../Buttons/DefaultButton';
import useInterval from '../../hooks/useInterval';

import './AddWalletForm.scss';

const feedbackValues = [
  'Sending transactions to Blockchain',
  'Awaiting confirmation',
  'Adding wallet to element 36 KYC network',
  'Updating Smart Contracts',
  'Publishing results',
  'Preparing next steps ...'
];

const AddWalletForm = ({ onChange, value, error, onSubmit, submitting }) => {
  const [feedbackText, setFeedbackText] = useState(feedbackValues[0]);
  const [isRunning, setIsRunning] = useState(true);
  const [count, setCount] = useState(0);

  useInterval(
    () => {
      setCount(count => count + 1);
      setFeedbackText(feedbackValues[count]);

      if (count === feedbackValues.length - 1) setIsRunning(null);
    },
    isRunning ? 2000 : null
  );

  return (
    <form className="add-wallet-form" onSubmit={onSubmit}>
      <TextField
        label="Wallet Name"
        onChange={onChange}
        value={value}
        fullWidth
      />
      {error && <p className="error-text">{error}</p>}
      <DefaultButton onClick={onSubmit} disabled={submitting || !value.length}>
        {submitting ? (
          <span className="add-wallet-form__feedback">
            <CircularProgress size={20} /> {feedbackText}
          </span>
        ) : (
          'Add Wallet'
        )}
      </DefaultButton>
    </form>
  );
};

AddWalletForm.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

export default AddWalletForm;
