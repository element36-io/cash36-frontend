import React from 'react';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import DialogButton from '../../../components/DialogButton';
import InvestDetails from '../InvestDetails';

import './InvestCard.scss';

const data = {
  name: 'Save the Planet',
  contractAddress: '0x7f9e681c040b341cc943a67872b737349048cb12',
  symbol: 'EUR36',
  description:
    'This is the project meant to save the world by donating to children.',
  investmentLink: 'https://www.google.com',
  website: 'https://www.google.com',
  creationDate: '2019-11-27T11:09:58.495Z',
  lastModifiedDate: '2019-11-27T11:09:58.495Z',
  access: 'PUBLIC'
};

const InvestCard = () => {
  return (
    <div className={`invest-card invest-card--${data.symbol} paper`}>
      <div className="invest-card__heading">
        <h3>{data.name}</h3>
        <p>{data.description}</p>
        <a target="_blank" href={data.website}>
          Visit website
        </a>
      </div>

      <div className="invest-card__buttons">
        <DialogButton button={<SecondaryButton>More</SecondaryButton>}>
          <InvestDetails {...data} />
        </DialogButton>
        <a target="_blank" href={data.investmentLink}>
          <DefaultButton>Invest Now</DefaultButton>
        </a>
      </div>
    </div>
  );
};

export default InvestCard;
