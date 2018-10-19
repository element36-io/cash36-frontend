export default theme => ({
  root: {
    borderBottom: '2px solid #EDF0F4'
  },
  label: {
    marginTop: '.6rem',
    fontSize: '1.6rem',
    fontWeight: '500',
    lineHeight: '12px'
  },
  placeholder: {
    display: 'flex',
    alignItems: 'center'
  },
  placeholderIcon: {
    backgroundColor: '#1F8EEA',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.9rem',
    height: '1.3rem',
    fontSize: '1rem',
    lineHeight: '12px',
    marginRight: '.5rem'
  },
  placeholderText: {
    fontSize: '1.6rem',
    color: theme.palette.text.hint
  },
  countryIcon: {
    width: '1.9rem',
    height: '1.3rem',
    fontSize: '1rem',
    marginRight: '.5rem'
  },
  countryName: {
    fontSize: '1.6rem'
  }
});
