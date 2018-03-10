import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {getDetainees} from '../../../shared/actions/detainees';


class DashboardContainer extends Component {

  componentWillMount() {
    this.props.getDetainees(this.onGetDetaineesSuccess.bind(this), this.onGetDetaineesError).bind(this);
  }

  onGetDetaineesSuccess() {
  };

  onGetDetaineesError() {
  };

  render() {
    if (!this.props.user) {
      return <Redirect to='/'/>;
    }
    if (!this.props.detainees) {
      return (
        <div/>
      );
    }
    else {
      const {Layout}    = this.props;
      const layoutProps = {
        detainees: this.props.detainees,
      };

      return (
        <Layout {...layoutProps}/>
      );
    }
  }
}

const mapStateToProps = state => ({
  user     : state.user,
  detainees: state.detainees,
});

const mapDispatchToProps = {
  getDetainees
};

DashboardContainer.propTypes = {
  'Layout': PropTypes.func.isRequired
};

DashboardContainer.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
