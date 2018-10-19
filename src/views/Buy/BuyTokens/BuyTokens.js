import React from 'react';

import './BuyTokens.scss';
import { TextField, MenuItem } from '@material-ui/core';

const BuyTokens = ({ onSubmit, onAmountChange, amount, onSymbolChange, symbol }) => (
  <form className='buy-tokens' onSubmit={onSubmit}>
    <h2>Buy Tokens</h2>
    <div className='buy-tokens__inputs'>
      <TextField
        name='amount'
        label='Choose Amount'
        type='text'
        onChange={onAmountChange}
        autoComplete='off'
        value={amount}
        fullWidth
        InputProps={{
          disableUnderline: true,
          className: 'buy-tokens__number-input'
        }}
        InputLabelProps={{
          shrink: true,
          className: 'buy-tokens__number-input--label'
        }}
      />
      <TextField
        name='symbol'
        label='Select Token'
        value={symbol}
        onChange={onSymbolChange}
        select
        fullWidth
        InputProps={{
          disableUnderline: true
        }}
        SelectProps={{
          displayEmpty: true
        }}
        InputLabelProps={{
          shrink: true
        }}
      >
        <MenuItem value='EUR36'>EUR36</MenuItem>
        <MenuItem value='CHF36'>CHF36</MenuItem>
      </TextField>
    </div>
  </form>
);

export default BuyTokens;
