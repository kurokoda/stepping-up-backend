import {CALL_API} from '../../middlewares/api';

export const USER_UPDATE = Symbol('USER_UPDATE');
export const USER_LOGIN  = Symbol('USER_LOGIN');
export const USER_LOGOUT = Symbol('USER_LOGOUT');
export const USER_SIGNUP = Symbol('USER_SIGNUP');

export function login(params, afterSuccess, afterError) {
  return {
    [CALL_API]: {
      method     : 'post',
      body       : params,
      path       : '/api/user/login',
      successType: USER_LOGIN,
      afterSuccess,
      afterError
    }
  };
}

export function logout(params, afterSuccess, afterError) {
  return {
    [CALL_API]: {
      method     : 'post',
      body       : params,
      path       : '/api/user/logout',
      successType: USER_LOGOUT,
      afterSuccess,
      afterError
    }
  };
}

export function signup(params, afterSuccess, afterError) {
  return {
    [CALL_API]: {
      method     : 'post',
      body       : params,
      path       : '/api/user/signup',
      successType: USER_LOGIN,
      afterSuccess,
      afterError
    }
  };
}
