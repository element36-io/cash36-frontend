import React from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DefaultButton from '../DefaultButton';

import './StepButton.scss';

const StepButton = ({ text, onClick }) => (
  <DefaultButton
    variant='raised'
    type='button'
    size='large'
    fullWidth
    className='step-button'
    onClick={onClick}
  >
    <span>{text}</span>
    <ArrowForwardIcon />
  </DefaultButton>
);

StepButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default StepButton;
