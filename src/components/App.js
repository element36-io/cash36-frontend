import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginWizard from './Login/LoginWizard'
import Wallet from './Wallet/Wallet'

const theme = createMuiTheme({
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
    primary: 'linear-gradient(to left bottom, #6bafe6, #469CE0)',
    primaryOverlay: 'linear-gradient(to right bottom, rgba(107, 175, 230, 0.7), rgba(70, 156, 224, 0.7))'
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/' component={Wallet} />
            <Route exact path='/login' component={LoginWizard} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
