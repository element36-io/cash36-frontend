import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
let apiEnv = env.REACT_APP_ENV;
console.log('Environment: '+ apiEnv);

let url = 'http://localhost:8080';
let web3NodeUrl = 'http://167.99.243.81:6688/';

if (apiEnv === 'staging') {
    url = 'http://cash36-backend.herokuapp.com';
    web3NodeUrl = 'https://167.99.243.81/eth';
}
if (apiEnv === 'production') {
    url = 'http://cash36-test-backend.herokuapp.com';
    web3NodeUrl = 'https://167.99.243.81/rinkeby';
}

export const API_ROOT = url;
export const WEB3_NODE = web3NodeUrl;