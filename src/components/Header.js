import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, valorTotal } = this.props;
    return (
      <header className="navbar navbar-light bg-light">
        <img
          src="./trybeLogo.png"
          alt="Logo"
          className="me-4 imgLogo"
        />
        <div className="d-flex">
          <span className="me-2">
            <b>Email: </b>
            <span className="me-1" data-testid="email-field">
              { email || 'exemplo@email.com' }
            </span>
          </span>
          <span className="me-4">
            <b>Despesa Total: </b>
            R$
            <span className="me-1" data-testid="total-field">
              { valorTotal || '0.00' }
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
    valorTotal: state.wallet.currentTotal,
  };
}

Header.propTypes = {
  email: PropTypes.string,
  valorTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Header.defaultProps = {
  email: 'exemplo@email.com',
  valorTotal: 0,
};

export default connect(mapStateToProps)(Header);
