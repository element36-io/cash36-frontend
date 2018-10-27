import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './config/theme';
import Header from './components/Header';
import Login from './views/Login';
import Home from './views/Home';
import Buy from './views/Buy';
import Sell from './views/Sell';
import Transfer from './views/Transfer';
import History from './views/History';
import Contacts from './views/Contacts';

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/buy' component={Buy} />
              <Route exact path='/sell' component={Sell} />
              <Route exact path='/transfer' component={Transfer} />
              <Route exact path='/history' component={History} />
              <Route exact path='/contacts' component={Contacts} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
