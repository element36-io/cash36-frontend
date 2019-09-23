import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import store from './store';
import theme from './config/theme';
import Web3Provider from './providers/web3.provider';
import AvatarProvider from './providers/avatar.provider';

import 'typeface-rubik';
import './styles/base.scss';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Provider store={store}>
      <Web3Provider>
        <ThemeProvider theme={theme}>
          <AvatarProvider>
            <App />
          </AvatarProvider>
        </ThemeProvider>
      </Web3Provider>
    </Provider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
);

registerServiceWorker();
