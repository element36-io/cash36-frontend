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
            loggedInAddress: '',
            loggedInMNID: '',
            currentStep: 1
        };
    }

    _next(loggedInAddress, loggedInMNID) {
        if (loggedInAddress && loggedInMNID) {
            this.setState({ loggedInAddress: loggedInAddress, loggedInMNID: loggedInMNID });
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
                <CreateAccount currentStep={this.state.currentStep} afterValid={this._next.bind(this)}
                               loggedInAddress={this.state.loggedInAddress} loggedInMNID={this.state.loggedInMNID}/>
                <EnterCredentials currentStep={this.state.currentStep} afterValid={this._next.bind(this)}/>
                <UploadID currentStep={this.state.currentStep} afterValid={this._next.bind(this)}/>
                <AttestUser currentStep={this.state.currentStep} afterValid={this._next.bind(this)}
                            loggedInAddress={this.state.loggedInAddress} loggedInMNID={this.state.loggedInMNID}/>
            </div>
        );
    }
}

export default RegisterWizard;