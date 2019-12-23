import React, { useContext } from 'react';
import WalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

import SecondaryButton from '../Buttons/SecondaryButton';
import { WalletContext } from '../../providers/wallet.provider';

import './AddWalletButton.scss';

const AddWalletButton = () => {
  const { onOpenAdd } = useContext(WalletContext);

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

export default AddWalletButton;
