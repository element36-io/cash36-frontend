import PropTypes from 'prop-types';
import React from 'react';

import './QuestionMarkPop.scss';

const QuestionMarkPop = ({
  children,
  importedIcon = false,
  exclamation = false
}) => {
  return (
    <div className="question-mark">
      {importedIcon ? (
        <div className="imported-icon">{importedIcon}</div>
      ) : (
        <div className="question-mark__icon">{exclamation ? '!' : '?'}</div>
      )}
      <div className="question-mark__content">{children}</div>
    </div>
  );
};

QuestionMarkPop.propTypes = {
  children: PropTypes.any.isRequired,
  exclamation: PropTypes.bool,
  importedIcon: PropTypes.any
};

export default QuestionMarkPop;
