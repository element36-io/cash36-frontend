import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import WalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

import SecondaryButton from '../Buttons/SecondaryButton';
import DefaultButton from '../Buttons/DefaultButton';
import { WalletContext } from '../../providers/wallet.provider';

import './AddWalletButton.scss';

const AddWalletButton = ({ primary = true }) => {
  const { onOpenAdd } = useContext(WalletContext);

  if (primary) {
    return (
      <DefaultButton
        className="add-wallet-button"
        variant="contained"
        onClick={onOpenAdd}
      >
        <WalletIcon />
        Add Wallet
      </DefaultButton>
    );
  }

  return (
    <SecondaryButton
      className="add-wallet-button"
      variant="contained"
      onClick={onOpenAdd}
    >
      <WalletIcon />
      Add Wallet
    </SecondaryButton>
  );
};

AddWalletButton.propTypes = {
  primary: PropTypes.bool
};

export default AddWalletButton;
