import React from 'react';
import PropTypes from 'prop-types';
import ZeroXAddress from '../../ZeroXAddress';
import Responsive from '../../Responsive';

import sourceIcon from '../../../assets/icons/source-icon.svg';
import targetIcon from '../../../assets/icons/target-icon.svg';

import './Action.scss';

const renderActionName = type => {
  if (type === 'BUY') return 'New tokens created';
  if (type === 'SELL') return 'Sold tokens';
  if (type === 'SENT') return 'Tokens sent to';
  if (type === 'RECEIVED') return 'Received tokens';
  if (type === 'APPROVED') return 'Approved token spending';
};

const Action = ({ type, targetAddress, sourceAddress }) => {
  return (
    <div className="activity-table-action">
      <div>{renderActionName(type)}</div>
      {sourceAddress && (
        <span>
          <img src={sourceIcon} alt="" />
          <Responsive isTablet>
            <ZeroXAddress address={sourceAddress} truncated />
          </Responsive>
          <Responsive isDesktop>
            <ZeroXAddress address={sourceAddress} />
          </Responsive>
        </span>
      )}      
      <span>
        <img src={targetIcon} alt="" />
        <Responsive isTablet>
          <ZeroXAddress address={targetAddress} truncated />
        </Responsive>
        <Responsive isDesktop>
          <ZeroXAddress address={targetAddress} />
        </Responsive>
      </span>
    </div>
  );
};

Action.propTypes = {
  type: PropTypes.string.isRequired,
  targetAddress: PropTypes.string.isRequired,
  sourceAddress: PropTypes.any
};

export default Action;
