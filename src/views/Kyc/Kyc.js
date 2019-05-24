import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  startKycProcess,
  getCurrentKycStep,
  updateKycStep
} from '../../store/auth/auth.actions';
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
  useEffect(() => {
    getCurrentKycStep();
  }, [currentKycStep]);

  const changeSteps = async (step, payload) => {
    try {
      await updateKycStep(step, payload);
    } catch (error) {
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
          />
        );
      case 'CONFIRM_TIER_1':
        return <Step1aConfirmTier1 changeSteps={changeSteps} />;
      case 'BENEFICIAL_OWNER':
        return <Step2BeneficialOwner changeSteps={changeSteps} />;
      case 'UPLOAD_DOCUMENTS':
        return <Step3Documents changeSteps={changeSteps} />;
      case 'USER_PROFILE':
        return <Step4UserProfile changeSteps={changeSteps} />;
      case 'AWAITING_VERIFICATION':
        return <Step5AwaitingVerification />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="wrapper paper kyc" data-status={currentKycStep}>
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
