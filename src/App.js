import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './routing/Router';
import ListContextProvider from './context/ListContext';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
}

export default App;
