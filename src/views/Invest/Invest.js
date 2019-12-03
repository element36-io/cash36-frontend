import React, { useState, useEffect } from 'react';

import DialogButton from '../../components/DialogButton';
import AddButton from '../../components/Buttons/AddButton';
import ContractForm from './ContractForm';
import InvestCard from './InvestCard';
import useGet from '../../hooks/useGet';
import {
  getUserContracts,
  getPublicContracts
} from '../../helpers/async/contracts.helpers';

import './Invest.scss';

const Invest = () => {
  const [visibleContracts, setVisibleContracts] = useState([]);

  const [userContracts, userContractsError, refetchUserContracts] = useGet(
    getUserContracts,
    []
  );

  const [
    publicContracts,
    publicContractsError,
    refetchPublicContracts
  ] = useGet(getPublicContracts, []);

  useEffect(() => {
    setVisibleContracts(publicContracts);
  }, [userContracts, publicContracts]);

  return (
    <div className="wrapper invest">
      <DialogButton button={<AddButton text="Add Contract" />}>
        <ContractForm
          refetchUserContracts={refetchUserContracts}
          refetchPublicContracts={refetchPublicContracts}
        />
      </DialogButton>
      <div className="invest__cards">
        {visibleContracts.map(visibleContract => {
          const isOwnedByUser = !!userContracts.find(userContract => {
            return (
              userContract.contractAddress === visibleContract.contractAddress
            );
          });

          if (isOwnedByUser) {
            return (
              <InvestCard
                key={visibleContract.contractAddress}
                {...visibleContract}
                isOwnedByUser
                refetchUserContracts={refetchUserContracts}
                refetchPublicContracts={refetchPublicContracts}
              />
            );
          }

          return (
            <InvestCard
              key={visibleContract.contractAddress}
              {...visibleContract}
            />
          );
        })}
      </div>
      {publicContractsError && (
        <div className="error-text">{publicContractsError}</div>
      )}
      {userContractsError && (
        <div className="error-text">{userContractsError}</div>
      )}
    </div>
  );
};

export default Invest;
