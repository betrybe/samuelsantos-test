import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loggin from '../actions/user';
import './Login.css';

const LIMIT = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { emailErro: true, passwordErro: true };
    this.emailRef = React.createRef();

    this.handleClickSubmitLogin = this.handleClickSubmitLogin.bind(this);
    this.handleValidateEmailKeyUp = this.handleValidateEmailKeyUp.bind(this);
    this.handleValidatePasswordKeyUp = this.handleValidatePasswordKeyUp.bind(this);
  }

  checkFormatEmail(value) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  }

  checkForSubmit() {
    const { emailErro, passwordErro } = this.state;
    return !emailErro && !passwordErro;
  }

  handleClickSubmitLogin(event) {
    const { dispatch } = this.props;
    event.preventDefault();
    if (this.checkForSubmit()) dispatch(loggin({ email: this.emailRef.current.value }));
  }

  handleValidateEmailKeyUp(event) {
    this.setState({
      emailErro: !this.checkFormatEmail(event.target.value || ''),
    });
    return event;
  }

  handleValidatePasswordKeyUp(event) {
    this.setState({
      passwordErro: event.target.value.length < LIMIT,
    });
    return event;
  }

  render() {
    const { emailErro, passwordErro } = this.state;
    const { email } = this.props;
    if (email) return (<Redirect to={ { pathname: '/carteira' } } />);
    return (
      <div
        className={ [
          'container',
          'divLogin',
        ].join(' ') }
      >
        <h1>
          <img
            src="./trybeLogo.png"
            alt="Logo"
            className="imgLogin"
          />
          Wallet
        </h1>
        <form onSubmit={ (e) => this.handleClickSubmitLogin(e) }>
          <div>
            <input
              className="form-control"
              type="email"
              placeholder="E-mail"
              ref={ this.emailRef }
              onKeyUp={ (e) => this.handleValidateEmailKeyUp(e) }
              id="email"
              data-testid="email-input"
            />
          </div>
          <div>
            <input
              className="form-control mt-2"
              type="password"
              placeholder="Senha"
              onKeyUp={ (e) => this.handleValidatePasswordKeyUp(e) }
              id="password"
              data-testid="password-input"
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-success form-control"
              disabled={ emailErro || passwordErro }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

Login.defaultProps = {
  email: '',
};

function mapStateToProps(state) {
  return {
    email: state.user.email,
  };
}

export default connect(mapStateToProps)(Login);
