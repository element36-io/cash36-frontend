import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, TextField } from '@material-ui/core';
import DefaultButton from '../Buttons/DefaultButton';

import './AddWalletForm.scss';

const AddWalletForm = ({ onChange, value, error, onSubmit, submitting }) => {
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
        {submitting ? <CircularProgress size={20} /> : 'Add Wallet'}
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
