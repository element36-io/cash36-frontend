import React from 'react';

import QuestionMarkPop from '../../../components/QuestionMarkPop';

import './Message.scss';

const Message = () => {
  return (
    <div className="message">
      <QuestionMarkPop exclamation />
    </div>
  );
};

export default Message;
