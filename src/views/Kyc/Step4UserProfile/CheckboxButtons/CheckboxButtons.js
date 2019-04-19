import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, RadioGroup } from '@material-ui/core';

import TextInput from '../../../../components/Form/TextInput';

import './CheckboxButtons.scss';

const CheckboxButtons = ({
  sourceOfFunds,
  sourcesOfFunds,
  sourceOfFundsOther,
  otherSelected,
  onRadioChange,
  onTextChange
}) => {
  return (
    <div className="checkbox-buttons">
      <div>
        <RadioGroup value={sourceOfFunds} onChange={onRadioChange}>
          <FormControlLabel
            name={sourcesOfFunds[0]}
            value={sourcesOfFunds[0]}
            label="Savings from Work"
            control={<Checkbox color="primary" />}
            labelPlacement="end"
            style={{
              height: '3.3rem'
            }}
          />
          <FormControlLabel
            name={sourcesOfFunds[1]}
            value={sourcesOfFunds[1]}
            label={sourcesOfFunds[1]}
            control={<Checkbox color="primary" />}
            labelPlacement="end"
            style={{
              height: '3.3rem'
            }}
          />
          <FormControlLabel
            name={sourcesOfFunds[2]}
            value={sourcesOfFunds[2]}
            label={sourcesOfFunds[2]}
            control={<Checkbox color="primary" />}
            labelPlacement="end"
            style={{
              height: '3.3rem'
            }}
          />
          <FormControlLabel
            name={sourcesOfFunds[3]}
            value={sourcesOfFunds[3]}
            label={sourcesOfFunds[3]}
            control={<Checkbox color="primary" />}
            labelPlacement="end"
            style={{
              height: '3.3rem'
            }}
          />
        </RadioGroup>
      </div>
      <div>
        <RadioGroup value={sourceOfFunds} onChange={onRadioChange}>
          <FormControlLabel
            name={sourcesOfFunds[4]}
            value={sourcesOfFunds[4]}
            label={sourcesOfFunds[4]}
            control={<Checkbox color="primary" />}
            labelPlacement="end"
            style={{
              height: '3.3rem'
            }}
          />
        </RadioGroup>
        <TextInput
          name="other-sources"
          label="Other"
          placeholder="Describe Your Source of Funds"
          onChange={onTextChange}
          value={sourceOfFundsOther}
          disabled={!otherSelected}
        />
      </div>
    </div>
  );
};

CheckboxButtons.propTypes = {
  sourceOfFunds: PropTypes.string,
  sourcesOfFunds: PropTypes.array,
  sourceOfFundsOther: PropTypes.string,
  otherSelected: PropTypes.bool,
  onRadioChange: PropTypes.func,
  onTextChange: PropTypes.func
};

export default CheckboxButtons;
