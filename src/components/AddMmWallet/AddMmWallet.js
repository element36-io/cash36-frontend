import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DoneIcon from '@material-ui/icons/Done';
import AddWalletForm from '../AddWalletForm';
import { Web3Context } from '../../providers/web3.provider';
import metamaskLogo from '../../assets/icons/metamask.svg';
import { AddWalletContext } from '../../providers/addWallet.provider';

import './AddMmWallet.scss';

const AddMmWallet = ({ addWallet, walletList }) => {
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [account, setAccount] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const { getNetwork } = useContext(Web3Context);
  const { onClose } = useContext(AddWalletContext);

  const changeDescription = event => setDescription(event.target.value);

  const saveWallet = async evt => {
    evt.preventDefault();
    setSubmitting(true);
    try {
      await addWallet(
        account,
        'METAMASK',
        window.ethereum.networkVersion,
        description
      );
      setSubmitted(true);
    } catch (err) {
      setError(err);
      setSubmitting(false);
    }
  };

  const checkForMetamask = async () => {
    if (!window.ethereum) {
      setCheckCompleted(true);
      setHasMetamask(false);
      return;
    }

    try {
      const accounts = await window.ethereum.enable();
      setCheckCompleted(true);
      setHasMetamask(true);

      setTimeout(() => {
        setAccount(accounts[0]);
      }, 1000);
    } catch (err) {
      setCheckCompleted(true);
      setHasMetamask(false);
    }
  };

  useEffect(() => {
    checkForMetamask();
  }, []);

  const filteredWallet = walletList.filter(
    wallet => wallet.accountAddress === account
  )[0];

  return (
    <div className="add-mm-wallet">
      <img src={metamaskLogo} alt="MetaMask" />
      <p>
        Checking for MetaMask...
        {(checkCompleted && hasMetamask && 'Successful') ||
          (checkCompleted && !hasMetamask && 'Failed')}
      </p>
      {!hasMetamask && checkCompleted && (
        <p>
          We could not find your MetaMask Account, please make sure MetaMask is
          running and you are logged in.
        </p>
      )}
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
        <span className="add-wallet__success" onClick={onClose}>
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
