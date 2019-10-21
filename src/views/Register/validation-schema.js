import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string()
    .email('Invalid eamil address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be at least 6 character')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(6, null)
    .required(null)
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
});
