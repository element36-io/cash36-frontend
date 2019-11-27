import React from 'react';
import TruncateString from 'react-truncate-string';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import DialogButton from '../../../components/DialogButton';

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
      </div>

      <a href={data.investmentLink}>Investment Link</a>
      <TruncateString text={data.contractAddress} />

      <div className="invest-card__buttons">
        <DialogButton button={<SecondaryButton>More</SecondaryButton>}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            name: {data.name} <br />
            contractAddress: {data.contractAddress} <br />
            symbol: {data.symbol}
            <br />
            description: {data.description} <br />
            website: {data.website} <br />
            investment link: {data.investmentLink} <br />
            creationDate: {data.creationDate} <br />
            access: {data.access} <br />
            last modified: {data.lastModifiedDate}
          </div>
        </DialogButton>
        <DefaultButton>Invest Now</DefaultButton>
      </div>
    </div>
  );
};

export default InvestCard;
