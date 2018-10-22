import { countries } from './text.data';

export const decodeSpecialChars = (string) => decodeURIComponent(escape(string));
export const getCountryCode = (countryName) => {
  const code = countries.filter((country) => country.name === countryName);

  return code[0].code;
};
