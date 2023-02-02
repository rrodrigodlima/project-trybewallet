import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import wallet from './redux/reducers/wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ wallet } />
    </Switch>
  );
}

export default App;
