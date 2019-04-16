import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import API from '../../config/api';
import { getCurrentProcessStatus } from '../../store/kyc/kyc.actions';
import Step1ProcessWelcomeScreen from './Step1ProcessWelcomeScreen';
import Step2Tier1Form from './Step2Tier1Form';

import './Kyc.scss';

const Kyc = ({ currentProcessStatus, getCurrentProcessStatus }) => {
  useEffect(() => {
    getCurrentProcessStatus();
  }, [currentProcessStatus]);

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

  const renderStep = () => {
    switch (currentProcessStatus) {
      case 'WELCOME_SCREEN':
        return <Step1ProcessWelcomeScreen changeSteps={changeSteps} />;
      case 'USER_DATA':
        return <Step2Tier1Form />;
      default:
        return null;
    }
  };

  return (
    <div className="wrapper paper kyc" data-status={currentProcessStatus}>
      {renderStep()}
    </div>
  );
};

const mapStateToProps = state => ({
  currentProcessStatus: state.kyc.currentProcessStatus
});

Kyc.propTypes = {
  currentProcessStatus: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProcessStatus }
)(Kyc);
