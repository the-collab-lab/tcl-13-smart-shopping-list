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
    <Box w="100%" bg="cyan.600">
      <Box h="30vh" pt="15vh">
        <Link color="white" as={RouterLink} to="/new-list">
          <VStack pos="absolute" left="50%" ml="-75px">
            <AddIcon
              w="50px"
              h="50px"
              bg="white"
              color="black"
              p="10px"
              borderRadius="xl"
            />
            <Text fontSize="xl">Create New List</Text>
          </VStack>
        </Link>
      </Box>

      <Box borderTopRadius="3.5rem" bg="white" fontSize="xl">
        <Text pt="5%">
          Join an existing shopping list by entering a three word token
        </Text>
        <FormControl onSubmit={handleJoinList}>
          <VStack spacing="3%">
            <VisuallyHidden>
              <FormLabel htmlFor="tokenField"> Enter Token </FormLabel>
            </VisuallyHidden>
            <Input
              w="30%"
              textAlign="center"
              border="none"
              borderBottom="1px black solid"
              borderRadius="none"
              className={error ? 'error' : ''}
              id="tokenField"
              placeholder="three word token"
              type="text"
              aria-label="Enter your three word token"
              value={userInputToken}
              onChange={handleChange}
            />
            {errorMessage ? <p className="error">{errorMessage}</p> : null}
            <Button
              borderRadius="3xl"
              bg="cyan.600"
              color="white"
              type="submit"
              px="45px"
              py="25px"
              fontSize="2xl"
            >
              Join List
            </Button>
          </VStack>
        </FormControl>
      </Box>
    </Box>
  );
}
