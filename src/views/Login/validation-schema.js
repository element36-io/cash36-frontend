import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be at least 6 character')
    .required('Password is required')
});
