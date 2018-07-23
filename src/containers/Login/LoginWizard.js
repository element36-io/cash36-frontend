import React from 'react';
import SubheaderEmpty from "../../components/SubheaderEmpty";
import Login from "./Login";
import Verification from "./Verification";
import Password from "./Password";

class LoginWizard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            credentials: {},
            currentStep: 1
        };
    }

    _next(data) {
        if (data) {
            this.setState({ credentials: data });
        }

        // look familiar?
        let currentStep = this.state.currentStep;
        if (currentStep >= 3) {
            currentStep = 3;
        } else {
            currentStep = currentStep + 1;
        }

        this.setState({
            currentStep: currentStep
        });
    }

    render() {
        return (
            <div>
                <SubheaderEmpty/>
                <Login currentStep={this.state.currentStep} afterValid={this._next.bind(this)}/>
                <Password currentStep={this.state.currentStep} afterValid={this._next.bind(this)}
                          credentials={this.state.credentials}/>
                <Verification currentStep={this.state.currentStep} afterValid={this._next.bind(this)}
                              credentials={this.state.credentials}/>
            </div>
        );
    }
}

export default LoginWizard;