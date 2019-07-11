import HttpProvider from 'ethjs-provider-http';
import { network as networkUtils } from 'uport-transports';
try {
  throw new Error({ message: 'TEST' });
} catch (e) {
  console.warn(e.message);
}

class e36Provider {
  constructor ({ networkId, account, successCallback, errorCallback }) {
    this._setNetwork(networkId);
    this.account = account;
    this.provider = new HttpProvider(this.network.rpcUrl);
  }

  _setNetwork = networkId => {
    const networksList = networkUtils.defaults.networks;
    const networkName = Object.keys(networksList).filter(
      key => networksList[key].id === `0x${networkId}`
    )[0];

    this.network = networkUtils.config.network(networkName);
  };

  getProvider = () => this.provider;

  getAddress = cb => {
    console.warn('======== getAddress');
    cb(null, this.account);
  };

  sendTransaction = async (params, cb) => {
    console.warn('========== TRANSACTION PARAMS');
    console.warn(params);
    // cb(new Error('PUKO TRANSACTIoN')');
  };

  sendAsync = async (payload, callback) => {
    const respond = (error, result) => {
      if (error) {
        callback(
          { id: payload.id, jsonrpc: '2.0', error: error.message },
          null
        );
      } else {
        callback(null, {
          id: payload.id,
          jsonrpc: '2.0',
          result
        });
      }
    };

    switch (payload.method) {
      case 'eth_coinbase':
        return this.getAddress(respond);
      case 'eth_accounts':
        return this.getAddress(respond);
      case 'eth_sendTransaction':
        return this.sendTransaction(payload.params[0], respond);
      default:
        return this.provider.sendAsync(payload, callback);
    }
  };
}

export default e36Provider;
