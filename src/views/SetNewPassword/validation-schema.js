import * as Yup from 'yup';

export default Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
  newPasswordConfirmation: Yup.string()
    .min(6, null)
    .required(null)
    .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
});
