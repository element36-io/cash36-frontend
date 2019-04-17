import * as Yup from 'yup';

export default Yup.object().shape({
  targetInvestment: Yup.string().required('This field is required'),
  acceptedToken: Yup.string().required('This field is required')
});
