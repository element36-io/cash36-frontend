import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Web3ProviderNew from './components/Web3Provider'

ReactDOM.render(
  <Provider store={configureStore}>
    <Web3ProviderNew>
      <App />
    </Web3ProviderNew>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
