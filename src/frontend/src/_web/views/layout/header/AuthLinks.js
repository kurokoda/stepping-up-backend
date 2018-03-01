import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PAGES from '../../../../shared/constants/pages';

class USERLinks extends Component {

  // Props -------------------------------------------------------------

  static propTypes = {};

  static defaultProps = {};

  // React -------------------------------------------------------------

  render() {
    return (
      <section>
        {this.linkElements}
      </section>
    );
  }

  get linkElements() {
    return PAGES.ALL.USER.map((page) => {
      return <Link
        key={page.key}
        to={page.route}
        style={styles.link}>
        {page.label}
      </Link>
    })
  }
}

// Exports -------------------------------------------------------------

export default withRouter(USERLinks);

// Styles -------------------------------------------------------------

const styles = {
  link: {
    color: 'white',
  },
}
