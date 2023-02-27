import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, func } from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  handleEdit = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpense(expense));
  };

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
              expenses.map((expense) => {
                const { method, tag, currency, exchangeRates } = expense;
                const ask = Number(exchangeRates[currency].ask);
                const exchange = Number(ask * expense.value);
                const toFixed = Number(expense.value).toFixed(2);
                const tables = [expense.description, tag, method,
                  toFixed, currency, ask.toFixed(2), exchange.toFixed(2),
                  exchangeRates[currency].name];
                return (
                  <tr key={ expense.id }>
                    {tables.map((table) => (<td key={ table }>{table}</td>))}
                    <td>
                      <button
                        data-testid="edit-btn"
                        type="button"
                        onClick={ () => this.handleEdit(expense) }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.handleDelete(expense.id) }
                      >
                        Excluir
                      </button>
                    </td>
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

Table.propTypes = {
  expenses: arrayOf(shape()).isRequired,
  dispatch: func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
