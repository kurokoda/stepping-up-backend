import {css, StyleSheet} from 'aphrodite';
import update from 'immutability-helper';
import _ from 'lodash';
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {PasswordInput, TextInput} from '../../../../../shared/components/inputs';
import Validation from '../../../../../shared/validation';
import {minLength, mustMatch, required} from '../../../../../shared/validation/rules';

class SignupView extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange     = this.onChange.bind(this);

    this.fieldValidations = [
      Validation.set('username', 'Username', required, minLength(3)),
      Validation.set('email', 'Email', required, minLength(3)),
      Validation.set('password', 'Password', required),
      Validation.set('passwordConfirm', 'Password Confirm', required, mustMatch('password', 'Password'))
    ];

    this.state = {
      showErrors      : false,
      validationErrors: {},
      username        : 'indigo',
      email           : 'indigo.personal@gmail.com',
      password        : 'hope23AP',
      passwordConfirm : 'hope23AP',
    };
  }

  componentWillMount() {
    this.setState({
      validationErrors: Validation.run(this.state, this.fieldValidations)
    });
  }

  render() {
    return (
      <div className={`${css(styles.container)} container`}>
        <form className={css(styles.content)} onSubmit={this.handleSubmit}>
          <TextInput value={this.state.username}
                     onChange={this.onChange}
                     showError={this.state.showErrors}
                     errorText={this.getErrorFor('username')}
                     label='Username'
                     id='username'/>
          <TextInput value={this.state.email}
                     onChange={this.onChange}
                     showError={this.state.showErrors}
                     errorText={this.getErrorFor('email')}
                     label='Email'
                     id='email'/>
          <PasswordInput value={this.state.password}
                         onChange={this.onChange}
                         showError={this.state.showErrors}
                         errorText={this.getErrorFor('password')}
                         label='Password'
                         id='password'/>
          <PasswordInput value={this.state.passwordConfirm}
                         onChange={this.onChange}
                         showError={this.state.showErrors}
                         errorText={this.getErrorFor('passwordConfirm')}
                         label='Confirm Password'
                         id='passwordConfirm'/>
          <p>
            <Button
              className="btn-block"
              bsStyle='success'
              type='submit'>
              SIGN UP
            </Button>
          </p>
        </form>
      </div>
    );
  }

  getErrorFor(field) {
    return this.state.validationErrors[field];
  }

  onChange(event) {
    event.preventDefault();
    let newState              = update(this.state, {
      [event.target.id]: {$set: event.target.value}
    });
    newState.validationErrors = Validation.run(newState, this.fieldValidations);
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({showErrors: true});
    if (!_.isEmpty(this.state.validationErrors)) return null;
    this.props.onSubmit(
      {
        username: this.state.username,
        email   : this.state.email,
        password: this.state.password
      }
    );
  }
}

SignupView.propTypes = {};

SignupView.defaultProps = {};

// Styles -------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    textAlign     : 'center',
    height        : '100vh',
  },
  content  : {
    width: '320px'
  },
});

export default withRouter(SignupView);

