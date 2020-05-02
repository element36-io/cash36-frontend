import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ButtonDialog from '../../components/ButtonDialog';
import AddButton from '../../components/Buttons/AddButton';
import ContractForm from './ContractForm';
import InvestCard from './InvestCard';
import useGet from '../../hooks/useGet';
import { getContracts } from '../../helpers/async/contracts.helpers';
import { getTokens } from '../../store/tokens/tokens.actions';
import { getContractsAction } from '../../store/contracts/contracts.actions';

import './Invest.scss';

const Invest = ({ getContractsAction, getTokens }) => {
  const [visibleContracts, setVisibleContracts] = useState([]);

  const [contracts, contractsError, refetchContracts] = useGet(
    getContracts,
    []
  );

  useEffect(() => {
    getContractsAction(contracts);
    setVisibleContracts(contracts);
    getTokens();
  }, [contracts]);

  return (
    <div className="wrapper invest">
      <div className="invest__header">
        <Link to="/use/send-to-contract">
          <AddButton text="Use with Smart Contract" send />
        </Link>

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

Invest.propTypes = {
  getContractsAction: PropTypes.func,
  getTokens: PropTypes.func
};

export default connect(null, { getContractsAction, getTokens })(Invest);
