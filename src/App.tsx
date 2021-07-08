import React from 'react';
import './App.css';
import 'devextreme/dist/css/dx.light.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';

function App() {
  return (
    <Switch>
      <Route>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
