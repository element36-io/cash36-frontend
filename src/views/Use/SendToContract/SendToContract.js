import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import API from '../../../config/api';
import { getTokens } from '../../../store/tokens/tokens.actions';
import TransferAddress from '../TransferAddress';
import TransferTokens from '../TransferTokens';
import PaymentMethod from '../PaymentMethod';
import TokensTransferOption from '../TokensTransferOption';
import PaymentInfo from '../../../components/PaymentInfo';
import TransferSuccess from '../../Buy/TransferSuccess';
import TransferError from '../../Buy/BuyError';
import TransactionFooter from '../../../components/TransactionFooter';
import useGet from '../../../hooks/useGet';
import { parseAmount } from '../../../helpers/currencies.helpers';

import './SendToContract.scss';

const SendToContract = ({ getTokens }) => {
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [symbol, setSymbol] = useState('EUR36');
  const [transferData, setTransferData] = useState(null);
  const tokensError = useGet(getTokens)[1];

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'amount') {
      setAmount(value);
    } else if (name === 'symbol') {
      setSymbol(value);
    }
  };

  const handleTokensTransferClick = () => {
    setStep(3);
  };
  const handleManualBankTransferClick = async () => {
    const data = {
      amount: parseInt(amount),
      symbol,
      targetAddress: address,
      targetAddressType: 'CONTRACT'
    };

    try {
      const response = await API.post('/exchange/buy/for', data);
      setTransferData(response.data);
      setStep(4);
    } catch (error) {
      setStep(6);
    }
  };

  const steps = [
    <TransferAddress
      key={0}
      setStep={setStep}
      address={address}
      setAddress={setAddress}
    />,
    <TransferTokens
      key={1}
      targetAddress={address}
      setStep={setStep}
      symbol={symbol}
      amount={amount}
      handleChange={handleChange}
    />,
    <PaymentMethod
      key={2}
      handleTokensTransferClick={handleTokensTransferClick}
      handleManualBankTransferClick={handleManualBankTransferClick}
      setStep={setStep}
    />,
    <TokensTransferOption
      key={3}
      symbol={symbol}
      amount={amount}
      targetAddress={address}
      setStep={setStep}
    />,
    <PaymentInfo key={4} info={transferData} title="Trigger your payment">
      <div className="payment-info__message--credit">
        <p>
          Tokens will be credited to target contract as soon as the transfer is
          complete. <br /> You can always check your order status in your
          account history.
        </p>
      </div>
      <TransactionFooter />
    </PaymentInfo>,
    <TransferSuccess key={5} amount={parseAmount(amount)} symbol={symbol} />,
    <TransferError
      key={6}
      title="Transfer unsuccessful"
      message="An error occured during the transfer. Transer was not completed."
    />
  ];

  return (
    <div className="wrapper">
      <div className="send-to-contract paper">
        <div className="send-to-contract__content">
          {tokensError ? <div>There has been an error</div> : steps[step]}
        </div>
      </div>
    </div>
  );
};

SendToContract.propTypes = {
  getTokens: PropTypes.func
};

export default connect(null, { getTokens })(SendToContract);
