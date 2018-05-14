import React from 'react';
import CreateAccount from "./CreateAccount";
import EnterCredentials from "./EnterCredentials";
import UploadID from "./UploadID";
import SubheaderEmpty from "../../components/SubheaderEmpty";
import DownloadUport from "./DownloadUport";
import AttestUser from "./AttestUser";


class RegisterWizard extends React.Component {

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

        let currentStep = this.state.currentStep;
        if (currentStep >= 5) {
            currentStep = 5;
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
                <DownloadUport currentStep={this.state.currentStep} afterValid={this._next.bind(this)}/>
                <CreateAccount currentStep={this.state.currentStep} afterValid={this._next.bind(this)}/>
                <EnterCredentials currentStep={this.state.currentStep} afterValid={this._next.bind(this)}/>
                <UploadID currentStep={this.state.currentStep} afterValid={this._next.bind(this)}/>
                <AttestUser currentStep={this.state.currentStep} afterValid={this._next.bind(this)}
                            credentials={this.state.credentials}/>
            </div>
        );
    }
}

export default RegisterWizard;