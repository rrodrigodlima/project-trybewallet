import { cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componemte Wallet.js', () => {
  afterEach(cleanup);
  it('Verifica se a página é redirecionada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
    expect(button).toBeDisabled();

    fireEvent.change(passInput, { target: { value: '123456' } });
    expect(button).toBeEnabled();
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
  it('Verifica os inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
    fireEvent.change(passInput, { target: { value: '123456' } });
    fireEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    const buttonDespesa = screen.getByText('Adicionar despesa');
    expect(buttonDespesa).toBeEnabled();

    const value = screen.getByTestId('value-input');
    expect(value).toBeInTheDocument();

    screen.getByTestId('description-input');
    screen.getByTestId('currency-input');
    screen.getByTestId('method-input');
    screen.getByTestId('tag-input');
  });
});
