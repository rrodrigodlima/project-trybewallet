import React, { Component } from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>TrybeWallet</h1>
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
