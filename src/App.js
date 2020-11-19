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

//const theme = extendTheme();

function App() {
  return (
    <ChakraProvider theme={smartListTheme}>
      <BrowserRouter>
        <ListContextProvider>
          <header>
            <Heading
              as="h1"
              textStyle="h1"
              bg="brand.600"
              w="100%"
              align="center"
              h="10vh"
              pt="2vh"
            >
              <Box as="span" fontWeight="normal">
                Smart
              </Box>
              <Box as="span" fontWeight="light">
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
