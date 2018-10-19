export default theme => ({
  root: {
    fontSize: '1.6rem',
    '& input': {
      fontSize: '1.6rem',
      borderBottom: '2px solid #EDF0F4',
      '&:focus': {
        borderColor: '#1F8EEA'
      },
      '&::placeholder': {
        color: '#01152C'
      }
    }
  },
  label: {
    marginTop: '.6rem',
    fontWeight: '500',
    fontSize: '1.6rem',
    lineHeight: '12px'
  }
});
