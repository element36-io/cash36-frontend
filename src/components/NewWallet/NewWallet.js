import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import WalletType from '../WalletType';
import AddMmWallet from '../AddMmWallet';
import AddUportWallet from '../AddUportWallet';
import { addWallet } from '../../store/wallets/wallets.actions';
import { AddWalletContext } from '../../providers/addWallet.provider';
import './NewWallet.scss';

const NewWallet = ({ addWallet, walletList, onClose }) => {
  const [step, setStep] = useState(0);
  const { isUportWallet, setIsUportWallet } = useContext(AddWalletContext);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AddUportWallet addWallet={addWallet} walletList={walletList} />;
      case 2:
        return <AddMmWallet addWallet={addWallet} walletList={walletList} />;
      default:
        return <WalletType onClick={setStep} />;
    }
  };

  useEffect(() => {
    if (isUportWallet) setStep(1);

    return () => {
      if (isUportWallet) setIsUportWallet(false);
    };
  }, []);

  return (
    <div className="new-wallet">
      <CloseIcon
        className="add-wallet-dialog__close"
        onClick={onClose}
        data-testid="add-wallet-dialog__close"
      />
      {renderStep()}
    </div>
  );
};

NewWallet.propTypes = {
  addWallet: PropTypes.func,
  walletList: PropTypes.array,
  onClose: PropTypes.func
};

const mapStateToProps = ({ wallets: { walletList } }) => ({ walletList });

export default connect(
  mapStateToProps,
  { addWallet }
)(NewWallet);
