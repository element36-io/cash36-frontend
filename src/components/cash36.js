import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uPort from '../config/uport.config';

/**
 * HOC for cash36. Add cash36 contracts to the wrapped component.
 *
 * @param WrappedComponent
 * @returns {*}
 */
const addCash36 = WrappedComponent => {
  class cash36 extends Component {
    constructor (props, context) {
      super(props, context);

      this.state = {
        web3: context.web3.web3,
        networkId: context.web3.networkId,
        loading: true
      };

      this.state.web3.setProvider(uPort.getProvider());
    }

    transactionHashCallback (action) {
      return (hash) => {
        console.log('transactionHashCallback - ' + action);
        // this.props.dispatch(info(Messages.transactionSent(action)));
      };
    }

    receiptCallback (action) {
      // return (receipt) => {
      console.log('receiptCallback - ' + action);
      console.log('==================');
      console.log('==================');
      console.log(`RECEIPT CALLBACK`);
      console.log('==================');
      console.log('==================');
      // this.props.dispatch(success(Messages.transactionMined(action)));
      // };
    }

    errorCallback (action) {
      return async (err) => {
        // this.props.dispatch(error(Messages.error(action, err.message)));
        console.log(`ERROR: ${err.message}`);
      };
    }

    getCallbacks (action) {
      return {
        receipt: this.receiptCallback(action).bind(this),
        transactionHash: this.transactionHashCallback(action).bind(this),
        error: this.errorCallback(action).bind(this)
      };
    }

    dispatchError (action, msg) {
      // this.props.dispatch(error(Messages.error(action, msg)));
    }

    render () {
      return (
        <WrappedComponent {...this.state} {...this.props} receiptCallback={this.receiptCallback}
          getCallbacks={this.getCallbacks.bind(this)}
          dispatchError={this.dispatchError.bind(this)} />
      );
    }
  }

  cash36.contextTypes = {
    web3: PropTypes.object
  };

  return cash36;
};

export default addCash36;
