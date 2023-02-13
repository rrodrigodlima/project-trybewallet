import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, func } from 'prop-types';
import { getWallet } from '../redux/actions';

const getCurrency = async () => {
  const API_URL = 'https://economia.awesomeapi.com.br/json/all';
  const currencies = await fetch(API_URL);
  const results = await currencies.json();
  const filterCurrency = Object.entries(results).filter(([key]) => key !== 'USDT');
  const data = Object.fromEntries(filterCurrency);
  return data;
};

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const currency = await getCurrency();
    dispatch(getWallet(currency));
  }

  render() {
    const { currencies, expenses } = this.props;
    return (
      <form name="WalletForm">

        <label htmlFor="value">
          Valor:
          <input
            name="value"
            type="number"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            type="text"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select name="currency" data-testid="currency-input">
            {currencies.map((currency, index) => (
              <option
                key={ index }
                value={ expenses[currencies[index]].ask }
              >
                { currency }
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Metodo de pagamento:
          <select
            name="method"
            data-testid="method-input"
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
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: arrayOf(string),
  dispatch: func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
