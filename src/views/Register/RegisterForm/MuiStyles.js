export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '40rem'
  },
  headline: {
    marginBottom: '3rem',
    fontWeight: '500'
  },
  textField: {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.greys.lightGrey}`,
    padding: '1rem',
    '&:focus-within': {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    }
  },
  textFieldUsername: {
    border: `1px solid ${theme.palette.greys.lightGrey}`,
    padding: '1rem',
    backgroundColor: theme.palette.greys.headerGrey
  },
  label: {
    fontSize: '1.9rem',
    marginLeft: '1rem',
    marginTop: '1rem'
  },
  input: {
    marginTop: '1rem',
    fontSize: '1.5rem'
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
    backgroundImage: theme.gradients.primary
  },
  forgotPassword: {
    marginTop: '2rem',
    alignSelf: 'flex-start'
  },
  marginBot: {
    marginBottom: '3rem'
  },
  errorMessage: {
    marginLeft: '1rem',
    marginTop: '1rem'
  }
});
