import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginComponent from '../../_web/views/pages/user/login';
import LogoutComponent from '../../_web/views/pages/user/logout';
import ProfileComponent from '../../_web/views/pages/user/profile';
import ResetPasswordComponent from '../../_web/views/pages/user/resetPassword';
import SignupComponent from '../../_web/views/pages/user/signup';
//
import PAGES from '../../shared/constants/pages';
//
import AboutContainer from '../../shared/containers/application/AboutContainer';
import HomeContainer from '../../shared/containers/application/HomeContainer';
import LoginContainer from '../../shared/containers/user/LoginContainer';
import LogoutContainer from '../../shared/containers/user/LogoutContainer';
import ProfileContainer from '../../shared/containers/user/ProfileContainer';
import ResetPasswordContainer from '../../shared/containers/user/ResetPasswordContainer';
import SignupContainer from '../../shared/containers/user/SignupContainer';
import AboutComponent from '../views/pages/application/about';
import HomeComponent from '../views/pages/application/home';

const Routes = () => (
  <Switch>
    <Route
      exact
      path={PAGES.APPLICATION.HOME.route}
      render={props => (
        <HomeContainer {...props} Layout={HomeComponent}/>
      )}
    />
    <Route
      path={PAGES.APPLICATION.ABOUT.route}
      render={props => (
        <AboutContainer {...props} Layout={AboutComponent}/>
      )}
    />
    <Route
      path={PAGES.USER.LOGIN.route}
      render={props => (
        <LoginContainer {...props} Layout={LoginComponent}/>
      )}
    />
    <Route
      path={PAGES.USER.LOGOUT.route}
      render={props => (
        <LogoutContainer {...props} Layout={LogoutComponent}/>
      )}
    />
    <Route
      path={PAGES.USER.SIGNUP.route}
      render={props => (
        <SignupContainer {...props} Layout={SignupComponent}/>
      )}
    />
    <Route
      path={PAGES.USER.RESET_PASSWORD.route}
      render={props => (
        <ResetPasswordContainer {...props} Layout={ResetPasswordComponent}/>
      )}
    />
    <Route
      path={PAGES.USER.PROFILE.route}
      render={props => (
        <ProfileContainer {...props} Layout={ProfileComponent}/>
      )}
    />
  </Switch>
);

export default Routes;
