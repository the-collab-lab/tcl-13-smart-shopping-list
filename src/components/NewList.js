import React, { useContext, useState } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';
import { Input, Button, Text, Box, VStack } from '@chakra-ui/react';

export default function NewList() {
  let currentList = useContext(ListContext);

  const [listName, setListName] = useState('');

  // CONTEXT FUCTION
  // generates random token, sets to local storage, updates context with token
  // saves list name to database, updates context with list name
  const newList = currentList.generateNewList;

  const handleChange = (event) => setListName(event.target.value);

  return (
    <Box textAlign="center" bg="brand.600">
      <VStack textStyle="roundedCorners">
        <Text py={10} htmlFor="newListName">
          {' '}
          Enter New List Name
        </Text>
        <Input
          id="newListName"
          placeholder="List Name Here"
          w="30%"
          type="text"
          value={listName}
          onChange={handleChange}
          variant="flushed"
          textAlign="center"
          my={10}
          p={4}
        />
        <Button onClick={() => newList(listName)} py="5px">
          <Link to="/view-list">Save New List</Link>
        </Button>
      </VStack>
    </Box>
  );
}
