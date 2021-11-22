import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormDespesas from './FormDespesas';
import { deleteExpense, selectEditExpense } from '../actions/wallet';

class TabelaDespesas extends React.Component {
  getNameCurrency(item) {
    if (!item) return '';
    return item.exchangeRates[item.currency].name.split('/')[0];
  }

  getValueConvert(item) {
    if (!item) return '';
    return (parseFloat(item.value)
      * parseFloat(item.exchangeRates[item.currency].ask)
    ).toFixed(2);
  }

  getCambio(item) {
    if (!item) return '';
    return parseFloat(item.exchangeRates[item.currency].ask)
      .toFixed(2);
  }

  deleteExpensehandle(expense) {
    const { dispatch } = this.props;
    dispatch(deleteExpense({ expense }));
  }

  editExpensehandle(expense) {
    const { dispatch } = this.props;
    dispatch(selectEditExpense({ expense }));
  }

  render() {
    const { wallet } = this.props;
    return (
      <>
        <section
          className={
            wallet.isEdit
              ? 'bg-success text-dark'
              : 'bg-dark text-light'
          }
        >
          <FormDespesas />
        </section>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {wallet.expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{this.getNameCurrency(expense)}</td>
                <td>
                  {this.getCambio(expense)}
                </td>
                <td>{this.getValueConvert(expense)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="btn btn-warning me-1"
                    onClick={ () => this.editExpensehandle(expense) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="btn btn-danger"
                    onClick={ () => this.deleteExpensehandle(expense) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    wallet: state.wallet,
  };
}

TabelaDespesas.propTypes = {
  wallet: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func.isRequired,
};

TabelaDespesas.defaultProps = {
  wallet: {},
};

export default connect(mapStateToProps)(TabelaDespesas);
