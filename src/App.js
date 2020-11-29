import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routing/Router';
import ListContextProvider from './context/ListContext';
import Nav from './components/Nav';

import { ChakraProvider, Heading, Box } from '@chakra-ui/react';

import smartListTheme from './style/smartListTheme';

function App() {
  return (
    <ChakraProvider theme={smartListTheme}>
      <BrowserRouter>
        <ListContextProvider>
          <Nav />
          <Router />
        </ListContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
