import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Web3Context } from '../../../providers/web3.provider';
import { getMainWalletAddress } from '../../../helpers/wallet.helpers';
import { parseAmount } from '../../../helpers/currencies.helpers';
import TokenIcon from '../../../components/TokenIcon';
import {
  Cash36ComplianceContract,
  Token36Contract
} from '@element36-io/cash36-contracts';
import { getMinFunds } from '../../../store/wallets/wallets.actions';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import BackButton from '../../../components/Buttons/BackButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import CheckItem from '../../../components/CheckItem';
import useCash36 from '../../../hooks/useCash36';
import { truncateBlockchainAddress } from '../../../helpers/string.helpers';

import './TokensTransferOption.scss';

const TokensTransferOption = ({
  amount,
  targetAddress,
  symbol,
  tokens,
  walletList,
  setStep
}) => {
  const web3 = useCash36();
  const { networkId } = useContext(Web3Context);

  const complianceContract = new web3.eth.Contract(
    Cash36ComplianceContract.abi,
    Cash36ComplianceContract.networks[networkId].address
  );

  const [checkingSender, setCheckingSender] = useState(false);
  const [senderChecks, setSenderChecks] = useState({});

  const senderAddress = getMainWalletAddress(walletList);
  const senderBalance = tokens.find(token => token.symbol === symbol).balance;

  const verifySender = async userAddress => {
    setCheckingSender(true);

    // Blockchain code for checking
    const checkUser = await complianceContract.methods
      .checkUser(userAddress)
      .call();

    const attrSend = web3.utils.fromAscii('ATTR_SEND');

    const canSend = await complianceContract.methods
      .hasAttribute(userAddress, attrSend)
      .call();

    const hasFunds = senderBalance >= parseInt(amount, 10);

    const etherBalance = await web3.eth.getBalance(userAddress);
    const weiBalance = await web3.utils.fromWei(etherBalance, 'wei');

    const minFunds = (await getMinFunds()).balanceWei || 1000000000000000000;

    const hasEther = weiBalance > minFunds;

    setSenderChecks({ checkUser, canSend, hasFunds, hasEther });

    setCheckingSender(false);
  };

  const transferTokens = async () => {
    const { tokenAddress } = tokens.find(token => token.symbol === symbol);
    const tokenContract = new web3.eth.Contract(
      Token36Contract.abi,
      tokenAddress
    );

    // 1. Call .transfer on the Token Contract (address, amount * 18 zeros or toWei)
    const sendAmount = web3.utils.toWei(parseAmount(amount));

    try {
      await tokenContract.methods
        .transfer(targetAddress, sendAmount)
        .send({ from: senderAddress });

      setStep(5);
    } catch (err) {
      setStep(6);
    }
  };

  useEffect(() => {
    verifySender(senderAddress);
  }, []);

  return (
    <div>
      <div className="tokens-transfer-option">
        <BackButton onClick={() => setStep(2)} />
        <h2>Initiate Tokens Transfer</h2>
        <div className="tokens-transfer-option__kyc-verifications">
          <div className="tokens-transfer-option__kyc-verification">
            <h4>{checkingSender ? 'Verifying KYC for Sender...' : 'Sender'}</h4>
            {checkingSender ? (
              <CircularProgress color="primary" size={15} />
            ) : (
              <div>
                <CheckItem text="KYC" checked={senderChecks.checkUser} />
                <CheckItem
                  text="User can send"
                  checked={senderChecks.canSend}
                />
                <CheckItem
                  text="Has enough funds"
                  checked={senderChecks.hasFunds}
                />
                <CheckItem text="Has ether" checked={senderChecks.hasEther} />
              </div>
            )}
          </div>
          <div className="tokens-transfer-option__mid-section">
            <div>&rarr;</div>
            <div>
              <div>{amount}</div>
              <TokenIcon symbol={symbol} />
            </div>
          </div>
          <div className="tokens-transfer-option__kyc-verification">
            <h4>Receiver</h4>
            <div className="tokens-transfer-option__smart-contract">
              {truncateBlockchainAddress(targetAddress)}
            </div>
          </div>
        </div>

        {!checkingSender && (
          <div className="tokens-transfer-option__buttons">
            <DefaultButton onClick={transferTokens}>
              Execute Order
            </DefaultButton>
            <Link to="/">
              <SecondaryButton>Cancel</SecondaryButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

TokensTransferOption.propTypes = {
  amount: PropTypes.string,
  symbol: PropTypes.string,
  targetAddress: PropTypes.string,
  tokens: PropTypes.array,
  walletList: PropTypes.array,
  setStep: PropTypes.func,
  setTransactionError: PropTypes.func,
  setTransferData: PropTypes.func
};

const mapStateToProps = state => ({
  walletList: state.wallets.walletList,
  tokens: state.tokens.tokens
});

export default connect(mapStateToProps)(TokensTransferOption);
