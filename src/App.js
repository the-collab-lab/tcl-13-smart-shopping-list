import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routing/Router';
import ListContextProvider from './context/ListContext';

import {
  ChakraProvider,
  extendTheme,
  Heading,
  Center,
  Box,
} from '@chakra-ui/react';

import smartListTheme from './style/smartListTheme';

function App() {
  return (
    <ChakraProvider theme={smartListTheme}>
      <BrowserRouter>
        <ListContextProvider>

          <header>
            <Heading as="h1" textStyle="h1">
              <Box as="span" fontWeight="semiBold">
                Smart
              </Box>
              <Box as="span" fontWeight="normal">
                List
              </Box>
            </Heading>
          </header>

          <Router />

        </ListContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
