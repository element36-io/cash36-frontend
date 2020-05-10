import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../components/Form/TextInput';
import './DetailsSource.scss';

const DetailsSource = ({ sourceDetails, updateSourceDetails, hasError }) => (
  <div className="verification-user-profile__row verification-user-profile__source">
    <div>
      <TextInput
        name="sourceOfFundsDescription"
        label="Detailed Description of Source of Funds"
        placeholder="Add a detailed description of your Source of Funds"
        multiline
        rows={4}
        onChange={updateSourceDetails}
        value={sourceDetails}
      />
      {hasError && (
        <p className="verification-user-profile_error">
          This field is required
        </p>
      )}
    </div>
    <div>
      <p>
        Good Description example:
        <br />
        My annual income as a programmer is EUR 50.000. From that I have money on my
        savings account which I would like to invest now. 
      </p>
      <p>
        Bad Description Example:
        <br />
        I have saved some money on my savings account.
      </p>
    </div>
  </div>
);

DetailsSource.propTypes = {
  updateSourceDetails: PropTypes.func.isRequired,
  sourceDetails: PropTypes.string,
  hasError: PropTypes.bool
};

export default memo(DetailsSource);
