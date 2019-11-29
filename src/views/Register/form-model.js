export const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

export const formFields = [
  {
    label: 'Email',
    name: 'username',
    type: 'text'
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password'
  },
  {
    label: 'Confirm Password',
    name: 'passwordConfirmation',
    type: 'password'
  }
];
