import React, { useContext, useState, useEffect, useRef } from 'react';
import { ListContext } from '../context/ListContext';
import { Link as RouterLink } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';
import {
  Button,
  Box,
  Checkbox,
  Text,
  Input,
  VisuallyHidden,
  FormLabel,
  Link,
  List,
  ListItem,
  SimpleGrid,
  IconButton,
  UnorderedList,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import './ViewList.css';
import { jsx } from '@emotion/react';

const ViewList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  // If the list is empty, add a prompt and link to Add Items
  let currentList = useContext(ListContext);

  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleCheck = async (e) => {
    const timeNow = new Date().getTime() / 1000;
    // retrieve event information
    let docId = e.target.id;
    let currentRef = currentList.itemsRef.doc(docId);

    //find context for current item
    const currentItem = currentList.userList.find((item) => {
      return item.id == docId;
    });

    // store current item data
    const numberOfPurchases = currentItem.numberOfPurchases
      ? currentItem.numberOfPurchases + 1
      : 1;
    let lastEstimate = parseInt(currentItem.lastEstimate);
    let latestInterval;
    let lastPurchased;

    // if item has been purchased more than two times, calculate the last interval
    if (numberOfPurchases > 1) {
      lastPurchased = currentItem.lastPurchased.seconds;
      latestInterval = Math.ceil((timeNow - lastPurchased) / (24 * 60 * 60));
    } else {
      latestInterval = parseInt(currentItem.lastEstimate);
    }

    lastEstimate = calculateEstimate(
      lastEstimate,
      latestInterval,
      numberOfPurchases,
    );

    return currentRef
      .update({
        lastPurchased: new Date(),
        lastEstimate: lastEstimate,
        numberOfPurchases: numberOfPurchases,
      })
      .then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };

  const handleClearClick = () => {
    setFilterValue('');
  };

  useEffect(() => {
    const sortedList = currentList.userList.sort((a, b) => {
      if (a.daysUntilPurchase < b.daysUntilPurchase) {
        return -1;
      }
      if (a.daysUntilPurchase > b.daysUntilPurchase) {
        return 1;
      }
      if (a.daysUntilPurchase === b.daysUntilPurchase) {
        if (a.itemName < b.itemName) {
          return -1;
        } else {
          return 1;
        }
      }
    });
    setFilteredList(sortedList);
  }, [currentList.userList]);

  const handleSearchChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleDelete = (e) => {
    //if you confirm the delete dialogue than it will delete from the db
    currentList.itemsRef
      .doc(e.target.id)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  };

  useEffect(() => {
    let listFilter = currentList.userList;
    let filtered =
      listFilter &&
      listFilter.filter((item) => {
        return item.itemName.toLowerCase().includes(filterValue.toLowerCase());
      });
    setFilteredList(filtered);
  }, [filterValue]);

  return (
    <Box bg="brand.600">
      <Box textStyle="roundedCorners">
        <Text as="h2" textStyle="h2">
          List Name
        </Text>
        <VisuallyHidden>
          <FormLabel htmlFor="search">Search</FormLabel>
        </VisuallyHidden>
        <Input
          // bgImage="linear-gradient(to right, #00A3C4, #76E4F7)"
          bg="brand.75"
          css={{
            '::placeholder': {
              color: 'black',
              textAlign: 'center',
            },
          }}
          w="30%"
          borderRadius="20px"
          border="red"
          type="search"
          name="search"
          id="search"
          placeholder="Search Your List"
          aria-label="Search your list"
          value={filterValue}
          onChange={handleSearchChange}
          marginBottom="40px"
        />

        <IconButton
          colorScheme="blue"
          aria-label="clear search bar"
          size="xs"
          marginX="10px"
          icon={<CloseIcon />}
          onClick={handleClearClick}
        />

        <UnorderedList listStyleType="none">
          <SimpleGrid columns={3}>
            {currentList.userList.length > 0 ? (
              filteredList.map((element) => (
                <ListItem
                  style={{ margin: '10px', padding: '5px' }}
                  key={element.id}
                  aria-label={`${element.itemName} needs to be purchased ${element.textEstimate}`}
                  display="flex"
                  justifyContent="center"
                >
                  {/* Colored Tab */}
                  <Box
                    className={element.textEstimate}
                    width="30px"
                    borderRadius="15px 0 0 15px"
                    marginRight="10px"
                    boxShadow=" -3px 4px 6px lightGrey"
                  ></Box>
                  {/* Grey Tab */}
                  <Box
                    bg="brand.75"
                    borderRadius="0 15px 15px 0"
                    padding="10px"
                    boxShadow=" -3px 4px 6px lightGrey"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-around"
                      alignItems="center"
                      my="5px"
                    >
                      <Checkbox
                        border="grey"
                        bg="grey"
                        borderRadius="5px"
                        iconColor="white"
                        colorScheme="brand.600"
                        size="md"
                        type="checkbox"
                        name={element.itemName}
                        id={element.id}
                        value={element.itemName}
                        className="purchased"
                        onChange={handleCheck}
                        checked={element.isPurchased}
                      ></Checkbox>{' '}
                      <Text>{element.itemName}</Text>
                    </Box>
                    <Box>
                      {/* Delete Alert Dialog */}
                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Item
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={handleDelete}
                                ml={3}
                                id={element.id}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>

                      <Button
                        onClick={() => setIsOpen(true)}
                        id={element.id}
                        textStyle="itemButton"
                        type="submit"
                      >
                        Delete
                      </Button>
                      <Button textStyle="itemButton">
                        <Link as={RouterLink} to={`/item/${element.id}`}>
                          Details
                        </Link>
                      </Button>
                    </Box>
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Text mt="4%" mb="5%">
                  {' '}
                  You don't have any items
                </Text>
                <Link as={RouterLink} to="/add-items" textStyle="fakeButton">
                  Add your first item!
                </Link>
              </ListItem>
            )}
          </SimpleGrid>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default ViewList;
