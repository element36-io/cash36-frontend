import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip } from '@material-ui/core';

import Responsive from '../../../components/Responsive';
import BackButton from '../../../components/Buttons/BackButton';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import manualTransferIcon from '../../../assets/Buy/manual-transfer-icon.svg';
import tokenTransferIcon from '../../../assets/Buy/tokens-transfer.svg';
import BuyFooter from '../BuyFooter';

import './PaymentMethod.scss';

const PaymentMethod = ({
  handleManualTransferClick,
  handleAutoTransferClick,
  setStep,
  hasWallet
}) => {
  return (
    <div className="payment-method" data-testid="payment-method">
      <BackButton onClick={() => setStep(0)} />
      <Responsive isMobile>
        <h2>Payment method</h2>
      </Responsive>
      <Responsive>
        <h2>Select your payment method</h2>
      </Responsive>
      <div className="payment-method__buttons">
        {hasWallet ? (
          <DefaultButton onClick={handleAutoTransferClick}>
            <span className="payment-method__buttons--heading">
              Tokens Transfer
            </span>
            <span className="payment-method__buttons--icon">
              <img src={tokenTransferIcon} alt="" />
            </span>
          </DefaultButton>
        ) : (
          <Tooltip title="Token transfer not possible - you don't have a registered wallet available. Use manual bank transfer.">
            <div>
              <DefaultButton disabled>
                <span className="payment-method__buttons--heading">
                  Tokens Transfer
                </span>
                <span className="payment-method__buttons--icon">
                  <img src={tokenTransferIcon} alt="" />
                </span>
              </DefaultButton>
            </div>
          </Tooltip>
        )}

        <span className="payment-method__separator">Or</span>
        <DefaultButton onClick={handleManualTransferClick}>
          <span className="payment-method__buttons--heading">
            Manual Bank Transfer
          </span>
          <span className="payment-method__buttons--icon">
            <img src={manualTransferIcon} alt="" />
          </span>
        </DefaultButton>
      </div>
      <BuyFooter
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
  handleManualTransferClick: PropTypes.func,
  handleAutoTransferClick: PropTypes.func,
  setStep: PropTypes.func,
  hasWallet: PropTypes.bool
};

export default connect(mapStateToProps)(PaymentMethod);
