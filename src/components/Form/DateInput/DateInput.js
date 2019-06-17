import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { InlineDatePicker } from 'material-ui-pickers';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import TodayIcon from '@material-ui/icons/Today';

const DateInput = props => {
  const {
    name,
    label,
    error,
    setFieldValue,
    setFieldTouched,
    isTouched,
    maxDate,
    initialFocusedDate
  } = props;
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = useCallback(
    date => {
      setSelectedDate(date);
      setFieldValue(name, date, true);
      setFieldTouched(name, true, true);
    },
    [selectedDate]
  );

  const onClose = useCallback(() => {
    setFieldTouched(name, true, true);
  }, [setFieldTouched]);

  return (
    <div className={`element-form__input-wrapper ${name}`}>
      <InlineDatePicker
        value={selectedDate}
        onChange={handleChange}
        fullWidth
        autoOk
        maxDate={maxDate}
        initialFocusedDate={initialFocusedDate}
        onClose={onClose}
        rightArrowIcon={<RightArrowIcon />}
        leftArrowIcon={<LeftArrowIcon />}
        label={label}
        format={'DD.MM.YYYY'}
        InputProps={{
          placeholder: 'DD.MM.YYYY'
        }}
        InputLabelProps={{
          shrink: true
        }}
        clearable
        keyboard
        mask={value =>
          value
            ? [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]
            : []
        }
        keyboardIcon={<TodayIcon />}
      />
      {isTouched && error && <p className="form-error">{error}</p>}
    </div>
  );
};

DateInput.propTypes = {
  date: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  label: PropTypes.string,
  disablePast: PropTypes.bool,
  error: PropTypes.string,
  isTouched: PropTypes.any,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  initialFocusedDate: PropTypes.instanceOf(Date)
};

export default DateInput;
