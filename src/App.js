import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Nav from './components/Nav';
import Router from './components/Router';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to your Shopping List!</h1>
        </header>
        <Router />
        <Nav />
      </div>
    </BrowserRouter>
  );
}

export default App;
