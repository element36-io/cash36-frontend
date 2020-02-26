import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import StepButton from '../../../components/Buttons/StepButton';
import { Web3Context } from '../../../providers/web3.provider';
import TransferFooter from '../TransferFooter';

import './TransferAddress.scss';

const TransferAddress = ({ setStep, address, setAddress }) => {
  const [error, setError] = useState('');
  const { utils, eth } = useContext(Web3Context);

  const checkIsContractAddress = async address => {
    const isAddress = utils.isAddress(address);
    if (!isAddress) return false;

    const code = await eth.getCode(address);

    if (code === '0x') return false;

    return true;
  };

  const handleChange = e => {
    const { value } = e.target;

    setAddress(value);
  };

  const onSubmit = async () => {
    const isContractAddress = await checkIsContractAddress(address);

    if (!isContractAddress) {
      setError('The target address is not a valid ethereum contract address.');
      return;
    }

    setStep(1);
  };

  return (
    <div className="invest-transfer-address">
      <h2>Send tokens to</h2>

      <div className="invest-transfer-address__input-wrapper">
        <input
          onChange={handleChange}
          placeholder="Smart Contract address"
          name="address"
          value={address}
          autoComplete="off"
        />
        <span />
      </div>

      <StepButton text={'Next Step'} onClick={onSubmit} disabled={!address} />
      {error && <p className="error-text">{error}</p>}

      <TransferFooter
        textline1="Sending cash36 Tokens is as simple as a bank transfer. First, add address you wish to send tokens to."
        textline2="After that you will select the amount and the type of Token you wish to send."
      />
    </div>
  );
};

TransferAddress.propTypes = {
  address: PropTypes.string,
  setAddress: PropTypes.func,
  setStep: PropTypes.func
};

export default TransferAddress;
