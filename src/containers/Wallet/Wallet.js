import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WalletNav from "./WalletNav";
import BuyTokens from "./BuyTokens";
import SellTokens from "./SellTokens";
import History from "./History";
import { connect } from "react-redux";

class Wallet extends Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            backendUrl: url,
            tokens: {},
            tabIndex: 0,
        }
    }

    componentDidMount() {
        this.updateTokens();
    }

    changeTab = (event, value) => {
        this.setState({ tabIndex: value });
    };

    updateTokens() {
        fetch(`${this.state.backendUrl}/token`).then(results => {
            return results.json();
        }).then(data => {
            // Load balances
            for (let i = 0; i < data.length; i++) {
                fetch(`${this.state.backendUrl}/token/${data[ i ].symbol}/balance?userAddress=${this.props.loggedInAddress}`).then(results => {
                    return results.json();
                }).then(balance => {
                    data[ i ].balance = balance;
                });
            }
            this.setState({ tokens: data });
        });
    }

    render() {
        return (
            <div>
                <WalletNav tabIndex={this.state.tabIndex} changeTab={this.changeTab.bind(this)}/>
                {this.state.tabIndex === 0 && <BuyTokens tokens={this.state.tokens} updateTokens={this.updateTokens.bind(this)}/>}
                {this.state.tabIndex === 1 && <SellTokens tokens={this.state.tokens} updateTokens={this.updateTokens.bind(this)}/>}
                {this.state.tabIndex === 2 && <History tokens={this.state.tokens}/>}
            </div>
        );
    }
}

Wallet.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    credentials: state.user.credentials,
    loggedInAddress: state.user.loggedInAddress,
});

export default connect(
    mapStateToProps,
)(Wallet);