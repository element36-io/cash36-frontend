import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import TokenIcon from '../../../components/TokenIcon';

import './InvestDetails.scss';

const InvestDetails = ({
  name,
  description,
  contractAddress,
  symbol,
  investmentLink,
  website
}) => {
  return (
    <div className="invest-details">
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="invest-details__info-field">
        <div>Smart Contract address:</div>
        <div>{contractAddress}</div>
      </div>
      <div className="invest-details__info-field">
        <div>Token:</div>
        <div>
          {symbol} <TokenIcon symbol={symbol} />
        </div>
      </div>

      <div className="invest-details__info-field">
        <div>Website:</div>
        <div>
          <a href={website}>{website}</a>
        </div>
      </div>
      <a target="_blank" href={investmentLink} rel="noopener noreferrer">
        <DefaultButton>Invest Now</DefaultButton>
      </a>
    </div>
  );
};

InvestDetails.propTypes = {
  name: PropTypes.string,
  contractAddress: PropTypes.string,
  symbol: PropTypes.string,
  investmentLink: PropTypes.string,
  website: PropTypes.string,
  creationDate: PropTypes.string,
  lastModifiedDate: PropTypes.string,
  access: PropTypes.string
};

export default InvestDetails;
