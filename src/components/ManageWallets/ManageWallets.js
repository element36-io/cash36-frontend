import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { Dialog, MenuItem } from '@material-ui/core';

import Wallet from './Wallet';
import AddWalletDialog from '../AddWalletDialog';

import './ManageWallets.scss';

const ManageWallets = ({ walletList }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <Fragment>
      <MenuItem onClick={onOpen}>
        <WalletIcon />
        <span>Manage Wallets</span>
      </MenuItem>

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        className="manage-wallets-wrapper"
      >
        <div className="manage-wallets__content">
          <div className="manage-wallets__header">
            <h3>Manage Wallets</h3>
            <CloseIcon
              className="manage-wallet__close"
              onClick={onClose}
              data-testid="manage-wallet__close"
            />
          </div>

          <div>
            {walletList.length
              ? walletList.map(wallet => (
                <Wallet key={wallet.accountAddress} wallet={wallet} />
              ))
              : 'You have no wallets registered. You can register one by clicking below.'}
          </div>
          <AddWalletDialog />
        </div>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    walletList: state.wallets.walletList
  };
};

ManageWallets.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(ManageWallets);
