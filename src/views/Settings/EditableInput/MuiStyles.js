export default theme => ({
  root: {
    fontSize: '1.6rem',
    '& input': {
      fontSize: '1.6rem',
      color: theme.palette.common.black,
      paddingBottom: '.2rem',
      '&:focus': {
        borderColor: '#1F8EEA !important'
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
