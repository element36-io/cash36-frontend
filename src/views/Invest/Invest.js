import React from 'react';

import DialogButton from '../../components/DialogButton';
import AddButton from '../../components/Buttons/AddButton';
import ContractForm from './ContractForm';
import InvestCard from './InvestCard';
import useGet from '../../hooks/useGet';
import { getAllContracts } from '../../helpers/async/contracts.helpers';

import './Invest.scss';

const Invest = () => {
  const [visibleContracts, error] = useGet(getAllContracts, []);

  return (
    <div className="wrapper invest">
      <DialogButton button={<AddButton text="Add Contract" />}>
        <ContractForm />
      </DialogButton>
      <div className="invest__cards">
        {visibleContracts.map(contract => {
          return <InvestCard key={contract.contractAddress} {...contract} />;
        })}
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Invest;
