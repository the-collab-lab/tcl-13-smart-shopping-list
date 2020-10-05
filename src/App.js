import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import Nav from './components/Nav';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>We're working on it</p>
      </header>
      <Nav />
    </div>
  );
}

export default App;
