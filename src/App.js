import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './config/theme';
import Header from './components/Header';
import Login from './views/Login';
import Wallet from './components/Wallet/Wallet';

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route exact path='/' component={Wallet} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
