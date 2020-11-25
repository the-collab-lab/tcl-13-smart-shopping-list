import React, { useState, useContext } from 'react';
import { ListContext } from '../context/ListContext';
import {
  Button,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Stack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

const AddItems = () => {
  const listContext = useContext(ListContext);
  const itemsRef = listContext.itemsRef;

  const formStarter = {
    itemName: '',
    lastEstimate: 7,
    lastPurchased: null,
    userToken: listContext.token,
    dateCreated: new Date(),
    numberOfPurchases: 0,
  };

  const [formData, setFormData] = useState(formStarter);
  const [errorMessage, setErrorMessage] = useState(null);

  // handle change of each form input, set state
  const updateInput = (e) => {
    errorMessage && setErrorMessage(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // function to compare new entry with existing entries
  const compareItems = (currentItem) => {
    const matches = listContext.userList.filter(
      (item) =>
        item.itemName.replace(/[^A-Z0-9]+/gi, '').toLowerCase() ===
        currentItem.replace(/[^A-Z0-9]+/gi, '').toLowerCase(),
    );
    return matches.length < 1;
  };

  // submits state to database
  const handleSubmit = (event) => {
    event.preventDefault();
    parseInt(formData.lastEstimate);

    if (formData.itemName !== '') {
      if (compareItems(formData.itemName)) {
        itemsRef
          .add(formData)
          .then(function () {
            setFormData(formStarter);
            alert('submitted');
          })
          // catches & logs any errors
          .catch(function (error) {
            console.error('error adding item to the database!', error);
          });
      } else {
        setErrorMessage('This item already exists in the database!');
      }
    } else {
      setErrorMessage('Please enter an item');
    }
  };

  return (
    <Box bg="brand.600">
      <Center textStyle="roundedCorners">
        <Text textStyle="h2" orientation="horizonal">
          Add Your Items!
        </Text>
      </Center>
      <Center bg="white">
        <form onSubmit={handleSubmit}>
          <Box my={10}>
            <FormLabel textAlign="center" fontSize="20px" htmlFor="item-name">
              {' '}
              Item Name:
            </FormLabel>
            <Input
              variant="flushed"
              textAlign="center"
              className={errorMessage ? 'error' : ''}
              type="text"
              placeholder="Add your item here"
              name="itemName"
              value={formData.itemName}
              onChange={updateInput}
            />
            {errorMessage ? (
              <Center>
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>{errorMessage}</AlertTitle>
                  <AlertDescription>Please add a valid item.</AlertDescription>
                </Alert>
              </Center>
            ) : null}
          </Box>
          <Box my={10} p={4}>
            <FormLabel textAlign="center" fontSize="20px">
              Time Frame
            </FormLabel>
            <FormControl
              border="2px"
              borderColor="gray.200"
              borderRadius="lg"
              as="fieldset"
              p="24px"
              bgColor="gray.200"
            >
              <FormLabel htmlFor="lastEstimate">
                {' '}
                How soon will you buy this again?
              </FormLabel>
              <RadioGroup defaultValue="7" colorScheme="cyan">
                <Stack spacing={5}>
                  <Radio
                    id="soon"
                    name="lastEstimate"
                    checked={formData.lastEstimate === 7}
                    value="7"
                    onChange={updateInput}
                  >
                    Soon
                  </Radio>
                  <Radio
                    id="kinda-soon"
                    name="lastEstimate"
                    value="14"
                    checked={formData.lastEstimate === 14}
                    onChange={updateInput}
                  >
                    Kinda Soon
                  </Radio>
                  <Radio
                    id="not-soon"
                    name="lastEstimate"
                    value="30"
                    checked={formData.lastEstimate === 30}
                    onChange={updateInput}
                  >
                    Not Soon
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
          <Center>
            <Button type="submit" value="Add Item">
              Add Item
            </Button>
          </Center>
        </form>
      </Center>
    </Box>
  );
};

export default AddItems;
