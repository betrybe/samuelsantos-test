import React from 'react';
import { connect } from 'react-redux';
import {addMoedas, fetchCurrencies } from '../actions/wallet';

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
    this.idRef = React.createRef();
    this.valorRef = React.createRef();
    this.descricaoRef = React.createRef();
    this.moedaRef = React.createRef();
    this.pagamentoRef = React.createRef();
    this.tagRef = React.createRef();
    this.getMoedasFromApI();
  }

  getMoedasFromApI = () => {
    fetch('https://economia.awesomeapi.com.br/json/all').then((response) => {
      response.json().then((results) => {
        const resultToArray = Object.keys(results);
        this.props.dispatch(addMoedas({ moedas: resultToArray.filter(
          (element) => element !== 'USDT' && element !== 'DOGE',
        ) }));
      });
    });
  }

  saveExpenseHandler = (event) => {
    event.preventDefault();
    const expense = {
      id: null,
      value: this.valorRef.current.value,
      description: this.descricaoRef.current.value,
      currency: this.moedaRef.current.value,
      method: this.pagamentoRef.current.value,
      tag: this.tagRef.current.value,
    };
    this.props.dispatch(fetchCurrencies({expense}))
  }

  render() {
    return (
      <form onSubmit={ this.saveExpenseHandler }>
        <input
          type="hidden"
          name="id"
          ref={ this.idRef }
        />
        <label htmlFor="valor">
          Valor:
          <input
            name="valor"
            id="valor"
            min="0.00"
            step="0.01"
            type="number"
            ref={ this.valorRef }
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
            ref={ this.descricaoRef }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            name="moeda"
            id="moeda"
            ref={ this.moedaRef }
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
            ref={ this.pagamentoRef }
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
            ref={ this.tagRef }
          >
            {tagsDespesa.map(
              (tag) => <option key={ tag }>{ tag }</option>,
            )}
          </select>
        </label>
        <button type="submit" className="btn btn-success">
          {this.props.isEdit ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    moedas: state.wallet.currencies,
    expenses: state.wallet.expenses,
    isEdit: state.wallet.isEdit,
  };
}

export default connect(mapStateToProps)(FormDespesas);
