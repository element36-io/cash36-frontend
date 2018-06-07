import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import HashRouter from "react-router-dom/HashRouter";

ReactDOM.render(
    <Provider store={configureStore}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
