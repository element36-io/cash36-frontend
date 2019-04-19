import React from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

import parseValue from './parseValue';

import './RadioButtons.scss';

const RadioButtons = ({ title, choices, value, onChange }) => {
  return (
    <div className="radio-buttons-group">
      <h4>{title}</h4>
      <RadioGroup value={value} onChange={onChange}>
        {choices.map(choice => {
          const parsedChoice = parseValue(choice);
          return (
            <FormControlLabel
              key={choice}
              value={choice}
              control={<Radio color="primary" />}
              labelPlacement="end"
              label={parsedChoice}
              style={{
                height: '3.3rem'
              }}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};

RadioButtons.propTypes = {
  title: PropTypes.string,
  choices: PropTypes.array,
  checkbox: PropTypes.bool,
  parseValue: PropTypes.func
};

export default RadioButtons;
