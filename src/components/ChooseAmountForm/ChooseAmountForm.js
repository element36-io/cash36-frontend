import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, MenuItem } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { matches } from 'validator';

import './ChooseAmountForm.scss';

export const ChooseAmountForm = React.memo(
  ({ tokenSymbols, symbol, amount, handleChange }) => {
    const handleAmountChange = event => {
      const { value } = event.target;

      if (matches(value, /^[1-9]{1}\d*[.|,]?(?:\d{1,2})?$/) || value === '') {
        handleChange(event);
      }
    };

    return (
      <div className="choose-amount-form">
        <TextField
          name="amount"
          id="amount"
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
          id="symbol"
          label="Select Token"
          value={symbol}
          onChange={handleChange}
          placeholder="TOKEN36"
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
