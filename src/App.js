import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Router from './components/Router';
import ListContextProvider from './context/ListContext';

function App() {
  return (
    <BrowserRouter>
      <ListContextProvider>
        <div className="App">
          <header className="App-header">
            <h1>Welcome to your Shopping List!</h1>
          </header>
          <Router />
          {/* Nav doesn't render unless there's a token in localStorage */}
          {localStorage.getItem('tcl13-token') && <Nav />}
        </div>
      </ListContextProvider>
    </BrowserRouter>
  );
}

export default App;
