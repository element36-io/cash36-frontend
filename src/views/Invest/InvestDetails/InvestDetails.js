import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import TokenIcon from '../../../components/TokenIcon';

import './InvestDetails.scss';

const InvestDetails = ({
  name,
  description,
  contractAddress,
  contractSymbol,
  acceptedTokens,
  investmentLink,
  website,
  isWalletFree
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
        <div>Contract token:</div>
        <div>{contractSymbol}</div>
      </div>
      <div className="invest-details__info-field">
        <div>Accepted Token(s):</div>
        {acceptedTokens.map(acceptedToken => (
          <div key={acceptedToken} className="invest-details__accepted-token">
            {acceptedToken} <TokenIcon symbol={acceptedToken} />
          </div>
        ))}
      </div>

      <div className="invest-details__info-field">
        <div>Website:</div>
        <div>
          <a href={website}>{website}</a>
        </div>
      </div>
      <div className="invest-details__info-field">
        <div>Wallet free status:</div>
        <div>
          {isWalletFree
            ? 'This contract is wallet free'
            : 'This contract is not wallet free'}
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
