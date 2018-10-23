import React from 'react';
import { Link } from 'react-router-dom';
import DefaultButton from '../Buttons/DefaultButton';
import './TransactionFooter.scss';

const TransactionFooter = () => (
  <div className='transaction-footer'>
    <Link to='/history'>
      <DefaultButton fullWidth>
          Go to account history
      </DefaultButton>
    </Link>
    <Link to='/'>
        Back to homepage
    </Link>
  </div>
);

export default TransactionFooter;
