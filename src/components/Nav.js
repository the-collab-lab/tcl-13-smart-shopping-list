import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ListContext } from '../context/ListContext';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Box, Heading } from '@chakra-ui/react';

const Nav = () => {
  const listContext = useContext(ListContext);

  return (
    <div>
      <nav>
        <Heading as="h1" textStyle="h1">
          <Box as="span" fontWeight="semiBold">
            Smart
          </Box>
          <Box as="span" fontWeight="normal">
            List
          </Box>
          {listContext.token ? (
            <Box as="span">
              <NavLink to={'/add-items'}>
                <IconButton
                  colorScheme="cyan"
                  aria-label="add icon, takes to add items"
                  fontSize="20px"
                  icon={<AddIcon />}
                ></IconButton>
              </NavLink>
              <NavLink to={'/view-list'}>
                <IconButton
                  colorScheme="cyan"
                  aria-label="hamburger icon, takes to list view"
                  fontSize="20px"
                  icon={<HamburgerIcon />}
                ></IconButton>
              </NavLink>{' '}
            </Box>
          ) : null}
        </Heading>
      </nav>
    </div>
  );
};

export default Nav;
