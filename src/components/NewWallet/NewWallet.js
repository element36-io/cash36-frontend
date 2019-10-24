import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletType from '../WalletType';
import AddMmWallet from '../AddMmWallet';
import { addWallet } from '../../store/wallets/wallets.actions';
import './NewWallet.scss';

const NewWallet = ({ addWallet, walletList }) => {
  const [step, setStep] = useState(0);

  const renderStep = () => {
    switch (step) {
      case 1:
        return 'uPort wallet';
      case 2:
        return <AddMmWallet addWallet={addWallet} walletList={walletList} />;
      default:
        return <WalletType onClick={setStep} />;
    }
  };

  return <div className="new-wallet">{renderStep()}</div>;
};

NewWallet.propTypes = {
  addWallet: PropTypes.func,
  walletList: PropTypes.array
};

const mapStateToProps = ({ wallets: { walletList } }) => ({ walletList });

export default connect(
  mapStateToProps,
  { addWallet }
)(NewWallet);
