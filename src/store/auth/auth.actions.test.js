import {
  uportLogin,
  logout,
  clearErrors,
  AUTH_USER,
  CLEAR_ERRORS,
  UPORT_LOGIN
} from './auth.actions';

describe('uportLogin', () => {
  it('should have the correct type', () => {
    const action = uportLogin();

    expect(action.type).toEqual(UPORT_LOGIN);
  });

  it('should have the correct payload', () => {
    const uportCreds = {
      name: 'John Smith'
    };
    const action = uportLogin(uportCreds);

    expect(action.payload).toEqual(uportCreds);
  });
});

describe('clearErrors', () => {
  it('should have the correct type', () => {
    const action = clearErrors();

    expect(action.type).toEqual(CLEAR_ERRORS);
  });
});

describe('logout', () => {
  let action;
  beforeEach(() => {
    action = logout();
  });

  it('should have the correct type', () => {
    expect(action.type).toEqual(AUTH_USER);
  });

  it('should have the correct payload', () => {
    expect(action.payload).toEqual({ isAuthenticated: false, user: {} });
  });
});

// TODO test for login action
