import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from './LandingPage';
import RegisterWizard from './Register/RegisterWizard';
import LoginWizard from './Login/LoginWizard'
import EnsureLoggedInContainer from "./EnsureLoggedInContainer";


class Main extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={LandingPage}/>
                    <Route path='/login' component={LoginWizard}/>
                    <Route path='/register' component={RegisterWizard}/>
                    <Route path='/wallet' component={EnsureLoggedInContainer}/>
                </Switch>
            </div>
        );
    }
}

export default Main;