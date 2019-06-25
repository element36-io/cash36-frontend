import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../components/Form/TextInput';
import './DetailsSource.scss';

const DetailsSource = React.memo(({ sourceDetails, updateSourceDetails }) => (
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
    </div>
    <div>
      <p>
        Good Description example:
        <br />
        Mein jährliches Einkommen als IT-Berater beträgt ca. 130000 CHF vor
        Steuern. Ich konnte damit etwas Geld sparen, welches ich nun investieren
        möchte.
      </p>
      <p>
        Bad Description Example:
        <br />
        Ich habe etwas Geld von meinem Gehlat gespart.
      </p>
    </div>
  </div>
));

DetailsSource.propTypes = {
  updateSourceDetails: PropTypes.func.isRequired,
  sourceDetails: PropTypes.string
};

export default DetailsSource;