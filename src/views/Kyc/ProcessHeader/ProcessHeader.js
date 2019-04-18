import React from 'react';
import PropTypes from 'prop-types';
import './ProcessHeader.scss';

const ProcessHeader = props => {
  const { title, subtitle } = props;
  return (
    <div className="process-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

ProcessHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default ProcessHeader;
