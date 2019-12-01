import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    fontSize: '1.6rem',
    '& input': {
      '&::placeholder': {
        color: '#01152C',
        opacity: '0.5'
      }
    }
  }
});
