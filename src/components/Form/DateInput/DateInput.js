import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import TodayIcon from '@material-ui/icons/Today';

const DateInput = ({
  name,
  label,
  error,
  setFieldValue,
  setFieldTouched,
  isTouched,
  maxDate,
  initialFocusedDate
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = useCallback(
    date => {
      setSelectedDate(date);
      setFieldTouched(name, true, true);
      setFieldValue(name, date, true);
    },
    [selectedDate]
  );

  const onClose = useCallback(() => {
    setFieldTouched(name, true, true);
  }, [setFieldTouched]);

  return (
    <div className={`element-form__input-wrapper ${name}`}>
      <KeyboardDatePicker
        id={`date-picker-${name}`}
        value={selectedDate}
        onChange={handleChange}
        onClose={onClose}
        fullWidth
        variant="inline"
        autoOk
        maxDate={maxDate}
        initialFocusedDate={initialFocusedDate}
        rightArrowIcon={<RightArrowIcon />}
        leftArrowIcon={<LeftArrowIcon />}
        label={label}
        error={!!error[name]}
        FormHelperTextProps={{ disabled: true }}
        format={'DD.MM.YYYY'}
        InputProps={{
          placeholder: 'DD.MM.YYYY'
        }}
        InputLabelProps={{
          shrink: true
        }}
        keyboardIcon={<TodayIcon />}
      />
      {isTouched && error[name] && <p className="form-error">{error[name]}</p>}
    </div>
  );
};

DateInput.propTypes = {
  name: PropTypes.string,
  date: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  label: PropTypes.string,
  disablePast: PropTypes.bool,
  error: PropTypes.object,
  isTouched: PropTypes.any,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  initialFocusedDate: PropTypes.instanceOf(Date)
};

export default DateInput;
