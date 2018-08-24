import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
let apiEnv = env.REACT_APP_ENV;
console.log('Environment: '+ apiEnv);

let url = 'http://localhost:8080';
let web3NodeUrl = 'http://167.99.243.81:8866/';

if (apiEnv === 'staging') {
    url = 'http://cash36-backend.herokuapp.com';
    web3NodeUrl = 'http://167.99.243.81:8866/';
}
if (apiEnv === 'production') {
    url = 'https://cash36-test-backend.herokuapp.com';
    web3NodeUrl = 'https://rinkeby.infura.io/v3/4cf538c6b0bb4562bdc2f31430327c08';
}

export const API_ROOT = url;
export const WEB3_NODE = web3NodeUrl;