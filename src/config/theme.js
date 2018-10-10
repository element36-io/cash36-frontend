import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#6bafe6',
      main: '#469CE0',
      dark: '#316d9c',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff'
    },
    greys: {
      darkGrey: '#949CA8',
      headerGrey: '#F9F9FC',
      lightGrey: '#ededed',
      backgroundGrey: '#FCFCFC'
    },
    helpers: {
      warning: '#EF9A9A',
      onHold: '#FFEDED',
      processing: '#F9F6DF',
      complete: '#ECFAF7'
    }
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: '"Rubik" sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  gradients: {
    primary: 'linear-gradient(to left bottom, #316d9c, #469CE0)'
  }
});
