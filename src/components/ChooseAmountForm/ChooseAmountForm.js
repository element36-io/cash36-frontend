import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { isNumeric } from 'validator';

import './ChooseAmountForm.scss';

class ChooseAmountForm extends PureComponent {
  handleAmountChange = (event) => {
    const { value } = event.target;
    if (isNumeric(value) || value === '') {
      this.props.handleChange(event);
    }
  }
  render () {
    return (
      <div className='choose-amount-form'>
        <TextField
          name='amount'
          label='Choose Amount'
          type='text'
          onChange={this.handleAmountChange}
          placeholder='0'
          autoComplete='off'
          value={this.props.amount}
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
          name='symbol'
          label='Select Token'
          value={this.props.symbol}
          onChange={this.props.handleChange}
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
          <MenuItem value='EUR36'>EUR36</MenuItem>
          <MenuItem value='CHF36'>CHF36</MenuItem>
        </TextField>
      </div>
    );
  }
}

ChooseAmountForm.propTypes = {
  amount: PropTypes.string,
  symbol: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ChooseAmountForm;
