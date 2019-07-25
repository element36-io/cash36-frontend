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
  }
});
