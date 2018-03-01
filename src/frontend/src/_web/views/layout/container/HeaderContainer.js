import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Modal from '../../../../shared/components/modal';
import Header from '../header';

class HeaderContainer extends Component {

  // Props -------------------------------------------------------------

  static propTypes = {};

  static defaultProps = {};

  // React -------------------------------------------------------------

  render() {
    return (
      <section>
        <Modal config={this.props.app.get('modal')}/>
        <Header/>
        <div style={styles.container}>
          {this.props.children}
        </div>
      </section>
    );
  }
}

// Exports -------------------------------------------------------------

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default withRouter(connect(mapStateToProps, {})(HeaderContainer));

// Styles -------------------------------------------------------------

const styles = {
  container: {},
}
