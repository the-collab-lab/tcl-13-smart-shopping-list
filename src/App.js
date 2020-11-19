import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routing/Router';
import ListContextProvider from './context/ListContext';
import { ChakraProvider, extendTheme, Heading, Center } from '@chakra-ui/react';

const theme = extendTheme();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ListContextProvider>
          <header>
            <Heading
              as="h1"
              bg="cyan.600"
              w="100%"
              color="white"
              align="center"
              h="10vh"
              pt="2vh"
            >
              Smart List
            </Heading>
          </header>
          <Center align="center" w="100%">
            <Router />
          </Center>
        </ListContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
