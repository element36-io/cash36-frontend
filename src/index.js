import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.scss';
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

ReactDOM.render(
  <Provider store={store}>
    <Web3Provider>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AvatarProvider>
            <App />
          </AvatarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Web3Provider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
