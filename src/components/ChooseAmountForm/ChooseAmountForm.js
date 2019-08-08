import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, MenuItem } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { isNumeric, toInt } from 'validator';

import './ChooseAmountForm.scss';

export const ChooseAmountForm = React.memo(
  ({ tokenSymbols, symbol, amount, handleChange }) => {
    const handleAmountChange = event => {
      const { value } = event.target;

      if (value.length === 1 && toInt(value) === 0) return;

      if (isNumeric(value) || value === '') {
        handleChange(event);
      }
    };

    return (
      <div className="choose-amount-form">
        <TextField
          name="amount"
          label="Choose Amount"
          type="text"
          onChange={handleAmountChange}
          placeholder="0"
          autoComplete="off"
          value={amount}
          fullWidth
          InputProps={{
            disableUnderline: true,
            className: 'choose-amount-form__number-input'
          }}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          name="symbol"
          label="Select Token"
          value={symbol}
          onChange={handleChange}
          select
          fullWidth
          InputProps={{
            disableUnderline: true
          }}
          SelectProps={{
            displayEmpty: true,
            IconComponent: KeyboardArrowDownIcon
          }}
          InputLabelProps={{
            shrink: true
          }}
        >
          {tokenSymbols.map(symbol => (
            <MenuItem key={symbol} value={symbol}>
              {symbol}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
);

ChooseAmountForm.propTypes = {
  tokenSymbols: PropTypes.array,
  amount: PropTypes.string,
  symbol: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

const mapStateToProps = ({ tokens: { tokens = [] } }) => ({
  tokenSymbols: tokens.map(token => token.symbol)
});

export default connect(mapStateToProps)(ChooseAmountForm);
