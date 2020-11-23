import React from 'react';
import { NavLink } from 'react-router-dom';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Box } from '@chakra-ui/react';

const Nav = () => {
  return (
    <Box textAlign="center">
      <nav>
        <NavLink to={'/add-items'}>
          <IconButton
            variant="outline"
            colorScheme="cyan"
            aria-label="add icon, takes to add items"
            fontSize="20px"
            icon={<AddIcon />}
          ></IconButton>
        </NavLink>
        <NavLink to={'/view-list'}>
          <IconButton
            variant="outline"
            colorScheme="cyan"
            aria-label="hamburger icon, takes to list view"
            fontSize="20px"
            icon={<HamburgerIcon />}
          ></IconButton>
        </NavLink>
      </nav>
    </Box>
  );
};

export default Nav;
