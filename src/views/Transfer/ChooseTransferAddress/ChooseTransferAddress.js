import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import StepButton from '../../../components/Buttons/StepButton';

import './ChooseTransferAddress.scss';

const ChooseTransferAddress = ({ handleAddressChange, address, handleAddressSubmit, inputError }) => (
  <div className='choose-transfer-address'>
    <h2>Transfer Tokens</h2>
    <h4>Sending tokens to</h4>
    <div className='choose-transfer-address__input-wrapper'>
      <TextField
        name='address'
        type='text'
        onChange={handleAddressChange}
        placeholder='Address'
        value={address}
        autoComplete='off'
        fullWidth
        className='choose-transfer-address__input'
        InputProps={{
          disableUnderline: true
        }}
      />
      <span>{inputError}</span>
    </div>
    <StepButton text={'Next Step'} onClick={handleAddressSubmit} disabled={!address} />
  </div>
);

ChooseTransferAddress.propTypes = {
  handleAddressChange: PropTypes.func,
  nextStep: PropTypes.func,
  address: PropTypes.string
};

export default ChooseTransferAddress;
