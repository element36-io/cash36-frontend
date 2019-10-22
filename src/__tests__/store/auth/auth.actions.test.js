import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import {
  AUTH_USER,
  GET_USER_INFO,
  GET_CURRENT_KYC_STEP,
  CONFIRM_ATTESTATION
} from '../../../store/auth/auth.types';

import {
  checkUserId,
  logout,
  getUserInfo,
  getCurrentKycStep,
  startKycProcess,
  updateKycStep,
  register,
  login,
  confirmAttestation
} from '../../../store/auth/auth.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('calls checkUserId', async () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: '1' }));

  await checkUserId();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);

  mockAxios.get.mockRestore();
});

test('dispatches logout', () => {
  const action = logout();

  expect(action).toEqual({
    type: AUTH_USER,
    payload: { isAuthenticated: false, user: null }
  });
});

test('dispatches getUserInfo success', async () => {
  const userInfo = { firstName: 'John' };
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: userInfo })
  );

  const store = mockStore();

  const expectedActions = [
    {
      type: GET_USER_INFO,
      payload: userInfo
    }
  ];

  await store.dispatch(getUserInfo());

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  mockAxios.get.mockRestore();
});

test('dispatches getCurrentKycStep', async () => {
  const data = {
    result: 'START'
  };

  mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data }));

  const store = mockStore();

  const expectedActions = [
    {
      type: GET_CURRENT_KYC_STEP,
      payload: data.result
    }
  ];

  await store.dispatch(getCurrentKycStep());

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  mockAxios.get.mockRestore();
});

test('dispatches startKycProcess', async () => {
  mockAxios.post.mockImplementationOnce(() => Promise.resolve());
  mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: 'data'
    })
  );

  const store = mockStore();

  await store.dispatch(startKycProcess());

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledTimes(2);
  mockAxios.post.mockRestore();
  mockAxios.get.mockRestore();
});

test('dispatches updateKycStep', async () => {
  mockAxios.post.mockImplementationOnce(() => Promise.resolve());
  mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: 'data'
    })
  );

  const store = mockStore();

  await store.dispatch(updateKycStep());

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledTimes(2);
  mockAxios.post.mockRestore();
  mockAxios.get.mockRestore();
});

test('dispatches register', async () => {
  const username = 'test@test.com';
  const password = 'password';

  mockAxios.post.mockImplementation(() => Promise.resolve());

  const store = mockStore();

  await store.dispatch(register(username, password));

  expect(mockAxios.post).toHaveBeenCalledTimes(2);

  mockAxios.post.mockRestore();
});

test('dispatches login', async () => {
  const username = 'test@test.com';
  const password = 'password';
  const user = {
    username
  };

  mockAxios.post.mockImplementation(() =>
    Promise.resolve({
      data: 'data'
    })
  );
  mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: 'data'
    })
  );

  const store = mockStore();

  const expectedActions = [
    {
      type: AUTH_USER,
      payload: {
        isAuthenticated: true,
        user
      }
    }
  ];

  await store.dispatch(login(creds, useMetamask, password));

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  mockAxios.post.mockRestore();
  mockAxios.get.mockRestore();
});

test('dispatches confirmAttestation', () => {
  const action = confirmAttestation('attest1');

  expect(action).toEqual({
    type: CONFIRM_ATTESTATION,
    payload: 'attest1'
  });
});
