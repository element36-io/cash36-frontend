import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import API from '../../config/api';
import { getCurrentProcessStatus } from '../../store/auth/auth.actions';
import Step0ProcessWelcomeScreen from './Step0ProcessWelcomeScreen';
import Step1Tier1Form from './Step1Tier1Form';
import Step1aConfirmTier1 from './Step1aConfirmTier1';
import Step2BeneficialOwner from './Step2BeneficialOwner';

import Step1 from './ProcessWelcomeScreen/Step1Form';

import './Kyc.scss';
import Step3Documents from './Step3Documents';

const Kyc = ({ currentProcessStatus, getCurrentProcessStatus }) => {
  useEffect(() => {
    getCurrentProcessStatus();
  }, [currentProcessStatus]);

  console.log(currentProcessStatus);

  const changeSteps = async (step, payload) => {
    try {
      await API.post(`/cash36/kyc/step-${step}`, payload);

      getCurrentProcessStatus();
    } catch (error) {
      if (error.response.status === 401) {
        console.log('Access unauthorized');
        return;
      }
      console.log(error);
    }
  };

  // const testProcessStatus = 'CONFIRM_TIER_1';

  const renderStep = () => {
    switch (currentProcessStatus) {
      case 'WELCOME_SCREEN':
        return <Step0ProcessWelcomeScreen changeSteps={changeSteps} />;
      case 'USER_DATA':
        return <Step1Tier1Form />;
      case 'CONFIRM_TIER_1':
        return <Step1aConfirmTier1 changeSteps={changeSteps} />;
      case 'BENEFICIAL_OWNER':
        return <Step2BeneficialOwner changeSteps={changeSteps} />;
      case 'UPLOAD_DOCUMENTS':
        return <Step3Documents changeSteps={changeSteps} />;
      default:
        return null;
    }
  };

  return (
    <div className="wrapper paper kyc" data-status={currentProcessStatus}>
      <Step1 />
      {renderStep()}
    </div>
  );
};

const mapStateToProps = state => ({
  currentProcessStatus: state.auth.user.currentProcessStatus
});

Kyc.propTypes = {
  currentProcessStatus: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProcessStatus }
)(Kyc);
