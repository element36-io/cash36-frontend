import React from 'react';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import DialogButton from '../../../components/DialogButton';
import InvestDetails from '../InvestDetails';
import { truncateString } from '../../../helpers/string.helpers';

import './InvestCard.scss';

const InvestCard = props => {
  return (
    <div className={`invest-card invest-card--${props.symbol} paper`}>
      <div className="invest-card__heading">
        <h3>{props.name}</h3>
        <p>{truncateString(props.description, 56)}</p>
        <a target="_blank" href={props.website} rel="noopener noreferrer">
          Visit website
        </a>
      </div>

      <div className="invest-card__buttons">
        <DialogButton button={<SecondaryButton>More</SecondaryButton>}>
          <InvestDetails {...props} />
        </DialogButton>
        <a
          target="_blank"
          href={props.investmentLink}
          rel="noopener noreferrer"
        >
          <DefaultButton>Invest Now</DefaultButton>
        </a>
      </div>
    </div>
  );
};

export default InvestCard;
