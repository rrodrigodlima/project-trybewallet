import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Verifica o componente App.js', () => {
  it('Verifica se a página inicial contém os inputs de email e password', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    screen.getByTestId('email-input');
    screen.getByTestId('password-input');
    expect(history.location.pathname).toBe('/');
  });
  it('Verifica o button', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');
    fireEvent.change(emailInput, { target: { value: 'teste@gmail.com' } });
    expect(button).toBeDisabled();
    fireEvent.change(passInput, { target: { value: '123456' } });
    expect(button).toBeEnabled();
  });
});
