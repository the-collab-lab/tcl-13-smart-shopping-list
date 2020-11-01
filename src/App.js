import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './routing/Router';
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
        </div>
      </ListContextProvider>
    </BrowserRouter>
  );
}

export default App;
