import config from '../../config';

const proxy = getProxy();

function getProxy() {
  switch (config.API_TYPE) {
    case 'firebase':
      return require('./firebase');
    case 'mongoose':
      return require('./mongoose');
    default :
    // Add error handling here
  }
}

// User

export const login         = proxy.login;
export const logout        = proxy.logout;
export const signup        = proxy.signup;
export const resetPassword = proxy.resetPassword;

export const ActionTypes = {
  USER_UPDATE: proxy.USER_UPDATE,
  USER_LOGIN: proxy.USER_LOGIN,
  USER_LOGOUT: proxy.USER_LOGOUT,
  USER_SIGNUP: proxy.USER_SIGNUP,
};

