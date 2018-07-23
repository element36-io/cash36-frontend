import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
let apiEnv = env.REACT_APP_ENV;
console.log('Environment: '+ apiEnv);

let url = 'http://localhost:8080';
if (apiEnv === 'staging') url = 'https://cash36-backend.herokuapp.com';
if (apiEnv === 'production' || process.env.NODE_ENV === 'production') url = 'https://cash36-test-backend.herokuapp.com';

export const API_ROOT = url;