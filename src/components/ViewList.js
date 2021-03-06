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
  InputGroup,
  InputRightAddon,
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
  Center,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import './ViewList.css';
import { jsx } from '@emotion/react';

const ViewList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setItemToDelete(null);
  };
  const cancelRef = useRef();

  let currentList = useContext(ListContext);

  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();

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

  const handleAlert = (id) => {
    setItemToDelete(id);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    //if you confirm the delete dialogue than it will delete from the db
    console.log(itemToDelete);
    currentList.itemsRef
      .doc(itemToDelete)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
    onClose();
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
        <Text as="h2" textStyle="h2" mb={10}>
          {currentList.listName}
        </Text>
        <VisuallyHidden>
          <FormLabel htmlFor="search">Search</FormLabel>
        </VisuallyHidden>
        <Center>
          <InputGroup display="flex" justifyContent="center">
            <Input
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
            <InputRightAddon
              children="x"
              onClick={handleClearClick}
              cursor="pointer"
              borderRadius="20px"
            />
          </InputGroup>
        </Center>

        <UnorderedList listStyleType="none">
          {currentList.userList.length > 0 ? (
            <SimpleGrid columns={3}>
              {filteredList.map((element) => (
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
                              <Button
                                ref={cancelRef}
                                onClick={onClose}
                                variant="outline"
                              >
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  handleDelete(element.id);
                                }}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>

                      <Button
                        onClick={() => handleAlert(element.id)}
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
              ))}
            </SimpleGrid>
          ) : (
            <ListItem>
              <Text mt="4%" mb="5%" textStyle="h2">
                {' '}
                You don't have any items
              </Text>
              <Link as={RouterLink} to="/add-items" textStyle="fakeButton">
                Add your first item!
              </Link>
            </ListItem>
          )}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default ViewList;
