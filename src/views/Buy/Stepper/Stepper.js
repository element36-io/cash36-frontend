import React from 'react';
import PropTypes from 'prop-types';
import steps from './steps';
import './Stepper.scss';

const renderSteps = (step) => (
  <div className='buy-stepper'>
    <span className={step.spanClass}>&nbsp;</span>
    <div className={step['1'].className}>
      {step['1'].children}
    </div>
    <div className={step['2'].className}>
      {step['2'].children}
    </div>
    <div className={step['3'].className}>
      {step['3'].children}
    </div>
  </div>
);

const Stepper = ({ step }) => {
  switch (step) {
    case 0:
      return renderSteps(steps[0]);
    case 1:
      return renderSteps(steps[1]);
    case 2.1:
      return renderSteps(steps[2]);
    case 2.2:
      return renderSteps(steps[2]);
    default:
      return null;
  }
};

Stepper.propTypes = {
  step: PropTypes.number.isRequired
};

export default Stepper;
