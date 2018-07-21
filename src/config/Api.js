console.log(process.env.NODE_ENV);
console.log(process.env.REACT_ENV);

let url = 'http://localhost:8080';
if (process.env.NODE_ENV === 'staging'||process.env.REACT_ENV === 'staging') url = 'https://cash36-backend.herokuapp.com';
if (process.env.NODE_ENV === 'production'||process.env.REACT_ENV === 'production') url = 'https://cash36-test-backend.herokuapp.com';

export const API_ROOT = url;