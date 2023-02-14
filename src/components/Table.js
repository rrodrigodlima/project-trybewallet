/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const tableHeads = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    const { expenses } = this.props;
    return (
      <div>
        <h1>TABLE</h1>
        <table>
          <thead>
            <tr>
              {tableHeads.map((th, index) => <th key={ index }>{th}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense, index) => {
                const { method, tag, currency, exchangeRates } = expense;
                const ask = Number(exchangeRates[currency].ask);
                const exchange = Number(ask * expense.value);
                const toFixed = Number(expense.value).toFixed(2);
                const tables = [expense.description, tag, method,
                  toFixed, currency, ask.toFixed(2), exchange.toFixed(2),
                  exchangeRates[currency].name];
                return (
                  <tr key={ index }>
                    {tables.map((table) => (<td key={ table }>{table}</td>))}
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
