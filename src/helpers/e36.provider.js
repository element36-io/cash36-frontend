import HttpProvider from 'ethjs-provider-http';
import { network as networkUtils } from 'uport-transports';
import { transactionRequest } from './uport.helpers';

class e36Provider {
  constructor ({ networkId, account, pushToken, boxPub, isActive }) {
    const networksList = networkUtils.defaults.networks;
    const networkName = Object.keys(networksList).filter(
      key => networksList[key].id === `0x${networkId}`
    )[0];

    this.network = networkUtils.config.network(networkName);
    this.account = account;
    this.provider = new HttpProvider(this.network.rpcUrl);
    this.pushToken = pushToken;
    this.boxPub = boxPub;
    this.isActive = isActive;
  }

  getProvider = () => this.provider;

  getAddress = cb => {
    cb(null, this.account);
  };

  sendTransaction = async (txObj, cb) => {
    try {
      const response = await transactionRequest({
        txObj,
        pushToken: this.pushToken,
        boxPub: this.boxPub,
        networkId: this.network.id
      });
      cb(null, response);
    } catch (error) {
      cb(error);
    }
  };

  sendAsync = async (payload, callback) => {
    const respond = (error, result) => {
      if (error) {
        callback({ id: payload.id, jsonrpc: '2.0', error: error.message });
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
