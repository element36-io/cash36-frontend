import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import WalletType from '../WalletType';
import AddMmWallet from '../AddMmWallet';
import AddUportWallet from '../AddUportWallet';
import { addWallet } from '../../store/wallets/wallets.actions';
import { WalletContext } from '../../providers/wallet.provider';

const NewWallet = ({ addWallet, walletList }) => {
  const [step, setStep] = useState(0);
  const { isUportWallet, onCloseDialogs } = useContext(WalletContext);

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
  }, []);

  return (
    <div className="new-wallet dialog-content">
      <CloseIcon
        className="dialog-close"
        onClick={onCloseDialogs}
        data-testid="add-wallet-dialog__close"
      />
      {renderStep()}
    </div>
  );
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
