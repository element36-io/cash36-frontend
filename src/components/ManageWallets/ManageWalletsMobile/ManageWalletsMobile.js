import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import CloseIcon from '@material-ui/icons/Close';

import Wallet from '../Wallet';
import AddWalletButton from '../../AddWalletButton';

const ManageWalletsMobile = ({ walletList }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <Fragment>
      <li onClick={onOpen}>
        <span>
          Manage Wallets
          <RightArrowIcon className="header__mobile-dropdown__icon" />
        </span>
      </li>
      <div className={`manage-wallets-wrapper ${open ? '--open' : ''}`}>
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
          <AddWalletButton />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    walletList: state.wallets.walletList
  };
};

ManageWalletsMobile.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(ManageWalletsMobile);
