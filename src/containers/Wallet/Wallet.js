import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WalletNav from "./WalletNav";
import BuyTokens from "./BuyTokens";
import SellTokens from "./SellTokens";
import History from "./History";
import { connect } from "react-redux";
import Overview from "./Overview";

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
            // Fetch user balance for all tokens
            Promise.all(data.map(async(token) => {
                let balance = await fetch(`${this.state.backendUrl}/token/${token.symbol}/balance?userAddress=${this.props.loggedInAddress}`);
                balance = await balance.json();
                token.balance = balance;
                return token;
            })).then(data => {
                this.setState({ tokens: data });
            });
        });
    }

    render() {
        return (
            <div>
                <WalletNav tabIndex={this.state.tabIndex} changeTab={this.changeTab.bind(this)}/>
                {this.state.tabIndex === 0 && <Overview tokens={this.state.tokens}/>}
                {this.state.tabIndex === 1 && <BuyTokens tokens={this.state.tokens} updateTokens={this.updateTokens.bind(this)}/>}
                {this.state.tabIndex === 2 && <SellTokens tokens={this.state.tokens} updateTokens={this.updateTokens.bind(this)}/>}
                {this.state.tabIndex === 3 && <History tokens={this.state.tokens}/>}
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