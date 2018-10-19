import React from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import StyledButton from '../../StyledButton';

import './StepButton.scss';

const StepButton = ({ text, handleClick }) => (
  <StyledButton
    variant='raised'
    color='primary'
    type='button'
    size='large'
    fullWidth
    className='step-button'
    onClick={handleClick}
  >
    <span>{text}</span>
    <ArrowForwardIcon />
  </StyledButton>
);

StepButton.propTypes = {
  buttonText: PropTypes.string,
  handleClick: PropTypes.func.isRequired
};

export default StepButton;
