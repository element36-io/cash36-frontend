import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default [
  {
    link: '/buy',
    Icon: AddIcon,
    label: 'Buy'
  },
  {
    link: '/sell',
    Icon: RemoveIcon,
    label: 'Sell'
  },
  {
    link: {
      pathname: '/buy',
      state: {
        fromQuickActions: true
      }
    },
    Icon: ArrowForwardIcon,
    label: 'Send'
  }
];
