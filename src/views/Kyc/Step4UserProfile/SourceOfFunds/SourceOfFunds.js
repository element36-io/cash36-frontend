import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, RadioGroup } from '@material-ui/core';
import TextInput from '../../../../components/Form/TextInput';
import './SourceOfFunds.scss';

const sources = ['SavingsFromWork', 'Inheritance', 'Donation'];
const sources2 = ['Lottery', 'Other'];

const SourceOfFunds = React.memo(
  ({ value, otherValue, updateValue, updateOtherValue }) => (
    <div className="verification-user-profile__source">
      <h4>Source of Funds</h4>
      <div className="verification-user-profile__row --alt">
        <RadioGroup value={value} onChange={updateValue}>
          {sources.map(item => (
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
        <div>
          <RadioGroup value={value} onChange={updateValue}>
            {sources2.map(item => (
              <FormControlLabel
                key={item}
                name={item}
                value={item}
                label={item}
                control={<Checkbox color="primary" />}
                labelPlacement="end"
                style={{
                  height: '3.3rem'
                }}
              />
            ))}
          </RadioGroup>
          {value.toLowerCase() === 'other' && (
            <TextInput
              name="other-sources"
              label="Other"
              placeholder="Describe Your Source of Funds"
              onChange={updateOtherValue}
              value={otherValue}
            />
          )}
        </div>
      </div>
    </div>
  )
);

SourceOfFunds.propTypes = {
  value: PropTypes.string,
  otherValue: PropTypes.string,
  updateValue: PropTypes.func,
  updateOtherValue: PropTypes.func
};

export default SourceOfFunds;
