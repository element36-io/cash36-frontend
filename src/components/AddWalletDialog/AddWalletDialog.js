import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog } from '@material-ui/core';

import Responsive from '../../components/Responsive';
import DefaultButton from '../Buttons/DefaultButton';
import NewWallet from '../NewWallet';
import walletIcon from '../../assets/icons/wallet-plus-outline.svg';

import './AddWalletDialog.scss';

const AddWalletDialog = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <div className="add-wallet-dialog">
      <DefaultButton
        className="add-wallet-dialog__button"
        variant="contained"
        onClick={onOpen}
      >
        <img src={walletIcon} alt="wallet icon" />
        Add Wallet
      </DefaultButton>
      <Responsive isMobile>
        <div className={`add-wallet-dialog__content ${open ? '--open' : ''}`}>
          <CloseIcon
            className="add-wallet-dialog__close"
            onClick={onClose}
            data-testid="add-wallet-dialog__close"
          />
          <NewWallet />
        </div>
      </Responsive>
      <Responsive>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth={false}
          className="add-wallet-dialog__content"
        >
          <CloseIcon
            className="add-wallet-dialog__close"
            onClick={onClose}
            data-testid="add-wallet-dialog__close"
          />
          <NewWallet />
        </Dialog>
      </Responsive>
    </div>
  );
};

export default AddWalletDialog;
