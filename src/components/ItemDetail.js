import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { useParams, Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { IconButton, SimpleGrid, Box, Text, Center } from '@chakra-ui/react';

export default function ItemDetail() {
  let currentList = useContext(ListContext);

  let { id } = useParams();

  let currentItem = currentList.userList.find((item) => item.id == id);

  // determine number of days since last purchase date
  const timeNow = new Date().getTime() / 1000;
  let timeSinceLastPurchase;
  // if lastPurchased dosen't exist, set daysUntilPurchase = today-date created
  if (currentItem.lastPurchased) {
    timeSinceLastPurchase = Math.ceil(
      (timeNow - currentItem.lastPurchased.seconds) / (24 * 60 * 60),
    );
  } else {
    timeSinceLastPurchase = 'N/A';
  }

  return (
    <Box bg="brand.600">
      <Box textStyle="roundedCorners" p="24px">
        <Link to={'/view-list'}>
          <IconButton
            py="24px"
            color="white"
            colorScheme="cyan"
            aria-label="back arrow, return to list view"
            fontSize="20px"
            icon={<ArrowBackIcon />}
          ></IconButton>
        </Link>

        <Text textStyle="h2" py="24px">
          {currentItem.itemName}
        </Text>
        <Center>
          <SimpleGrid columns={1} spacing={10} w="50%">
            <Box bg="gray.200" p={8} rounded="xl">
              Days Since Last Purchased: {timeSinceLastPurchase}
            </Box>
            <Box bg="gray.200" p={8} rounded="xl">
              Estimated Days Until Next Purchase:{' '}
              {currentItem.daysUntilPurchase}
            </Box>
            <Box bg="gray.200" p={8} rounded="xl">
              Number of Purchases: {currentItem.numberOfPurchases}
            </Box>
          </SimpleGrid>
        </Center>
      </Box>
    </Box>
  );
}
