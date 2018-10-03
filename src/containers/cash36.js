import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Connect, SimpleSigner } from "uport-connect";

/**
 * HOC for cash36. Add cash36 contracts to the wrapped component.
 *
 * @param WrappedComponent
 * @returns {*}
 */
const addCash36 = WrappedComponent => {

    class cash36 extends Component {

        constructor(props, context) {
            super(props, context);

            this.state = {
                web3: context.web3.web3,
                networkId: context.web3.networkId,
                loading: true,
            }

            this.uport = new Connect('cash36', {
                clientId: '2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6',
                network: 'rinkeby',
                signer: SimpleSigner('98fe93a539f8ed46def934713918f888df1e088dc0ec6c58333f131b4f4ca358')
            });

            this.state.web3.setProvider(this.uport.getProvider());
        }

        transactionHashCallback(action) {
            return (hash) => {
                console.log("transactionHashCallback - "+ action);
                //this.props.dispatch(info(Messages.transactionSent(action)));
            }
        }

        receiptCallback(action) {
            return (receipt) => {
                console.log("receiptCallback - "+ action);
                //this.props.dispatch(success(Messages.transactionMined(action)));
            }
        }

        errorCallback(action) {
            return async (err) => {
                //this.props.dispatch(error(Messages.error(action, err.message)));
                console.log(`ERROR: ${err.message}`);
            }
        }

        getCallbacks(action) {
            return {
                receipt: this.receiptCallback(action).bind(this),
                transactionHash: this.transactionHashCallback(action).bind(this),
                error: this.errorCallback(action).bind(this)
            }
        }

        dispatchError(action, msg) {
            //this.props.dispatch(error(Messages.error(action, msg)));
        }

        render() {
            return (
                <WrappedComponent {...this.state} {...this.props} getCallbacks={this.getCallbacks.bind(this)}
                                  dispatchError={this.dispatchError.bind(this)}/>
            )
        }
    }

    cash36.contextTypes = {
        web3: PropTypes.object,
    };

    function mapStateToProps(state) {
        return {
            credentials: state.user.credentials,
            isLoggedIn: state.user.loggedIn,
            loggedInAddress: state.user.loggedInAddress
        }
    }

    return connect(mapStateToProps)(cash36);
}

export default addCash36;