import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('This field is required'),
  contractAddress: Yup.string().required('This field is required'),
  symbol: Yup.string().required('This field is required'),
  investmentLink: Yup.string().required('This field is required'),
  website: Yup.string().required('This field is required'),
  access: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required')
});
