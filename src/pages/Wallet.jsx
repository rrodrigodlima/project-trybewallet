import React, { Component } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>TrybeWallet</h1>
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
