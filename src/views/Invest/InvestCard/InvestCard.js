import React from 'react';
import TruncateString from 'react-truncate-string';

import './InvestCard.scss';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';

const data = {
  name: 'Save the Planet',
  contractAddress: '0x7f9e681c040b341cc943a67872b737349048cb12',
  symbol: 'EUR36',
  description:
    'This is the project meant to save the world by donating to children.',
  investmentLink: 'https://www.google.com'
};

const InvestCard = () => {
  return (
    <div className={`invest-card invest-card--${data.symbol} paper`}>
      <div className="invest-card__heading">
        <h3>{data.name}</h3>
        <p>{data.description}</p>
      </div>

      <a href={data.investmentLink}>Investment Link</a>
      <TruncateString text={data.contractAddress} />

      <div className="invest-card__buttons">
        <SecondaryButton>More</SecondaryButton>
        <DefaultButton>Invest Now</DefaultButton>
      </div>
    </div>
  );
};

export default InvestCard;
