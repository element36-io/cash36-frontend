import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    fontSize: '1em',
    '& input': {
      fontSize: '1em',
      '&::placeholder': {
        color: '#01152C',
        opacity: '0.5'
      }
    }
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '1rem',
    left: 0,
    right: 0
  }
});
