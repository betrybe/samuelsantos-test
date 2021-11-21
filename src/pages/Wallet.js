import React from 'react';
import Header from '../components/Header';
import TabelaDespesas from '../components/TabelaDespesas';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <TabelaDespesas />
      </>
    );
  }
}

export default Wallet;
