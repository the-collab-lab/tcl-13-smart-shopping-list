import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import ViewList from './components/ViewList';
import AddItems from './components/AddItems';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Shopping!</h1>
      </header>
      <Switch>
        <Route exact path="/view-list" component={ViewList} />
        <Route path="/add-items" component={AddItems} />
      </Switch>
      <Nav />
    </div>
  );
}

export default App;
