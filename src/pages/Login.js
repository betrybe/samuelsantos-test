import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { loggin } from '../actions/user'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {emailErro:true,passwordErro:true};
    this.emailRef = React.createRef();
  }

  checkFormatEmail(value){
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  }

  checkForSubmit(){
    return !this.state.emailErro && !this.state.passwordErro;
  }

  handleClickSubmitLogin = (event) => {
    event.preventDefault();
    if(this.checkForSubmit)
      this.props.dispatch(loggin({email:this.emailRef.current.value}))
  }

  handleValidateEmailKeyUp = (event) => {
    this.setState({
      emailErro: !this.checkFormatEmail(event.target.value || '')
    });
    return event;
  }

  handleValidatePasswordKeyUp = (event) => {
    this.setState({
      passwordErro: event.target.value.length < 6
    });
    return event;
  }

  render() {
    if(this.props.email)
      return (<Redirect to={ { pathname: '/carteira'} } />);
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <form onSubmit={this.handleClickSubmitLogin}>
          <div>
            <input type="email" ref={this.emailRef} onKeyUp={this.handleValidateEmailKeyUp} id="email" data-testeid="email-input" />
          </div>
          <div>
            <input type="password" onKeyUp={this.handleValidatePasswordKeyUp} id="password" data-testeid="password-input" />
          </div>
          <div>
            <button type="submit" onClick={this.handleClickSubmitLogin} disabled={this.state.emailErro || this.state.passwordErro}>Entrar</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    email: state.user.email
  }
}

export default connect(mapStateToProps)(Login);
