import PropTypes from 'prop-types';
import React from 'react';

import './QuestionMarkPop.scss';

const QuestionMarkPop = ({ children, exclamation = false }) => {
  return (
    <div className="question-mark">
      <div className="question-mark__icon">{exclamation ? '!' : '?'}</div>
      <div className="question-mark__content">{children}</div>
    </div>
  );
};

QuestionMarkPop.propTypes = {
  children: PropTypes.any.isRequired,
  exclamation: PropTypes.bool
};

export default QuestionMarkPop;
