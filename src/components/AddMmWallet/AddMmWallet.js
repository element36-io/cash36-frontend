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

import './AddMmWallet.scss';

const AddMmWallet = ({ addWallet, walletList, tokens }) => {
  const [account, setAccount] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
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

      await addTokensToMetamask(tokens);
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
        <div className="add-mm-wallet__submitted">
          <div>
            <DoneIcon className="icon-success" />
            Wallet added successfully
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
