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
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
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
    <Box bg="brand.600">
      <Box textStyle="roundedCorners">
        <Link as={RouterLink} to="/new-list">
          <AddIcon textStyle="AddIcon" />
          <Text>Create New List</Text>
        </Link>

        <Text my="3%"> - or - </Text>

        <Text>
          Join an existing shopping list by entering a three word token
        </Text>

        <FormControl>
          <form onSubmit={handleJoinList}>
            <VStack spacing="3%">
              <VisuallyHidden>
                <FormLabel htmlFor="tokenField"> Enter Token </FormLabel>
              </VisuallyHidden>
              <Input
                variant="flushed"
                w="30%"
                textAlign="center"
                textStyle={error ? 'error' : ''}
                id="tokenField"
                placeholder="Three Word Token"
                type="text"
                aria-label="Enter your three word token"
                value={userInputToken}
                onChange={handleChange}
              />
              {errorMessage ? (
                <Center>
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Token is not valid.</AlertTitle>
                    <AlertDescription>
                      Please try again or create a new list.
                    </AlertDescription>
                  </Alert>
                </Center>
              ) : null}
              <Button type="submit">Join List</Button>
            </VStack>
          </form>
        </FormControl>
      </Box>
    </Box>
  );
}
