import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  startKycProcess,
  getCurrentKycStep,
  updateKycStep
} from '../../store/auth/auth.actions';
import { CircularProgress } from '@material-ui/core';

import Step0ProcessWelcomeScreen from './Step0ProcessWelcomeScreen';
import Step1Tier1Form from './Step1Tier1Form';
import Step1aConfirmTier1 from './Step1aConfirmTier1';
import Step2BeneficialOwner from './Step2BeneficialOwner';
import Step3Documents from './Step3Documents';
import Step4UserProfile from './Step4UserProfile';
import Step5AwaitingVerification from './Step5AwaitingVerification';

import './Kyc.scss';

const Kyc = ({
  currentKycStep,
  getCurrentKycStep,
  updateKycStep,
  startKycProcess,
  avatarUri,
  username
}) => {
  const kycWrapper = useRef();
  const [processError, setProcessError] = useState('');
  const [stepError, setStepError] = useState('');

  useEffect(() => {
    getCurrentStep();
    if (kycWrapper.current) {
      kycWrapper.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentKycStep]);
  const getCurrentStep = async () => {
    try {
      await getCurrentKycStep();
    } catch (error) {
      setProcessError(error);
    }
  };

  const changeSteps = async (step, payload, params) => {
    try {
      await updateKycStep(step, payload, params);
    } catch (error) {
      setStepError(error);
      return Promise.reject(error);
    }
  };

  const renderStep = () => {
    switch (currentKycStep) {
      case 'REGISTERED':
        return <Step0ProcessWelcomeScreen startKycProcess={startKycProcess} />;
      case 'USER_DATA':
        return (
          <Step1Tier1Form
            changeSteps={changeSteps}
            avatarUri={avatarUri}
            username={username}
            stepError={stepError}
          />
        );
      case 'CONFIRM_TIER_1':
        return (
          <Step1aConfirmTier1 changeSteps={changeSteps} stepError={stepError} />
        );
      case 'BENEFICIAL_OWNER':
        return (
          <Step2BeneficialOwner
            changeSteps={changeSteps}
            stepError={stepError}
          />
        );
      case 'UPLOAD_DOCUMENTS':
        return (
          <Step3Documents changeSteps={changeSteps} stepError={stepError} />
        );
      case 'USER_PROFILE':
        return (
          <Step4UserProfile changeSteps={changeSteps} stepError={stepError} />
        );
      case 'AWAITING_VERIFICATION':
        return <Step5AwaitingVerification />;
      default:
        return (
          <div className="kyc__empty-container">
            <CircularProgress size={20} />
          </div>
        );
    }
  };

  if (processError) {
    return (
      <div
        className="wrapper paper kyc kyc__empty-container"
        data-status="REGISTERED"
      >
        <div className="error-text">{processError}</div>
      </div>
    );
  }

  return (
    <div
      className="wrapper paper kyc"
      data-status={currentKycStep}
      ref={kycWrapper}
    >
      {renderStep()}
    </div>
  );
};

const mapStateToProps = state => ({
  currentKycStep: state.auth.kyc.currentStep,
  avatarUri: state.auth.user.avatarUri,
  username: state.auth.user.username
});

Kyc.propTypes = {
  currentKycStep: PropTypes.string,
  avatarUri: PropTypes.string,
  username: PropTypes.string
};

export default connect(
  mapStateToProps,
  { getCurrentKycStep, updateKycStep, startKycProcess }
)(Kyc);
