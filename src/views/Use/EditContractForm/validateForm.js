import validator from 'validator';

const urlOptions = {
  protocols: ['https'],
  require_protocol: true
};

export default values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'This field is required';
  } else if (values.name.length > 40) {
    errors.name = 'Name must be 40 characters or less - number of characters used: '+values.name.length;
  }

  if (!values.description) {
    errors.description = 'This field is required';
  } else if (values.description.length > 400) {
    errors.description = 'Description must be 400 characters or less - number of characters used: '+values.description.length;
  }

  if (!values.acceptedTokens.length) {
    errors.acceptedTokens = 'This field is required';
  }

  if (!values.contractSymbol) {
    errors.contractSymbol = 'This field is required';
  } else if (values.contractSymbol.length > 5) {
    errors.contractSymbol = 'Must be 5 characters or less - characters used: '+values.contractSymbol.length;
  }

  if (!values.access) {
    errors.access = 'This field is required';
  }

  if (!values.website) {
    errors.website = 'This field is required';
  } else if (!validator.isURL(values.website, urlOptions)) {
    errors.website = 'Must be a valid https URL';
  }

  if (!values.investmentLink) {
    errors.investmentLink = 'This field is required';
  } else if (!validator.isURL(values.investmentLink, urlOptions)) {
    errors.investmentLink = 'Must be a valid https URL';
  }

  return errors;
};
