import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import TextInput from '../../../../components/Form/TextInput';
import './SourceOfFunds.scss';

const sources = ['SavingsFromWork', 'Inheritance', 'Donation'];
const sources2 = ['Lottery', 'Other'];

const SourceOfFunds = ({
  values,
  otherValue,
  updateValue,
  updateOtherValue,
  hasError
}) => (
  <div className="verification-user-profile__source">
    <h4>Source of Funds</h4>
    <div className="verification-user-profile__row --alt">
      <FormGroup>
        {sources.map(item => (
          <FormControlLabel
            key={item}
            name={item}
            label={item === 'SavingsFromWork' ? 'Savings from Work' : item}
            control={
              <Checkbox
                color="primary"
                checked={values[item]}
                value={item}
                onChange={updateValue}
              />
            }
            style={{
              height: '3.3rem'
            }}
          />
        ))}
      </FormGroup>
      <div>
        <FormGroup>
          {sources2.map(item => (
            <FormControlLabel
              key={item}
              name={item}
              value={item}
              label={item}
              control={
                <Checkbox
                  color="primary"
                  checked={values[item]}
                  value={item}
                  onChange={updateValue}
                />
              }
              style={{
                height: '3.3rem'
              }}
            />
          ))}
        </FormGroup>
        {values.Other && (
          <TextInput
            name="other-sources"
            label="Other"
            placeholder="Describe Your Source of Funds"
            onChange={updateOtherValue}
            value={otherValue}
          />
        )}
      </div>
      {hasError && (
        <p className="verification-user-profile_error">
          These fields are required
        </p>
      )}
    </div>
  </div>
);

SourceOfFunds.propTypes = {
  values: PropTypes.object,
  otherValue: PropTypes.string,
  updateValue: PropTypes.func,
  updateOtherValue: PropTypes.func,
  hasError: PropTypes.bool
};

export default memo(SourceOfFunds);
