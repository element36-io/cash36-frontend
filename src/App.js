import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './config/theme';
import Login from './views/Login';
import Wallet from './views/Wallet';
import Header from './components/Header';

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route path='' component={Wallet}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
