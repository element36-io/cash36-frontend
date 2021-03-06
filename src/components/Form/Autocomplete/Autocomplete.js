import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ReactCountryFlag from 'react-country-flag';
import useStyles from './MuiStyles';

function getSuggestions(value, list) {
  const input = value.trim().toLowerCase();
  const inputLength = input.length;
  if (inputLength === 0) return [];

  const suggestions = list.filter(item => {
    return item.name.slice(0, inputLength).toLowerCase() === input;
  });

  return suggestions;
}

function renderItem({ item, itemProps, index, highlightedIndex }) {
  const isHighlighted = highlightedIndex === index;
  return (
    <MenuItem key={item.code} {...itemProps} selected={isHighlighted}>
      <ReactCountryFlag
        code={item.code}
        svg
        styleProps={{
          width: '2rem',
          height: '1.3rem',
          backgroundSize: 'cover',
          marginRight: '.5rem'
        }}
      />
      {item.name}
    </MenuItem>
  );
}

renderItem.propTypes = {
  item: PropTypes.object,
  itemProps: PropTypes.object,
  index: PropTypes.number,
  highlightedIndex: PropTypes.number
};

const Autocomplete = ({
  name,
  label,
  placeholder,
  error,
  disabled,
  setFieldTouched,
  setFieldValue,
  isTouched,
  list
}) => {
  const classes = useStyles();
  const handleChange = selection => {
    setFieldTouched(name, true, true);
    setFieldValue(name, selection.code, true);
  };
  const itemToString = item => (item ? item.name : '');

  return (
    <div className={`element-form__input-wrapper ${name} autocomplete-wrapper`}>
      <Downshift onChange={handleChange} itemToString={itemToString}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          highlightedIndex,
          inputValue
        }) => {
          const inputProps = getInputProps();

          return (
            <div>
              <TextField
                label={label}
                placeholder={placeholder}
                autoComplete="off"
                value={inputValue}
                fullWidth
                className={classes.root}
                disabled={disabled}
                InputLabelProps={{
                  shrink: true
                }}
                {...inputProps}
              />
              <div
                {...getMenuProps()}
                className="paper no-radius autocomplete-suggestions"
              >
                {isOpen &&
                  getSuggestions(inputValue, list).map((item, index) =>
                    renderItem({
                      item,
                      index,
                      itemProps: getItemProps({ item }),
                      highlightedIndex
                    })
                  )}
              </div>
            </div>
          );
        }}
      </Downshift>
      {isTouched && error && <p className="form-error">{error}</p>}
    </div>
  );
};

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  placeholder: PropTypes.string,
  isTouched: PropTypes.bool,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  classes: PropTypes.object,
  disabled: PropTypes.bool
};

export default Autocomplete;
