import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    const totalSum = expenses.reduce((acc, curr) => {
      const { value, exchangeRates, currency } = curr;
      const { ask } = exchangeRates[currency];
      return acc + (value * ask);
    }, 0);
    return totalSum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">
          {this.sumExpenses()}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: string.isRequired,
  expenses: arrayOf(shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
