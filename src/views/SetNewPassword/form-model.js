export const initialValues = {
  code: '',
  newPassword: '',
  newPasswordConfirmation: ''
};

export const formFields = [
  { label: 'Confirmation code', name: 'code', type: 'text' },
  {
    label: 'New Password',
    name: 'newPassword',
    type: 'password'
  },
  {
    label: 'New Password Confirmation',
    name: 'newPasswordConfirmation',
    type: 'password'
  }
];
