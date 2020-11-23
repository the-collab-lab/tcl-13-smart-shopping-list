import React from 'react';
import { NavLink } from 'react-router-dom';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Box } from '@chakra-ui/react';

const Nav = () => {
  return (
    <div>
      <Box textAlign="right">
        <nav>
          <NavLink to={'/add-items'}>
            <IconButton
              variant="outline"
              colorScheme="cyan"
              aria-label="back arrow, return to list view"
              fontSize="20px"
              icon={<AddIcon />}
            ></IconButton>
          </NavLink>
          <NavLink to={'/view-list'}>
            <IconButton
              variant="outline"
              colorScheme="cyan"
              aria-label="back arrow, return to list view"
              fontSize="20px"
              icon={<HamburgerIcon />}
            ></IconButton>
          </NavLink>
        </nav>
      </Box>
    </div>
  );
};

export default Nav;
