import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListContext } from '../context/ListContext';
import { Link, Button, Box, Text, VStack } from '@chakra-ui/react';
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
          <VStack pos="absolute" left="50%" ml="-50px">
            <AddIcon
              w="50px"
              h="50px"
              bg="white"
              color="black"
              p="10px"
              borderRadius="xl"
            />
            <Text>Create New List</Text>
          </VStack>
        </Link>
      </Box>

      <Box borderTopRadius="3.5rem" bg="white">
        <p>Join an existing shopping list by entering a three word token</p>
        <form onSubmit={handleJoinList}>
          <label htmlFor="tokenField"> Share Token </label>
          <input
            className={error ? 'error' : ''}
            id="tokenField"
            placeholder="three word token"
            type="text"
            aria-label="Enter your three word token"
            value={userInputToken}
            onChange={handleChange}
          ></input>
          {errorMessage ? <p className="error">{errorMessage}</p> : null}
          <button type="submit">Join an existing list</button>
        </form>
      </Box>
    </Box>
  );
}
