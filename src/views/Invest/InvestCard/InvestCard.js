import React from 'react';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import DialogButton from '../../../components/DialogButton';
import InvestDetails from '../InvestDetails';
import { truncateString } from '../../../helpers/string.helpers';

import './InvestCard.scss';

const InvestCard = props => {
  const {
    symbol,
    name,
    isOwnedByUser,
    description,
    website,
    investmentLink
  } = props;
  return (
    <div className={`invest-card invest-card--${symbol} paper`}>
      <div className="invest-card__heading">
        <div className="invest-card__heading__top">
          <h3>{name}</h3>
          {isOwnedByUser && <div className="invest-card__dropdown-menu"></div>}
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
