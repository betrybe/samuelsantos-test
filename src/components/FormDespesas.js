import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMoeda, fetchCurrencies } from '../actions/wallet';

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
    this.saveExpenseHandler = this.saveExpenseHandler.bind(this);
  }

  componentDidUpdate() {

  }

  getSnapshotBeforeUpdate() {
    this.populeInputsEdit();
    return this.state;
  }

  getDefaultStateLocal() {
    return {
      expenseId: '',
      expenseValue: '0.00',
      expenseDescription: '',
      expenseCurrency: 'USD',
      expenseMethod: 'Dinheiro',
      expenseTag: 'Alimentação',
    };
  }

  getMoedasFromApI() {
    const { dispatch } = this.props;
    dispatch(fetchMoeda());
  }

  saveExpenseHandler(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { currentExpenseEdit } = this.props;
    const expense = {
      id: this.idRef.current.value,
      value: this.valorRef.current.value,
      description: this.descricaoRef.current.value,
      currency: this.moedaRef.current.value,
      method: this.pagamentoRef.current.value,
      tag: this.tagRef.current.value,
      exchangeRates: currentExpenseEdit ? currentExpenseEdit.exchangeRates : null,
    };
    dispatch(fetchCurrencies({ expense }));
    this.setState({ ...this.getDefaultStateLocal() });
    return true;
  }

  populeInputsEdit() {
    const { isEdit, currentExpenseEdit } = this.props;
    if (isEdit && this.idRef.current.value.length < 1 && currentExpenseEdit) {
      this.setState({
        expenseId: currentExpenseEdit.id,
        expenseValue: currentExpenseEdit.value || '0.00',
        expenseDescription: currentExpenseEdit.description,
        expenseCurrency: currentExpenseEdit.currency,
        expenseMethod: currentExpenseEdit.method,
        expenseTag: currentExpenseEdit.tag,
      });
    }
  }

  render() {
    const {
      expenseId,
      expenseValue,
      expenseDescription,
      expenseCurrency,
      expenseMethod,
      expenseTag,
    } = this.state;

    const { isEdit, moedas } = this.props;
    return (
      <form
        className="row"
        onSubmit={ (e) => this.saveExpenseHandler(e) }
      >
        <input
          type="hidden"
          name="id"
          data-testid="id-input"
          ref={ this.idRef }
          value={ expenseId }
          onChange={ (e) => this.setState({ expenseId: e.target.value }) }
        />
        <label htmlFor="valor" className="col">
          Valor:
          <input
            className="form-control"
            name="valor"
            id="valor"
            min="0.00"
            step="0.01"
            data-testid="value-input"
            value={ expenseValue || '' }
            onChange={ (e) => this.setState({ expenseValue: e.target.value }) }
            type="number"
            ref={ this.valorRef }
          />
        </label>
        <label htmlFor="descricao" className="col">
          Descrição:
          <input
            name="descricao"
            className="form-control"
            id="descricao"
            min="0.00"
            step="0.01"
            type="text"
            data-testid="description-input"
            value={ expenseDescription }
            onChange={ (e) => this.setState({ expenseDescription: e.target.value }) }
            ref={ this.descricaoRef }
          />
        </label>
        <label htmlFor="moeda" className="col">
          Moeda:
          <select
            name="moeda"
            id="moeda"
            className="form-control"
            data-testid="currency-input"
            value={ expenseCurrency }
            onChange={ (e) => this.setState({ expenseCurrency: e.target.value }) }
            ref={ this.moedaRef }
          >
            { moedas.map(
              (moeda) => <option key={ moeda }>{moeda}</option>,
            )}
          </select>
        </label>
        <label htmlFor="pagamento" className="col">
          Método de pagamento:
          <select
            name="pagamento"
            id="pagamento"
            className="form-control"
            data-testid="method-input"
            ref={ this.pagamentoRef }
            value={ expenseMethod }
            onChange={ (e) => this.setState({ expenseMethod: e.target.value }) }
          >
            {metodosDePagamento.map(
              (pagemento) => <option key={ pagemento }>{pagemento}</option>,
            )}
          </select>
        </label>
        <label htmlFor="tag-despesa" className="col">
          Tag:
          <select
            className="form-control"
            name="tag-despesa"
            id="tag-despesa"
            data-testid="tag-input"
            ref={ this.tagRef }
            value={ expenseTag }
            onChange={ (e) => this.setState({ expenseTag: e.target.value }) }
          >
            {tagsDespesa.map(
              (tag) => <option key={ tag }>{ tag }</option>,
            )}
          </select>
        </label>
        <button
          type="submit"
          className={
            isEdit
              ? 'btn btn-dark col addEdit'
              : 'btn btn-primary col addEdit'
          }
        >
          { isEdit ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    moedas: state.wallet.currencies,
    isEdit: state.wallet.isEdit,
    currentExpenseEdit: state.wallet.currentExpenseEdit,
  };
}

FormDespesas.propTypes = {
  dispatch: PropTypes.func.isRequired,
  moedas: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  isEdit: PropTypes.bool,
  currentExpenseEdit: PropTypes.objectOf(PropTypes.any),
};

FormDespesas.defaultProps = {
  currentExpenseEdit: {},
  moedas: [],
  isEdit: false,
};

export default connect(mapStateToProps)(FormDespesas);
