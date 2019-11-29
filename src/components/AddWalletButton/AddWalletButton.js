import React, { useContext } from 'react';
import DefaultButton from '../Buttons/DefaultButton';
import walletIcon from '../../assets/icons/wallet-plus-outline.svg';
import { WalletContext } from '../../providers/wallet.provider';

import './AddWalletButton.scss';

const AddWalletButton = () => {
  const { onOpenAdd } = useContext(WalletContext);

  return (
    <DefaultButton
      className="add-wallet-button"
      variant="contained"
      onClick={onOpenAdd}
    >
      <img src={walletIcon} alt="wallet icon" />
      Add Wallet
    </DefaultButton>
  );
};

export default AddWalletButton;
