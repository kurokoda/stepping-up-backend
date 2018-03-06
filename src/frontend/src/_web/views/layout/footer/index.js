import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

const Footer = ({...props}) => {

  // React -------------------------------------------------------------

  return (
    <footer id='footer' style={styles.container}/>
  );
}

// Props -------------------------------------------------------------

Footer.propTypes = {};

Footer.defaultProps = {};

// Exports -------------------------------------------------------------

export default withRouter(Footer);

// Styles -------------------------------------------------------------

const styles = {
  container: {
    backgroundColor: 'black',
    height         : '40px',
  },
};
