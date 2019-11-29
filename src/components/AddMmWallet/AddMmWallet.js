import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DoneIcon from '@material-ui/icons/Done';
import AddWalletForm from '../AddWalletForm';
import { Web3Context } from '../../providers/web3.provider';
import metamaskLogo from '../../assets/icons/metamask.svg';
import MmCheck from '../MmCheck';
import { WalletContext, walletTypes } from '../../providers/wallet.provider';

import './AddMmWallet.scss';

const AddMmWallet = ({ addWallet, walletList }) => {
  const [account, setAccount] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const { getNetwork } = useContext(Web3Context);
  const { onCloseDialogs } = useContext(WalletContext);

  const changeDescription = event => setDescription(event.target.value);

  const saveWallet = async evt => {
    evt.preventDefault();
    setSubmitting(true);
    try {
      await addWallet(
        account,
        walletTypes.metamask,
        window.ethereum.networkVersion,
        description
      );
      setSubmitted(true);
    } catch (err) {
      setError(err);
      setSubmitting(false);
    }
  };

  const filteredWallet = walletList.filter(
    wallet => wallet.accountAddress === account
  )[0];

  return (
    <div className="add-mm-wallet">
      <img src={metamaskLogo} alt="MetaMask" />
      <MmCheck onSuccess={setAccount} />
      {account && (
        <>
          <p>Wallet address: {account}</p>
          <p>Network: {getNetwork(window.ethereum.networkVersion)}</p>
          {filteredWallet && !submitted && (
            <p>Wallet already registered with user</p>
          )}
          {!submitted && !filteredWallet && (
            <AddWalletForm
              onChange={changeDescription}
              value={description}
              error={error}
              onSubmit={saveWallet}
              submitting={submitting}
            />
          )}
        </>
      )}
      {submitted && (
        <span className="icon-success" onClick={onCloseDialogs}>
          <DoneIcon />
        </span>
      )}
    </div>
  );
};

AddMmWallet.propTypes = {
  addWallet: PropTypes.func,
  walletList: PropTypes.array
};

export default AddMmWallet;
