import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/ArrowForward';

import BaseButton from '../BaseButton';

import './AddButton.scss';

const AddButton = ({ text, onClick, send = false }) => (
  <BaseButton className="add-button" onClick={onClick}>
    <span className="add-button__inner">
      <span>{send ? <SendIcon /> : <AddIcon />}</span>
      <span>{text}</span>
    </span>
  </BaseButton>
);

AddButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  send: PropTypes.bool
};

export default AddButton;
