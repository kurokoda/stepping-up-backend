const PAGES = {
  APPLICATION: {
    HOME : {
      key  : 'HOME',
      label: 'home',
      route: '/',
    },
    ABOUT: {
      key  : 'ABOUT',
      label: 'about',
      route: '/about',
    },
  },
  USER       : {
    LOGIN         : {
      key  : 'LOGIN',
      label: 'login',
      route: '/login',
    },
    LOGOUT        : {
      key  : 'LOGOUT',
      label: 'logout',
      route: '/logout',
    },
    RESET_PASSWORD: {
      key  : 'RESET_PASSWORD',
      label: 'reset password',
      route: '/reset-password',
    },
    SIGNUP        : {
      key  : 'SIGNUP',
      label: 'sign up',
      route: '/signup',
    },
    PROFILE       : {
      key  : 'PROFILE',
      label: 'profile',
      route: '/profile',
    },
  },
};

PAGES.ALL = {
  APPLICATION: [
    PAGES.APPLICATION.HOME,
    PAGES.APPLICATION.ABOUT,
  ],
  USER       : [
    PAGES.USER.LOGIN,
    PAGES.USER.LOGOUT,
    PAGES.USER.RESET_PASSWORD,
    PAGES.USER.SIGNUP,
    PAGES.USER.PROFILE,
  ]
}

export default PAGES;
