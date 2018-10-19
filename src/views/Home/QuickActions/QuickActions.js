import React from 'react';
import { Link } from 'react-router-dom';
import buttons from './buttons';

import './QuickActions.scss';

const QuickActions = () => {
  return (
    <div className='quick-actions'>
      <div>Quick Actions</div>
      <div>
        {buttons.map(({ link, Icon, label }) => (
          <Link key={label} to={link} className='quick-actions__button'>
            <div>
              <Icon />
            </div>
            <div>
              {label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
