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
    this.state = this.getDefaultStateLocal();
  }

  getDefaultStateLocal() {
    return {
      edit:false,
      expenseId: '',
      expenseValue: 0,
      expenseDescription: '',
      expenseCurrency: 'USD',
      expenseMethod: 'Dinheiro',
      expenseTag: 'Alimentação',
    };
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
      id: this.idRef.current.value,
      value: this.valorRef.current.value,
      description: this.descricaoRef.current.value,
      currency: this.moedaRef.current.value,
      method: this.pagamentoRef.current.value,
      tag: this.tagRef.current.value,
      exchangeRates: this.props.currentExpenseEdit ? this.props.currentExpenseEdit.exchangeRates : null
    };
    this.props.dispatch(fetchCurrencies({expense}))
    this.setState({...this.getDefaultStateLocal()});
  }

  populeInputsEdit() {
    if(this.props.isEdit && this.idRef.current.value.length<1) {
      this.setState({
        expenseId: this.props.currentExpenseEdit.id,
        expenseValue: this.props.currentExpenseEdit.value,
        expenseDescription: this.props.currentExpenseEdit.description,
        expenseCurrency: this.props.currentExpenseEdit.currency,
        expenseMethod: this.props.currentExpenseEdit.method,
        expenseTag: this.props.currentExpenseEdit.tag,
        edit: true
      });
    }
  }
  componentDidUpdate() {
    if(!this.state.edit)
      this.populeInputsEdit();
  }

  render() {
    return (
      <form onSubmit={ this.saveExpenseHandler }>
        <input
          type="hidden"
          name="id"
          data-testid="id-input"
          ref={ this.idRef }
          value={this.state.expenseId}
          onChange={ (e) => this.setState({expenseId: e.target.value})}
        />
        <label htmlFor="valor">
          Valor:
          <input
            name="valor"
            id="valor"
            min="0.00"
            step="0.01"
            data-testid="value-input"
            value={this.state.expenseValue || ''}
            onChange={ (e) => this.setState({expenseValue: e.target.value})}
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
            data-testid="description-input"
            value={this.state.expenseDescription}
            onChange={ (e) => this.setState({expenseDescription: e.target.value})}
            ref={ this.descricaoRef }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            name="moeda"
            id="moeda"
            data-testid="currency-input"
            value={this.state.expenseCurrency}
            onChange={ (e) => this.setState({expenseCurrency: e.target.value})}
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
            data-testid="method-input"
            ref={ this.pagamentoRef }
            value={this.state.expenseMethod}
            onChange={ (e) => this.setState({expenseMethod: e.target.value})}
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
            data-testid="tag-input"
            ref={ this.tagRef }
            value={this.state.expenseTag}
            onChange={ (e) => this.setState({expenseTag: e.target.value})}
          >
            {tagsDespesa.map(
              (tag) => <option key={ tag }>{ tag }</option>,
            )}
          </select>
        </label>
        <button type="submit" className="btn btn-success">
          {this.props.isEdit ? 'Editar despesa' : 'Adicionar despesa' }
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
    currentExpenseEdit: state.wallet.currentExpenseEdit
  };
}

export default connect(mapStateToProps)(FormDespesas);
