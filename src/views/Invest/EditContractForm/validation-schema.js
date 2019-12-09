import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .required('This field is required')
    .max(40, 'Must be 40 characters or less'),
  symbol: Yup.string().required('This field is required'),
  investmentLink: Yup.string()
    .required('This field is required')
    .url('Must be a valid url'),
  website: Yup.string()
    .required('This field is required')
    .url('Must be a valid url'),
  access: Yup.string().required('This field is required'),
  description: Yup.string()
    .required('This field is required')
    .max(240, 'Must be 240 characters or less')
});
