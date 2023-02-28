import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import rootReducer from '../redux/reducers';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const initialStateAddExpenses = {
  user: {
    email: 'email@trybemail.com',
  },
  wallet: {
    currencies: [],
    expenses: [
      {
        id: 0,
        value: '10',
        description: 'Crypto',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: {
          USD: {
            ask: '5',
            name: 'Dolar Americano/Real Brasileiro',
          },
        },
      },
      {
        id: 1,
        value: '25',
        description: 'Uber',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Transporte',
        exchangeRates: {
          USD: {
            ask: '5',
            name: 'Dolar Americano/Real Brasileiro',
          },
        },
      },
    ],
    editor: false,
    editExpense: {
      id: 0,
    },
  },
};

describe('Tabela de Despesas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se a tabela de despesas é renderizada', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    const btnEdit = screen.queryAllByRole('cell', { name: /editar/i })[1].childNodes.item(0);
    const btnDelete = screen.queryAllByRole('cell', { name: /Excluir/i })[0].childNodes.item(1);
    const btnSave = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(btnEdit).toBeInTheDocument();
    expect(btnDelete).toBeInTheDocument();
    expect(btnSave).toBeInTheDocument();

    act(() => {
      userEvent.click(btnEdit);
    });

    expect(btnSave).toHaveTextContent(/Editar despesa/i);

    const { wallet } = store.getState();
    expect(wallet.editor).toBeTruthy();
    expect(wallet.editExpense.id).toBe(1);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencySelect = screen.getByTestId('currency-input');
    const methodSelect = screen.getByTestId('method-input');
    const tagSelect = screen.getByTestId('tag-input');

    expect(valueInput.value).toBe('25');
    expect(descriptionInput.value).toBe('Uber');
    expect(currencySelect.value).toBe('USD');
    expect(methodSelect.value).toBe('Dinheiro');
    expect(tagSelect.value).toBe('Transporte');

    userEvent.clear(valueInput);
    userEvent.type(valueInput, '30');
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, 'Mercado');
    userEvent.selectOptions(currencySelect, 'USD');
    userEvent.selectOptions(methodSelect, 'Cartão de crédito');
    userEvent.selectOptions(tagSelect, 'Alimentação');

    act(() => {
      userEvent.click(btnSave);
    });

    const { expenses } = store.getState().wallet;

    expect(expenses).toHaveLength(2);
    expect(expenses[1].value).toBe('30');
    expect(expenses[1].description).toBe('Mercado');
    expect(expenses[1].currency).toBe('USD');
    expect(expenses[1].method).toBe('Cartão de crédito');
    expect(expenses[1].tag).toBe('Alimentação');

    act(() => {
      userEvent.click(btnDelete);
    });

    expect(expenses).toHaveLength(2);
  });
});
