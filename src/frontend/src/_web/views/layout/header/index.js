import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthLinks from './AuthLinks';
import PageLinks from './PageLinks';

const Header = ({...props}) => {

  // React -------------------------------------------------------------

  return (
    <header id='header' style={styles.container}>
      <PageLinks/>
      <AuthLinks user={props.user}/>
    </header>
  );
}

// Props -------------------------------------------------------------

Header.propTypes = {};

Header.defaultProps = {};

// Exports -------------------------------------------------------------

export default withRouter(Header);

// Styles -------------------------------------------------------------

const styles = {
  container: {
    backgroundColor: 'black',
    height         : '80px',
  },
};
