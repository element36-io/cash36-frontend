import React from 'react';

import { renderWithRedux } from '../../../helpers/tests.helpers';
import LoginForm from '../../../views/Login/LoginForm';

const props = {
  login: jest.fn(),
  creds: {
    address: '0x4f6f13571eb636915cde42f6101e59067bc98bcd',
    avatar: {
      uri:
        'https://ipfs.infura.io/ipfs/QmY4btiNiJwkBZb4KtqYCt2WjjW31VjBe7JhJ8Gf2v4QH7'
    },
    boxPub: '+mKhe2acG/ekkgvUXbz/vPMi+XrVX4v5TYCIvaHksXw=',
    did: 'did:ethr:0x89b5c95edf8aeca1366f83043e805aebe1992cce',
    id: '0x89b5c95edf8aeca1366f83043e805aebe1992cce',
    mnid: '2ok7qT3zyKJwfSKAnkzgYzhP7AEagRergEH',
    name: 'Tester Testerson',
    pushToken: '',
    username: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
  },
  useMetamask: false
};

test('renders the component', () => {
  const { getByText } = renderWithRedux(<LoginForm {...props} />);

  expect(getByText(/please, enter your password/i)).toBeInTheDocument();
  expect(
    getByText('0x89b5c95edf8aeca1366f83043e805aebe1992cce')
  ).toBeInTheDocument();
});
