import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import AddWalletForm from '../AddWalletForm';
import UportLogin from '../UportLogin';
import { Web3Context } from '../../providers/web3.provider';
import uportLogo from '../../assets/icons/uport_logo.svg';
import { WalletContext, walletTypes } from '../../providers/wallet.provider';
import { verifyResponse } from '../../helpers/uport.helpers';

import './AddUportWallet.scss';

const AddUportWallet = ({ addWallet, walletList }) => {
  const [creds, setCreds] = useState(null);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const location = useLocation();
  const { network, networkId } = useContext(Web3Context);
  const {
    isUportWallet,
    onCloseDialogs,
    mainWallet,
    setLoggedInWallet
  } = useContext(WalletContext);

  const changeDescription = event => setDescription(event.target.value);

  const fetchMobileCreds = async () => {
    try {
      if (location.hash.includes('access_token')) {
        const response = await verifyResponse(location.hash.split('=')[1]);
        setCreds(response.data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const saveWallet = async evt => {
    evt.preventDefault();
    setSubmitting(true);
    try {
      await addWallet(
        creds.address,
        walletTypes.uport,
        networkId,
        description,
        creds.username
      );
      setSubmitted(true);
    } catch (err) {
      setError(err);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isUportWallet) {
      fetchMobileCreds();
    }
  }, []);

  useEffect(() => {
    if (mainWallet && creds && mainWallet.accountAddress === creds.address) {
      const { pushToken, boxPub } = creds;
      setLoggedInWallet({ ...mainWallet, pushToken, boxPub });
    }
  }, [mainWallet, creds]);

  const filteredWallet = walletList.filter(wallet =>
    creds ? wallet.accountAddress === creds.address : null
  )[0];

  return (
    <div className="add-uport-wallet">
      <img src={uportLogo} alt="uPort" className={creds ? 'align-left' : ''} />

      {creds && (
        <div className="add-uport-wallet__creds">
          <p>
            Address: <span>{creds.address}</span>
          </p>
          <p>Network: {network}</p>
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
          {submitted && (
            <span className="icon-success" onClick={onCloseDialogs}>
              <DoneIcon />
            </span>
          )}
        </div>
      )}
      {!isUportWallet && !creds && (
        <UportLogin onSuccess={setCreds} onError={setError} type="wallet" />
      )}
    </div>
  );
};

AddUportWallet.propTypes = {
  addWallet: PropTypes.func,
  walletList: PropTypes.array
};

export default AddUportWallet;
