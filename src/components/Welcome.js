import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListContext } from '../context/ListContext';
import {
  Link,
  Button,
  Box,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  VisuallyHidden,
  Flex,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function Welcome() {
  const [userInputToken, setUserInputToken] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const currentList = useContext(ListContext);

  const handleChange = (e) => {
    setUserInputToken(e.target.value);
  };

  const handleJoinList = (e) => {
    e.preventDefault();
    currentList.itemsRef
      .where('userToken', '==', userInputToken)
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          setError(true);
          setErrorMessage('This token is not valid. Try again');
        } else {
          localStorage.setItem('tcl13-token', userInputToken);
          currentList.updateToken();
        }
      })
      .catch(function (error) {
        console.log('Error getting documents', error);
      });
  };

  return (
    <Box w="100%" bg="brand.600" textAlign="center">
      <Flex h="20vh" pt="5vh">
        <Link as={RouterLink} to="/new-list">
          <VStack pos="absolute" left="50%" ml="-75px">
            <AddIcon
              w="40px"
              h="40px"
              bg="white"
              color="brand.900"
              p="10px"
              borderRadius="xl"
            />
            <Text color="white" fontSize="xl">
              Create New List
            </Text>
          </VStack>
        </Link>
      </Flex>

      <Box borderTopRadius="3.5rem" bg="white">
        <Text pt="5%" fontSize="xl">
          Join an existing shopping list by entering a three word token
        </Text>
        <FormControl onSubmit={handleJoinList}>
          <VStack spacing="3%">
            <VisuallyHidden>
              <FormLabel htmlFor="tokenField"> Enter Token </FormLabel>
            </VisuallyHidden>
            <Input
              variant="flushed"
              w="30%"
              textAlign="center"
              className={error ? 'error' : ''}
              id="tokenField"
              placeholder="three word token"
              type="text"
              aria-label="Enter your three word token"
              value={userInputToken}
              onChange={handleChange}
            />
            {errorMessage ? <p className="error">{errorMessage}</p> : null}
            <Button>Join List</Button>
          </VStack>
        </FormControl>
      </Box>
    </Box>
  );
}
