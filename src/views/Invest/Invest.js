import React from 'react';

import DialogButton from '../../components/DialogButton';
import AddButton from '../../components/Buttons/AddButton';
import ContractForm from './ContractForm';
import InvestCard from './InvestCard';

import './Invest.scss';

const Invest = () => {
  return (
    <div className="wrapper invest">
      <DialogButton button={<AddButton text="Add Contract" />}>
        <ContractForm />
      </DialogButton>
      <div className="invest__cards">
        <InvestCard />
      </div>
    </div>
  );
};

export default Invest;
