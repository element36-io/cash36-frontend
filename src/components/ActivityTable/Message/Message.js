import PropTypes from 'prop-types';
import React from 'react';

import QuestionMarkPop from '../../../components/QuestionMarkPop';

import './Message.scss';

const Message = ({ message }) => {
  return (
    <div className="message">
      <QuestionMarkPop exclamation>{message}</QuestionMarkPop>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string
};

export default Message;
