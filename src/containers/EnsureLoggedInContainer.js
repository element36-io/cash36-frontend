import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import Wallet from "./Wallet/Wallet";


/**
 * Main Entry Component into the App, ensures that the user is logged in, otherwise redirects to Login
 */
class EnsureLoggedInContainer extends Component {

    componentWillMount() {
        this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth()
    }

    checkAuth() {
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
            this.props.history.replace('/login');
        }
    }

    render() {
        return (
            <div>
                {this.props.isLoggedIn === true &&
                <Route path="/wallet" component={Wallet}/>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.loggedIn
    }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)