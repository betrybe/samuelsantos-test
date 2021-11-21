import React from 'react';
import { connect } from 'react-redux';
import { addMoedas } from '../actions/wallet';

const metodosDePagamento = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];

const tagsDespesa = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Transporte',
  'Saúde',
];

class FormDespesas extends React.Component {
  constructor(props) {
    super(props);
    this.getMoedasFromApI();
  }

  getMoedasFromApI() {
    fetch('https://economia.awesomeapi.com.br/json/all').then((response) => {
      response.json().then((results) => {
        const resultToArray = Object.keys(results);
        this.props.dispatch(addMoedas({ moedas: resultToArray.filter(
          (element) => element !== 'USDT' && element !== 'DOGE',
        ) }));
      });
    });
  }

  saveExpenseHandler(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.saveExpenseHandler}>
        <label htmlFor="valor">
          Valor:
          <input
            name="valor"
            id="valor"
            min="0.00"
            step="0.01"
            type="number"
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            name="descricao"
            id="descricao"
            min="0.00"
            step="0.01"
            type="text"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            name="moeda"
            id="moeda"
          >
            {this.props.moedas.map(
              (moedas) => <option key={ moedas }>{moedas}</option>,
            )}
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de pagamento:
          <select
            name="pagamento"
            id="pagamento"
          >
            {metodosDePagamento.map(
              (pagemento) => <option key={ pagemento }>{pagemento}</option>,
            )}
          </select>
        </label>
        <label htmlFor="tag-despesa">
          Tag:
          <select
            name="tag-despesa"
            id="tag-despesa"
          >
            {tagsDespesa.map(
              (tag) => <option key={ tag }>{ tag }</option>,
            )}
          </select>
        </label>
        <button type="submit" className="btn btn-success">
          Adicionar despesa
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    moedas: state.wallet.currencies,
  };
}

export default connect(mapStateToProps)(FormDespesas);
