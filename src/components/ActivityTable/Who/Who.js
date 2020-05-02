import PropTypes from 'prop-types';
import React from 'react';
import QuestionMarkPop from '../../../components/QuestionMarkPop';

import './Who.scss';

const Who = ({ initiatorUserId }) => {
  return (
    <div className="who">
      <QuestionMarkPop importedIcon={<i className="fa fa-user" />}>
        <div className="who__content">{initiatorUserId}</div>
      </QuestionMarkPop>
    </div>
  );
};

Who.propTypes = {
  initiatorUserId: PropTypes.string
};

export default Who;
