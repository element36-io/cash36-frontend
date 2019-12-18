import React, { useState, useEffect } from 'react';

import ButtonDialog from '../../components/ButtonDialog';
import AddButton from '../../components/Buttons/AddButton';
import ContractForm from './ContractForm';
import InvestCard from './InvestCard';
import useGet from '../../hooks/useGet';
import { getContracts } from '../../helpers/async/contracts.helpers';

import './Invest.scss';

const Invest = () => {
  const [visibleContracts, setVisibleContracts] = useState([]);

  const [contracts, contractsError, refetchContracts] = useGet(
    getContracts,
    []
  );

  useEffect(() => {
    setVisibleContracts(contracts);
  }, [contracts]);

  return (
    <div className="wrapper invest">
      <div className="invest__header">
        <ButtonDialog button={<AddButton text="Add Contract" />}>
          <ContractForm refetchContracts={refetchContracts} />
        </ButtonDialog>
      </div>

      <div className="invest__cards">
        {visibleContracts.map(visibleContract => {
          return (
            <InvestCard
              refetchContracts={refetchContracts}
              key={visibleContract.contractAddress}
              {...visibleContract}
              isOwnedByUser={visibleContract.isOwnedByUser}
            />
          );
        })}
      </div>
      {contractsError && <div className="error-text">{contractsError}</div>}
    </div>
  );
};

export default Invest;
