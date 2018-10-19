import React from 'react';
import CheckIcon from '@material-ui/icons/Check';

export default [
  {
    1: {
      className: '__active',
      children: ''
    },
    2: {
      className: null,
      children: '2'
    },
    3: {
      className: null,
      children: '3'
    }
  },
  {
    1: {
      className: '__complete',
      children: <CheckIcon />
    },
    2: {
      className: '__active',
      children: '2'
    },
    3: {
      className: null,
      children: '3'
    },
    spanClass: `buy-stepper__line--half`
  },
  {
    1: {
      className: '__complete',
      children: <CheckIcon />
    },
    2: {
      className: '__complete',
      children: <CheckIcon />
    },
    3: {
      className: '__active',
      children: '3'
    },
    spanClass: `buy-stepper__line--full`
  }
];
