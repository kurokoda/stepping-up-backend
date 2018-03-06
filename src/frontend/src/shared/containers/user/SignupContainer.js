import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signup} from '../../actions/user';

class SignupContainer extends Component {
  render() {
    const {Layout} = this.props;
    const props    = {
      onSubmit: this.onSubmit.bind(this),
    };

    return (
      <Layout {...props}/>
    );
  }

  onSubmit(formData) {
    console.log(formData);
    this.props.signup(formData)
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {signup};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);

mapDispatchToProps.propTypes = {
  'Layout': PropTypes.func.isRequired,
  'signup': PropTypes.func.isRequired,
};

mapDispatchToProps.defaultProps = {};
