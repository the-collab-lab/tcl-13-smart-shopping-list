import React, { useContext, useState } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';
import { Input, Button, Text, Box } from '@chakra-ui/react';

export default function NewList() {
  let currentList = useContext(ListContext);

  const [listName, setListName] = useState('');

  const newList = () => {
    // Saving randomly generated token to a variable
    const token = getToken();
    // Sending the token variable to local storage for use
    localStorage.setItem('tcl13-token', token);
    currentList.updateToken();
  };

  //TODO: save to db & then context for rendering in view list
  const handleChange = (event) => setListName(event.target.value);

  return (
    <Box textAlign="center">
      <Text htmlFor="newListName"> Enter New List Name</Text>
      <Input
        id="newListName"
        placeholder="List Name Here"
        type="text"
        value={listName}
        onChange={handleChange}
        variant="flushed"
        textAlign="center"
        my={10}
        p={4}
      />
      <Button onClick={newList} py="5px">
        <Link to="/view-list">Save New List</Link>
      </Button>
    </Box>
  );
}
