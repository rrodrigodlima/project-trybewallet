import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, func, bool } from 'prop-types';
import { addExpenses, editSavedExpense, getWallet } from '../redux/actions';

const getCurrency = async () => {
  const API_URL = 'https://economia.awesomeapi.com.br/json/all';
  const currencies = await fetch(API_URL);
  const results = await currencies.json();
  const filterCurrency = Object.entries(results).filter(([key]) => key !== 'USDT');
  const data = Object.fromEntries(filterCurrency);
  return data;
};

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const currency = await getCurrency();
    dispatch(getWallet(currency));
  }

  componentDidUpdate() {
    const { editExpense, editor } = this.props;
    const { id } = this.state;
    if (editor && id !== editExpense.id) {
      this.setState({
        value: editExpense.value,
        description: editExpense.description,
        currency: editExpense.currency,
        method: editExpense.method,
        tag: editExpense.tag,
        id: editExpense.id,
        exchangeRates: editExpense.exchangeRates,
      });
    }
  }

  handleExpenses = () => {
    const { dispatch } = this.props;
    dispatch(editSavedExpense(this.state));
    this.setState({ value: '', description: '' });
  };

  clearInput = () => {
    this.setState({
      value: '',
      description: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { id } = this.state;
    const { dispatch } = this.props;
    dispatch(addExpenses({ ...this.state }));
    this.setState({
      id: id + 1,
    });
    this.clearInput();
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies, expense, editor } = this.props;
    return (
      <form name="WalletForm">

        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((coin, index) => (
              <option
                key={ index }
                value={ expense[currencies[index]] }
              >
                { coin }
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Metodo de pagamento:
          <select
            name="method"
            id="payment-method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Despesa:
          <select
            name="tag"
            id="expense-category"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ editor ? this.handleExpenses : this.handleClick }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expense: state.wallet.expenses,
  editor: state.wallet.editor,
  editExpense: state.wallet.editExpense,
});

WalletForm.propTypes = {
  currencies: arrayOf(string),
  dispatch: func,
  editor: bool,
  editExpense: arrayOf(string),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
