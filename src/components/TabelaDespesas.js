import React from 'react';
import { connect } from 'react-redux';
import FormDespesas from './FormDespesas';

class TabelaDespesas extends React.Component {
  getNameCurrency(item) {
    return item.exchangeRates[item.currency].name;
  }

  getValueConvert(item) {
    return (parseFloat(item.value)
      * parseFloat(item.exchangeRates[item.currency].ask)
    ).toFixed(2);
  }

  render() {
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
              <tr>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{this.getNameCurrency(expense)}</td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>{this.getValueConvert(expense)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
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
