import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Router from './components/Router';
import Counter from '../src/components/counter';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to your Shopping List!</h1>
        </header>
        <Router />
        <Nav />
        <Counter />
      </div>
    </BrowserRouter>
  );
}

export default App;
