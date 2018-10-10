import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './config/theme';
import Login from './views/Login';
import Register from './views/Register';
import Wallet from './components/Wallet/Wallet';

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/' component={Wallet} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
