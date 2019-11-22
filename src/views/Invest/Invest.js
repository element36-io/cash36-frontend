import React from 'react';
import AddButton from '../../components/Buttons/AddButton';
import ContractForm from './ContractForm';

import './Invest.scss';

const Invest = () => {
  return (
    <div className="wrapper invest">
      <AddButton
        text="Add Contract"
        clickHandler={() => {
          console.log('Clcked');
        }}
      />
      <ContractForm />
    </div>
  );
};

export default Invest;
