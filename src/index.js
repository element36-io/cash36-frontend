import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import Web3ProviderNew from './components/Web3Provider';

ReactDOM.render(
  <Provider store={store}>
    <Web3ProviderNew>
      <App />
    </Web3ProviderNew>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
