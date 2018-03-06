import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PAGES from '../../../../shared/constants/pages';

class PageLinks extends Component {

  // React -------------------------------------------------------------

  render() {
    return (
      <section id='page-links'>
        {this.linkElements}
      </section>
    );
  }

  get linkElements() {
    return PAGES.ALL.APPLICATION.map((page) => {
      return <Link
        key={page.key}
        to={page.route}
        style={styles.link}>
        {page.label}
      </Link>
    })
  }
}

// Props -------------------------------------------------------------

PageLinks.propTypes = {};

PageLinks.defaultProps = {};

// Exports -------------------------------------------------------------

export default withRouter(PageLinks);

// Styles -------------------------------------------------------------

const styles = {
  link: {
    color: 'white',
  },
}
