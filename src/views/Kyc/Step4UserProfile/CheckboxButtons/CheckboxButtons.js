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
  const source = [...sourcesOfFunds];
  const sourceOther = source.pop();

  return (
    <div className="checkbox-buttons">
      <div>
        <RadioGroup value={sourceOfFunds} onChange={onRadioChange}>
          {source.map(item => (
            <FormControlLabel
              key={item}
              name={item}
              value={item}
              label={item === 'SavingsFromWork' ? 'Savings from Work' : item}
              control={<Checkbox color="primary" />}
              labelPlacement="end"
              style={{
                height: '3.3rem'
              }}
            />
          ))}
        </RadioGroup>
      </div>
      <div>
        <RadioGroup value={sourceOfFunds} onChange={onRadioChange}>
          <FormControlLabel
            name={sourceOther}
            value={sourceOther}
            label={sourceOther}
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
