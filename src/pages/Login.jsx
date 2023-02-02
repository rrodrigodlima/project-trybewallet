import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { getUser } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const minPasswordLength = 6;
      const { email, password } = this.state;
      const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      const isEmailValid = emailRegex.test(email);
      const isDisabled = !(isEmailValid && password.length >= minPasswordLength);
      this.setState({ isDisabled });
    });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    dispatch(getUser(email, password));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <section>
        <h1>Login</h1>
        <div>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            id="email"
            required
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: func,
  history: shape({
    push: func,
  }),
}.isRequired;

export default connect()(Login);
