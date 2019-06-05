import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { MuiThemeProvider } from '@material-ui/core/styles';
import store from './store';
import theme from './config/theme';
import Web3ProviderNew from './components/Web3Provider';
import AvatarProvider from './providers/avatar.provider';

ReactDOM.render(
  <Provider store={store}>
    <Web3ProviderNew>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AvatarProvider>
            <App />
          </AvatarProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Web3ProviderNew>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
