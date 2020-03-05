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
import BackButton from '../../../components/Buttons/BackButton';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import CheckItem from '../../../components/CheckItem';
import useCash36 from '../../../hooks/useCash36';

import './InitiateTokensTransfer.scss';

const InitiateTokensTransfer = ({
  amount,
  targetAddress,
  symbol = 'EUR36',
  tokens,
  walletList,
  setStep,
  setTransactionError,
  setTransferData
}) => {
  const web3 = useCash36();
  const { networkId } = useContext(Web3Context);

  const complianceContract = new web3.eth.Contract(
    Cash36ComplianceContract.abi,
    Cash36ComplianceContract.networks[networkId].address
  );

  const [checkingSender, setCheckingSender] = useState(false);
  const [checkingReceiver, setCheckingReceiver] = useState(false);
  const [senderChecks, setSenderChecks] = useState({});
  const [receiverChecks, setReceiverChecks] = useState({});

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

  const verifyReceiver = async targetAddress => {
    setCheckingReceiver(true);

    const checkUser = await complianceContract.methods
      .checkUser(targetAddress)
      .call();

    const attrBuy = web3.utils.fromAscii('ATTR_BUY');
    const attrReceive = web3.utils.fromAscii('ATTR_RECEIVE');

    const canBuy = await complianceContract.methods
      .hasAttribute(targetAddress, attrBuy)
      .call();

    const canReceive = await complianceContract.methods
      .hasAttribute(targetAddress, attrReceive)
      .call();

    setReceiverChecks({ checkUser, canBuy, canReceive });

    setCheckingReceiver(false);
  };

  const transferTokens = async () => {
    const { tokenAddress } = tokens.find(token => token.symbol === symbol);
    const tokenContract = new web3.eth.Contract(
      Token36Contract.abi,
      tokenAddress
    );

    // 1. Call .transfer on the Token Contract (address, amount * 18 zeros or toWei)
    const sendAmount = web3.utils.toWei(parseAmount(amount));

    console.log(senderAddress);

    try {
      await tokenContract.methods
        .transfer(targetAddress, sendAmount)
        .send({ from: senderAddress });

      setTransferData({ amount, symbol });
      setStep(6);
    } catch (err) {
      setTransactionError({
        title: 'Transfer unsuccessful',
        message: 'An error occured during the transfer of tokens'
      });
      setStep(5);
    }
  };

  useEffect(() => {
    verifySender(senderAddress);
    verifyReceiver(targetAddress);
  }, []);

  return (
    <div>
      <div className="initiate-tokens-transfer">
        <BackButton onClick={() => setStep(3)} />
        <h2>Initiate Tokens Transfer</h2>
        <div className="initiate-tokens-transfer__kyc-verifications">
          <div className="initiate-tokens-transfer__kyc-verification">
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
          <div className="initiate-tokens-transfer__mid-section">
            <div>&rarr;</div>
            <div>
              <div>{amount}</div>
              <TokenIcon symbol={symbol} />
            </div>
          </div>
          <div className="initiate-tokens-transfer__kyc-verification">
            <h4>
              {checkingReceiver ? 'Verifying KYC for Receiver...' : 'Receiver'}
            </h4>
            {checkingReceiver ? (
              <CircularProgress color="primary" size={15} />
            ) : (
              <div>
                <CheckItem text="KYC" checked={receiverChecks.checkUser} />
                <CheckItem text="Can buy" checked={receiverChecks.canBuy} />
                <CheckItem
                  text="Can receive"
                  checked={receiverChecks.canReceive}
                />
              </div>
            )}
          </div>
        </div>

        {(!checkingSender || !checkingReceiver) && (
          <div className="initiate-tokens-transfer__buttons">
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

InitiateTokensTransfer.propTypes = {
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

export default connect(mapStateToProps)(InitiateTokensTransfer);
