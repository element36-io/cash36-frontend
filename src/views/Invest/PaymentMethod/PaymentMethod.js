import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Responsive from '../../../components/Responsive';
import BackButton from '../../../components/Buttons/BackButton';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import manualTransferIcon from '../../../assets/Buy/manual-transfer-icon.svg';
import tokenTransferIcon from '../../../assets/Buy/tokens-transfer.svg';
import TransferFooter from '../TransferFooter';

import './PaymentMethod.scss';

const PaymentMethod = ({
  handleTokensTransferClick,
  handleManualBankTransferClick,
  hasWallet,
  setStep
}) => {
  return (
    <div className="invest-payment-method">
      <BackButton onClick={() => setStep(1)} />

      <Responsive isMobile>
        <h2>Payment method</h2>
      </Responsive>
      <Responsive>
        <h2>Select your payment method</h2>
      </Responsive>
      <div className="invest-payment-method__buttons">
        {hasWallet ? (
          <DefaultButton onClick={handleTokensTransferClick}>
            <span className="payment-method__buttons--heading">
              Tokens Transfer
            </span>
            <span className="invest-payment-method__buttons--icon">
              <img src={tokenTransferIcon} alt="" />
            </span>
          </DefaultButton>
        ) : (
          <DefaultButton disabled>
            <span className="payment-method__buttons--heading">
              Tokens Transfer
            </span>
            <span className="invest-payment-method__buttons--icon">
              <img src={tokenTransferIcon} alt="" />
            </span>
          </DefaultButton>
        )}

        <span className="invest-payment-method__separator">Or</span>
        <DefaultButton onClick={handleManualBankTransferClick}>
          <span className="payment-method__buttons--heading">
            Manual Bank Transfer
          </span>
          <span className="invest-payment-method__buttons--icon">
            <img src={manualTransferIcon} alt="" />
          </span>
        </DefaultButton>
      </div>
      <TransferFooter
        textline1="Buying cash36 Tokens is as simple as a bank transfer. First, choose amount and type of Token you wish to buy."
        textline2="After that you will receive the transfer instructions. Once we receive the amount, the tokens will be credited to your account."
      />
    </div>
  );
};

const mapStateToProps = state => ({
  hasWallet: Boolean(state.wallets.walletList.length)
});

PaymentMethod.propTypes = {
  handleTokensTransferClick: PropTypes.func,
  handleManualBankTransferClick: PropTypes.func,
  hasWallet: PropTypes.bool,
  setStep: PropTypes.func
};

export default connect(mapStateToProps)(PaymentMethod);
