import React, { useContext } from 'react';
import DefaultButton from '../Buttons/DefaultButton';
import walletIcon from '../../assets/icons/wallet-plus-outline.svg';
import { AddWalletContext } from '../../providers/addWallet.provider';

import './AddWalletButton.scss';

const AddWalletButton = () => {
  const { onOpen } = useContext(AddWalletContext);

  return (
    <DefaultButton
      className="add-wallet-button"
      variant="contained"
      onClick={onOpen}
    >
      <img src={walletIcon} alt="wallet icon" />
      Add Wallet
    </DefaultButton>
  );
};

export default AddWalletButton;
