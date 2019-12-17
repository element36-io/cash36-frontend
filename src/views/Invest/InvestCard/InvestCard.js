import React, { useRef } from 'react';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import ButtonDialog from '../../../components/ButtonDialog';
import InvestDetails from '../InvestDetails';
import DropdownMenu from '../../../components/DropdownMenu';
import EditContractForm from '../EditContractForm';
import { truncateString } from '../../../helpers/string.helpers';
import { deleteContract } from '../../../helpers/async/contracts.helpers';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import './InvestCard.scss';

const InvestCard = props => {
  const {
    acceptedTokens,
    contractAddress,
    name,
    isOwnedByUser,
    description,
    website,
    contractSymbol,
    isWalletFree,
    investmentLink,
    refetchContracts,
    access
  } = props;

  const editButtonRef = useRef();

  const removeContract = async () => {
    try {
      await deleteContract(contractAddress);
      refetchContracts();
    } catch (error) {
      console.log(error);
    }
  };

  const editContract = () => {
    editButtonRef.current.click();
  };

  return (
    <div className={`invest-card invest-card--${acceptedTokens[0]} paper`}>
      <div className="invest-card__heading">
        <div className="invest-card__heading__top">
          <h3>
            {name} {access === 'PRIVATE' && <span>private</span>}
          </h3>

          {isOwnedByUser && (
            <ButtonDialog button={<button ref={editButtonRef}>Edit</button>}>
              <EditContractForm
                refetchContracts={refetchContracts}
                contractAddress={contractAddress}
                initialValues={{
                  name,
                  acceptedTokens,
                  contractSymbol,
                  isWalletFree,
                  description,
                  website,
                  investmentLink,
                  access
                }}
              />
            </ButtonDialog>
          )}
          {isOwnedByUser && (
            <DropdownMenu
              menuItems={[
                {
                  title: 'Edit',
                  onClick: editContract
                },
                {
                  title: 'Remove',
                  onClick: removeContract
                }
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
        <ButtonDialog button={<SecondaryButton>More</SecondaryButton>}>
          <InvestDetails {...props} />
        </ButtonDialog>
        <a target="_blank" href={investmentLink} rel="noopener noreferrer">
          <DefaultButton>
            {' '}
            {isWalletFree && <AccountBalanceIcon />}Invest Now
          </DefaultButton>
        </a>
      </div>
    </div>
  );
};

export default InvestCard;
