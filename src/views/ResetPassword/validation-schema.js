import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Field is required')
});
