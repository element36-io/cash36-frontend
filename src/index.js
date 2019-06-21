import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import store from './store';
import theme from './config/theme';
import Web3Provider from './providers/web3.provider';
import AvatarProvider from './providers/avatar.provider';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
