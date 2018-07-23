import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import HashRouter from "react-router-dom/HashRouter";
import Web3ProviderNew from "./containers/Web3Provider";

ReactDOM.render(
    <Provider store={configureStore}>
        <HashRouter>
            <Web3ProviderNew>
                <App/>
            </Web3ProviderNew>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
