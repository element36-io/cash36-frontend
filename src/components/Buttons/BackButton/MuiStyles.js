import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    backgroundImage: 'none',
    backgroundColor: '#fff',
    minWidth: 0,
    width: '4rem',
    height: '4rem',
    borderRadius: '4px',
    boxShadow: '0 5px 6px 0 rgba(0,0,0,0.10)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    opacity: '0.5',
    position: 'absolute',
    top: '1.9rem',
    left: '2.7rem',
    zIndex: 3
  }
});
