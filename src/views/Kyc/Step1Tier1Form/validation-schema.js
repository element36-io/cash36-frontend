import * as Yup from 'yup';
import IBAN from 'iban';
import { isValid } from 'date-fns';

export default Yup.object().shape({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  dateOfBirth: Yup.string()
    .required('This field is required')
    .test('isValidDate', 'Please enter a valid date', function (value) {
      const d = new Date(value);
      return isValid(d);
    })
    .nullable(),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('This field is required'),
  street: Yup.string().required('This field is required'),
  streetNr: Yup.string().required('This field is required'),
  city: Yup.string().required('This field is required'),
  zip: Yup.string().required('This field is required'),
  country: Yup.string().required('This field is required'),
  iban: Yup.string()
    .test('isValidIBAN', 'Please enter a valid IBAN', function (value) {
      return IBAN.isValid(value);
    })
    .required('This field is required'),
  nationality: Yup.string().required('This field is required')
});
