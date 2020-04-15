import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ZeroXAddress from '../../../components/ZeroXAddress';
import TokenIcon from '../../../components/TokenIcon';
import { formatAmount } from '../../../helpers/currencies.helpers';

import './InvestDetails.scss';

const InvestDetails = ({
  name,
  description,
  contractAddress,
  contractSymbol,
  acceptedTokens,
  investmentLink,
  website,
  isWalletFree,
  tokens
}) => {
  console.log(tokens);
  const tokenTotalSupply = (tokens, symbol) =>
    tokens.find(token => symbol === token.symbol).balance;

  return (
    <div className="invest-details">
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="invest-details__info-field">
        <div>Smart Contract address:</div>
        <ZeroXAddress address={contractAddress} />
      </div>
      <div className="invest-details__info-field">
        <div>Contract token:</div>
        <div>{contractSymbol}</div>
      </div>
      <div
        style={{
          display: 'flex'
        }}
      >
        <div className="invest-details__info-field">
          <div>Accepted Token(s):</div>
          {acceptedTokens.map(acceptedToken => (
            <div key={acceptedToken} className="invest-details__accepted-token">
              <div>
                {acceptedToken} <TokenIcon symbol={acceptedToken} />
              </div>
            </div>
          ))}
        </div>
        <div className="invest-details__info-field">
          <div style={{ marginLeft: '4rem', display: 'flex' }}>Balance(s):</div>
          {acceptedTokens.map(acceptedToken => (
            <div key={acceptedToken} className="invest-details__accepted-token">
              <div
                style={{
                  fontWeight: '500',
                  marginLeft: '4rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                {formatAmount(tokenTotalSupply(tokens, acceptedToken))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="invest-details__info-field">
        <div>Website:</div>
        <div>
          <a href={website}>{website}</a>
        </div>
      </div>
      <div className="invest-details__info-field">
        <div>Investment Link:</div>
        <div>
          <a href={investmentLink}>{investmentLink}</a>
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
    </div>
  );
};

InvestDetails.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  contractSymbol: PropTypes.string,
  contractAddress: PropTypes.string,
  acceptedTokens: PropTypes.arrayOf(PropTypes.string),
  investmentLink: PropTypes.string,
  website: PropTypes.string,
  creationDate: PropTypes.string,
  lastModifiedDate: PropTypes.string,
  access: PropTypes.string,
  isWalletFree: PropTypes.bool,
  tokens: PropTypes.array
};

const mapStateToProps = state => {
  return {
    tokens: state.tokens.tokens
  };
};

export default connect(mapStateToProps)(InvestDetails);
