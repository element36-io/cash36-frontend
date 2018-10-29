import { countries } from './text.data';

export const getCountryCode = (countryName) => {
  const code = countries.filter((country) => country.name === countryName);

  return code[0].code;
};
