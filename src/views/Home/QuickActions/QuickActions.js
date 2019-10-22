import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

import buttons from './buttons';

import './QuickActions.scss';

const QuickActions = ({ noWallet = true }) => {
  return (
    <div className="quick-actions">
      <div>Quick Actions</div>
      <div className={`${noWallet ? 'no-wallet' : ''}`}>
        {buttons.map(({ link, Icon, label }) =>
          noWallet && label === 'Sell' ? (
            <Tooltip
              key={label}
              title="You need to add a Wallet to be able to sell Tokens"
            >
              <div className="quick-actions__button quick-actions__button--inactive">
                <div>
                  <Icon />
                </div>
                <div>{label}</div>
              </div>
            </Tooltip>
          ) : (
            <Link
              key={label}
              to={link}
              className="quick-actions__button quick-actions__button--active"
            >
              <div>
                <Icon />
              </div>
              <div>{label}</div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

QuickActions.propTypes = {
  noWallet: PropTypes.bool
};

export default QuickActions;
