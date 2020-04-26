import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';

import AddWalletForm from '../AddWalletForm';
import { Web3Context } from '../../providers/web3.provider';
import metamaskLogo from '../../assets/icons/metamask.svg';
import MmCheck from '../MmCheck';
import { WalletContext, walletTypes } from '../../providers/wallet.provider';
import SecondaryButton from '../Buttons/SecondaryButton';
import { addTokensToMetamask } from '../../helpers/metamask.helpers';
import { generateWalletName } from '../../helpers/wallet.helpers';

import './AddMmWallet.scss';

const AddMmWallet = ({ addWallet, walletList, tokens }) => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const { getNetwork } = useContext(Web3Context);
  const { onCloseDialogs } = useContext(WalletContext);

  const [description, setDescription] = useState(
    generateWalletName(walletList.length)
  );

  const changeDescription = event => setDescription(event.target.value);

  const saveWallet = async evt => {
    evt.preventDefault();
    setSubmitting(true);
    try {
      await addTokensToMetamask(tokens);

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

  let network;
  if (window.ethereum) {
    network = getNetwork(window.ethereum.networkVersion);
  }

  return (
    <div className="add-mm-wallet">
      <img src={metamaskLogo} alt="MetaMask" />
      <MmCheck onSuccess={setAccount} />
      {account && (
        <>
          <p>Wallet address: {account}</p>
          <p>
            Network:{' '}
            {network !== 'unknown' ? network : window.ethereum.networkVersion}
          </p>
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
        <div className="add-mm-wallet__submitted">
          <div>
            <DoneIcon className="icon-success" />
            Your wallet will be verified and added to the blockchain in the background. It will take 10 minutes, sometimes a couple of hours to get processed. You will be notified when ready; please be patient. 
          </div>
          <SecondaryButton onClick={onCloseDialogs}>Close</SecondaryButton>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ tokens }) => ({ tokens: tokens.tokens });

AddMmWallet.propTypes = {
  addWallet: PropTypes.func,
  walletList: PropTypes.array,
  tokens: PropTypes.array
};

export default connect(mapStateToProps)(AddMmWallet);
