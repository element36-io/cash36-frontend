import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../components/Form/TextInput';
import './DetailsSource.scss';

const DetailsSource = React.memo(({ sourceDetails, updateSourceDetails }) => (
  <div className="verification-user-profile__row verification-user-profile__source">
    <div>
      <TextInput
        name="sourceDetails"
        label="Detailed Description of Source of Funds"
        placeholder="Add a detailed description of your Source of Funds"
        multiline
        onChange={updateSourceDetails}
        value={sourceDetails}
      />
    </div>
    <div>
      <p>
        Good Description example:
        <br />
      </p>
      <p>
        Bad Description Example:
        <br />
      </p>
    </div>
  </div>
));

DetailsSource.propTypes = {
  updateSourceDetails: PropTypes.func.isRequired,
  sourceDetails: PropTypes.string
};

export default DetailsSource;
