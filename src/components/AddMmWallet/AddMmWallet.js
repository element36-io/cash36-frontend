import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import metamaskLogo from '../../assets/icons/metamask.svg';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import DefaultButton from '../Buttons/DefaultButton';
import './AddMmWallet.scss';

const networkUrls = {
  1: 'Mainnet',
  2: 'Morden',
  3: 'Ropsten',
  4: 'Rinkeby',
  85588558: 'Local'
};

const AddMmWallet = ({ addWallet, walletList }) => {
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [account, setAccount] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  // const filteredWallet = walletList.filter(
  //   wallet => wallet.accountAddress === account
  // )[0];

  // console.warn(filteredWallet);

  const changeDescription = event => setDescription(event.target.value);

  const saveWallet = async () => {
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

  return (
    <div className="add-mm-wallet">
      <img src={metamaskLogo} alt="MetaMask logo" />
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
          <p>Network: {networkUrls[window.ethereum.networkVersion]}</p>
          {!submitted && (
            <>
              <TextField
                label="Wallet Name"
                onChange={changeDescription}
                value={description}
                fullWidth
              />
              {!submitted && error && <p className="error-text">{error}</p>}
              <DefaultButton
                onClick={saveWallet}
                disabled={submitting || !description.length}
              >
                Add Wallet
              </DefaultButton>
            </>
          )}
        </>
      )}
      {submitted && (
        <span className="add-mm-wallet__success">
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
