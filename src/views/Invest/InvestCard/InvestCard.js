import React from 'react';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import DialogButton from '../../../components/DialogButton';
import InvestDetails from '../InvestDetails';
import DropdownMenu from '../../../components/DropdownMenu';
import EditContractForm from '../EditContractForm';
import { truncateString } from '../../../helpers/string.helpers';
import { deleteContract } from '../../../helpers/async/contracts.helpers';

import './InvestCard.scss';

const InvestCard = props => {
  const {
    symbol,
    contractAddress,
    name,
    isOwnedByUser,
    description,
    website,
    investmentLink,
    refetchPublicContracts,
    refetchUserContracts,
    access
  } = props;

  const removeContract = async () => {
    try {
      await deleteContract(contractAddress);
      refetchPublicContracts();
      refetchUserContracts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`invest-card invest-card--${symbol} paper`}>
      <div className="invest-card__heading">
        <div className="invest-card__heading__top">
          <h3>{name}</h3>
          {isOwnedByUser && (
            <DropdownMenu
              menuItems={[
                <MenuItem key="edit">
                  <DialogButton button={<div>Edit</div>}>
                    <EditContractForm
                      refetchUserContracts={refetchUserContracts}
                      refetchPublicContracts={refetchPublicContracts}
                      contractAddress={contractAddress}
                      initialValues={{
                        name,
                        symbol,
                        description,
                        website,
                        investmentLink,
                        access
                      }}
                    />
                  </DialogButton>
                </MenuItem>,
                <MenuItem key="remove" onClick={removeContract}>
                  Remove
                </MenuItem>
              ]}
            />
          )}
        </div>

        <p>{truncateString(description, 56)}</p>
        <a target="_blank" href={website} rel="noopener noreferrer">
          Visit website
        </a>
      </div>

      <div className="invest-card__buttons">
        <DialogButton button={<SecondaryButton>More</SecondaryButton>}>
          <InvestDetails {...props} />
        </DialogButton>
        <a target="_blank" href={investmentLink} rel="noopener noreferrer">
          <DefaultButton>Invest Now</DefaultButton>
        </a>
      </div>
    </div>
  );
};

export default InvestCard;
