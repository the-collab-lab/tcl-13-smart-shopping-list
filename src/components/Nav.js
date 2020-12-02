import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ListContext } from '../context/ListContext';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Box,
  Heading,
  Flex,
  Spacer,
  HStack,
} from '@chakra-ui/react';

const Nav = () => {
  const listContext = useContext(ListContext);

  return (
    <Flex bg="b" px={10} bgImage="linear-gradient(to bottom,#76E4F7, #0092B0)">
      <Box w="100px"></Box>
      <Spacer />
      <Box bg="green.500">
        <Heading as="h1" d="inline-block" textStyle="h1">
          <Box as="span" fontWeight="semiBold">
            Smart
          </Box>
          <Box as="span" fontWeight="normal">
            List
          </Box>
        </Heading>
      </Box>
      <Spacer />
      {listContext.token ? <NavIcons /> : <Box w="100px" />}
    </Flex>
  );
};

const NavIcons = () => {
  return (
    <HStack w="100px">
      <NavLink to={'/add-items'}>
        <IconButton
          color="white"
          aria-label="add icon, takes to add items"
          fontSize="20px"
          bg="none"
          icon={<AddIcon />}
        ></IconButton>
      </NavLink>
      <NavLink to={'/view-list'}>
        <IconButton
          color="white"
          aria-label="hamburger icon, takes to list view"
          fontSize="20px"
          bg="none"
          icon={<HamburgerIcon />}
        ></IconButton>
      </NavLink>{' '}
    </HStack>
  );
};

export default Nav;
