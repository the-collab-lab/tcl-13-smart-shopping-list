import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Router from './components/Router';
import ListContextProvider from './context/ListContext';

function App() {
  // ADD ITEMS - pass this method to nested components to allow updating of item list
  const itemAddedHandler = (newItem) => {
    // setUserList([...userList, newItem]);
  };

  // SET TOKEN - pass this method to nested components to set token to state
  const tokenCreatedHandler = (newToken) => {
    //setToken(newToken);
  };

  return (
    <BrowserRouter>
      <ListContextProvider>
        <div className="App">
          <header className="App-header">
            <h1>Welcome to your Shopping List!</h1>
          </header>
          <Router
            itemAddedHandler={itemAddedHandler}
            tokenCreatedHandler={tokenCreatedHandler}
          />
          <Nav />
        </div>
      </ListContextProvider>
    </BrowserRouter>
  );
}

export default App;
