import React, { useContext, useState, useEffect } from 'react';
import { ListContext } from '../context/ListContext';
import { Link as RouterLink } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';
import {
  Button,
  Box,
  Text,
  Input,
  VisuallyHidden,
  FormLabel,
  Link,
  List,
  ListItem,
  IconButton,
  UnorderedList,
} from '@chakra-ui/react';
import { CloseIcon, AddIcon } from '@chakra-ui/icons';
import './ViewList.css';

const ViewList = () => {
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
    if (window.confirm('Would you like to delete your item?') == true) {
      currentList.itemsRef
        .doc(e.target.id)
        .delete()
        .then(function () {
          console.log('Document successfully deleted!');
        })
        .catch(function (error) {
          console.error('Error removing document: ', error);
        });
    }
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
          // variant="filled"
          bgImage="linear-gradient(to right, #00A3C4, #76E4F7)"
          w="30%"
          borderRadius="20px"
          border="none"
          type="search"
          name="search"
          id="search"
          placeholder="Search Your List"
          aria-label="Search your list"
          value={filterValue}
          onChange={handleSearchChange}
        />

        <IconButton
          colorScheme="blue"
          aria-label="clear search bar"
          icon={<CloseIcon />}
          onClick={handleClearClick}
        />

        <UnorderedList listStyleType="none">
          {currentList.userList.length > 0 ? (
            filteredList.map((element) => (
              <ListItem
                style={{ margin: '10px', padding: '5px' }}
                key={element.id}
                aria-label={`${element.itemName} needs to be purchased ${element.textEstimate}`}
                display="flex"
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
                  <input
                    type="checkbox"
                    name={element.itemName}
                    id={element.id}
                    value={element.itemName}
                    className="purchased"
                    onChange={handleCheck}
                    checked={element.isPurchased}
                  ></input>{' '}
                  {element.itemName}
                  <Box>
                    <Button
                      onClick={handleDelete}
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
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default ViewList;
