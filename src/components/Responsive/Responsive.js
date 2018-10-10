import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

const Responsive = props => {
  const { isMobile, children } = props;
  const breakpoint = isMobile ? '(max-width: 767px)' : '(min-width: 768px)';

  return (
    <MediaQuery query={breakpoint}>
      {children}
    </MediaQuery>
  );
};

Responsive.propTypes = {
  isMobile: PropTypes.bool
};

export default Responsive;
