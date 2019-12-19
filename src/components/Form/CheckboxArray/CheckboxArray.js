import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import './CheckboxArray.scss';

const CheckboxArray = ({ name, checkboxes, formProps, isTouched, error }) => {
  return (
    <div className="element-form__input-wrapper --checkboxes">
      <div>Accepted token(s)</div>
      <div>
        <FieldArray
          validateOnChange={false}
          name={name}
          render={arrayHelpers =>
            checkboxes.map(checkbox => (
              <FormControlLabel
                key={checkbox.id}
                className="checkbox-input"
                label={checkbox.id}
                control={
                  <Checkbox
                    checked={formProps.values.acceptedTokens.includes(
                      checkbox.id
                    )}
                    onChange={e => {
                      if (e.target.checked) {
                        arrayHelpers.push(checkbox.id);
                      } else {
                        const idx = formProps.values.acceptedTokens.indexOf(
                          checkbox.id
                        );
                        arrayHelpers.remove(idx);
                      }
                    }}
                    color="primary"
                    name={checkbox.name}
                    id={checkbox.name}
                    type="checkbox"
                  />
                }
              />
            ))
          }
        />
      </div>
      {isTouched && error && <p className="form-error">{error}</p>}
    </div>
  );
};

CheckboxArray.propTypes = {
  name: PropTypes.string,
  checkboxes: PropTypes.array,
  formProps: PropTypes.object,
  isTouched: PropTypes.bool,
  error: PropTypes.string
};

export default CheckboxArray;
