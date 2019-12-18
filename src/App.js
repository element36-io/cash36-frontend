import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import ResetPassword from './views/ResetPassword';
import SetNewPassword from './views/SetNewPassword';
import AccountActivation from './views/AccountActivation';
import Wallet from './views/Wallet';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/account-activation" component={AccountActivation} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/set-new-password" component={SetNewPassword} />
      <Route path="" component={Wallet} />
    </Switch>
  </Router>
);

export default App;
