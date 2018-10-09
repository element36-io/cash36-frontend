import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import index from './store/index';
import Web3ProviderNew from './components/Web3Provider';

ReactDOM.render(
  <Provider store={index}>
    <Web3ProviderNew>
      <App />
    </Web3ProviderNew>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
