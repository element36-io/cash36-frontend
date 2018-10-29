export default theme => ({
  root: {
    padding: '1.2rem 1.6rem',
    display: 'inline-flex',
    flexWrap: 'wrap'
  },
  picker: {
    '&:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.greys.lightGrey}`,
      marginRight: '2rem',
      paddingRight: '1rem'
    }
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.4rem',
    color: '#01152C',
    opacity: '0.5'
  },
  labelText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.4rem',
    transform: 'translateY(1px)'
  },
  icon: {
    fontSize: '1.6rem',
    marginRight: '.5rem',
    color: '#01152C',
    opacity: '0.8'
  },
  input: {
    cursor: 'default',
    width: '100%',
    fontSize: '1.6rem',
    backgroundColor: 'transparent',
    zIndex: 4,
    '&>input': {
      padding: 0,
      cursor: 'pointer'
    }
  },
  pickerInputBox: {
    width: '12.7rem',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '&>svg': {
      color: '#CCD0D5',
      position: 'absolute',
      right: 0
    }
  }
});
