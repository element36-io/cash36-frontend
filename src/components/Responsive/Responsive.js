import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

const Responsive = ({ isMobile, isTablet, isDesktop, children }) => {
  const renderQuery = () => {
    if (isMobile) return '(max-width: 767px)';
    if (isTablet) return '(max-width: 967px)';
    if (isDesktop) return '(min-width: 968px)';
    else return '(min-width: 768px)';
  };

  return <MediaQuery query={renderQuery()}>{children}</MediaQuery>;
};

Responsive.propTypes = {
  isMobile: PropTypes.bool,
  isTablet: PropTypes.bool,
  isDesktop: PropTypes.bool
};

export default Responsive;
