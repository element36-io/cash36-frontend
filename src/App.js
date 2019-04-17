import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import Wallet from './views/Wallet';

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="" component={Wallet} />
        </Switch>
      </Router>
    );
  }
}

export default App;
