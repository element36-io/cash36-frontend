import PropTypes from 'prop-types';
import React from 'react';

import './QuestionMarkPop.scss';

const QuestionMarkPop = ({ children }) => {
  return (
    <div className="question-mark">
      <div className="question-mark__icon">?</div>
      <div className="question-mark__content">{children}</div>
    </div>
  );
};

QuestionMarkPop.propTypes = {
  children: PropTypes.any.isRequired
};

export default QuestionMarkPop;
