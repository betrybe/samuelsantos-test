import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-light bg-ligth">
        <h1 className="me-4">Trybe Wallet</h1>
        <div className="d-flex">
          <span className="me-2">
            <b>Email: </b>
            <span className="me-1" data-testid="email-field">
              { this.props.email || 'exemplo@email.com' }
            </span>
          </span>
          <span className="me-4">
            <b>Despesa Total: </b>
            R$
            <span className="me-1" data-testid="total-field">
              0.00
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
  };
}

export default connect(mapStateToProps)(Header);
