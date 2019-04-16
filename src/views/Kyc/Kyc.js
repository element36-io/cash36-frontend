import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserInfo } from '../../store/auth/auth.actions';
import ProcessWelcomeScreen from './ProcessWelcomeScreen';

import './Kyc.scss';

const Kyc = ({ currentProcessStatus, getUserInfo }) => {
  useEffect(() => {
    getUserInfo();
  }, []);
  const renderStep = () => {
    if (currentProcessStatus === 'REGISTERED') return <ProcessWelcomeScreen />;

    return null;
  };
  return (
    <div className="wrapper paper kyc" data-status={currentProcessStatus}>
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
  { getUserInfo }
)(Kyc);
