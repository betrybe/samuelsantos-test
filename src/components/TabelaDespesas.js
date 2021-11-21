import React from 'react';
import { connect } from 'react-redux';
import FormDespesas from './FormDespesas';
import { deleteExpense } from '../actions/wallet';

class TabelaDespesas extends React.Component {
  getNameCurrency(item) {
    if (!item) return '';
    return item.exchangeRates[item.currency].name;
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
    this.props.dispatch(deleteExpense({ expense }));
  }

  render() {
    console.log(this.props.wallet)
    return (
      <>
        <section>
          <FormDespesas />
        </section>
        <table>
          <thead>
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
            {this.props.wallet.expenses.map((expense) => (
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
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
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

export default connect(mapStateToProps)(TabelaDespesas);
