import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './config/theme';
import LoginWizard from './views/Login/LoginWizard/LoginWizard';
import Wallet from './components/Wallet/Wallet';

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
    );
  }
}

export default App;
