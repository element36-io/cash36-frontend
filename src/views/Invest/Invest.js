import React, { useState, useEffect } from 'react';

import DialogButton from '../../components/DialogButton';
import AddButton from '../../components/Buttons/AddButton';
import ContractForm from './ContractForm';
import InvestCard from './InvestCard';
import useGet from '../../hooks/useGet';
import {
  getAllContracts,
  getUserContracts,
  getPublicContracts
} from '../../helpers/async/contracts.helpers';

import './Invest.scss';

const Invest = () => {
  const [visibleContracts, setVisibleContracts] = useState([]);

  const [allContracts, allContractsError] = useGet(getAllContracts, []);
  const [userContracts, userContractsError] = useGet(getUserContracts, []);
  const [publicContracts, publicContractsError] = useGet(
    getPublicContracts,
    []
  );

  useEffect(() => {
    setVisibleContracts(publicContracts);
  }, [allContracts, userContracts, publicContracts]);

  return (
    <div className="wrapper invest">
      <DialogButton button={<AddButton text="Add Contract" />}>
        <ContractForm />
      </DialogButton>
      <div className="invest__cards">
        {visibleContracts.map(contract => {
          const isOwnedByUser = !!userContracts.find(userContract => {
            return userContract.contractAddress !== contract.contractAddress;
          });

          if (isOwnedByUser) {
            return (
              <InvestCard
                key={contract.contractAddress}
                {...contract}
                isOwnedByUser
              />
            );
          }

          return <InvestCard key={contract.contractAddress} {...contract} />;
        })}
      </div>
      {allContractsError && (
        <div className="error-text">{allContractsError}</div>
      )}
    </div>
  );
};

export default Invest;
