import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PAGES from '../../../../shared/constants/pages';

const UserLinks = ({...props}) => {

  // React -------------------------------------------------------------

  return (
    <section id='auth-links'>
      { props.user && (
        <div id='logged-in'>
          <Link
            key={PAGES.USER.LOGOUT.key}
            to={PAGES.USER.LOGOUT.route}
            style={styles.link}>
            {PAGES.USER.LOGOUT.label}
          </Link>
        </div>
      )}
      { !props.user && (
        <div id='logged-in'>
          <Link
            key={PAGES.USER.LOGIN.key}
            to={PAGES.USER.LOGIN.route}
            style={styles.link}>
            {PAGES.USER.LOGIN.label}
          </Link>
        </div>
      )}
    </section>
  );
}

// Props -------------------------------------------------------------

UserLinks.propTypes = {};

UserLinks.defaultProps = {};

// Exports -------------------------------------------------------------

export default withRouter(UserLinks);

// Styles -------------------------------------------------------------

const styles = {
  link: {
    color: 'white',
  },
};
