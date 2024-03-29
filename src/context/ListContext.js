import React, { createContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase';

export const ListContext = createContext();

const ListContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [listName, setListName] = useState(null);
  const [userList, setUserList] = useState([]);

  //DATABASE COLLECTIONS
  const itemsRef = db.collection('items');
  const listNamesRef = db.collection('listNames');

  // sets token to context on first render
  useEffect(() => {
    updateToken();
  }, []);

  //function to update token in context, called by context re-render, creating a new list, or joining an existing list
  const updateToken = () => {
    const tempToken = localStorage.getItem('tcl13-token');
    setToken(tempToken);
  };

  // NEW LIST
  // generate token, set to local storage, set to context state
  // save new list name to database, save to context state
  const generateNewList = (enteredName) => {
    // // generate token
    // const token = getToken();
    // // item to be stored
    // const newList = {
    //   userToken: token,
    //   listName: enteredName,
    // };
    // //add to db, set to context
    // listNamesRef
    //   .add(newList)
    //   .then(function () {
    //     localStorage.setItem('tcl13-token', token);
    //     setToken(token);
    //     setListName(enteredName);
    //   })
    //   .catch(function (error) {
    //     console.error('error adding item to the database!', error);
    //   });
    console.log('Creating new lists is no longer supported');
  };

  // function to calculate if items have been purchased in last x number of days
  const setPurchased = (lastPurchased) => {
    // create variable that represents x days, in seconds
    const deltaSeconds = 1 + 24 * 60 * 60;
    // variable that represents now, in seconds
    const timeNow = new Date().getTime() / 1000;
    return timeNow - lastPurchased < deltaSeconds;
  };

  // function to calculate time left until purchase
  const timeUntilNextPurchase = (
    lastPurchased,
    lastEstimate,
    dateCreated,
    numberOfPurchases,
  ) => {
    // object to hold daysUntilPurchase textEstimate
    const estimatedTimeframes = {
      daysUntilPurchase: null,
      textEstimate: '',
    };

    // determine number of days since last purchase date
    const timeNow = new Date().getTime() / 1000;
    let timeSinceLastPurchase;

    // if lastPurchased dosen't exist, set daysUntilPurchase = today-date created
    if (lastPurchased) {
      timeSinceLastPurchase =
        (timeNow - lastPurchased.seconds) / (24 * 60 * 60);
    } else {
      timeSinceLastPurchase = (timeNow - dateCreated.seconds) / (24 * 60 * 60);
    }

    // subtract days since last purchase from lastEstimate to determine how many days left until next purchase
    const daysUntilPurchase = Math.ceil(lastEstimate - timeSinceLastPurchase);
    estimatedTimeframes.daysUntilPurchase = daysUntilPurchase;

    // return text estimate of daysUntilNextPurchase

    if (numberOfPurchases === 1 || timeSinceLastPurchase > lastEstimate * 2) {
      estimatedTimeframes.textEstimate = 'inactive';
    } else if (daysUntilPurchase <= 7) {
      estimatedTimeframes.textEstimate = 'soon';
    } else if (7 < daysUntilPurchase && daysUntilPurchase < 30) {
      estimatedTimeframes.textEstimate = 'kind-of-soon';
    } else if (daysUntilPurchase >= 30) {
      estimatedTimeframes.textEstimate = 'not-soon';
    }

    return estimatedTimeframes;
  };

  useEffect(() => {
    if (token != null) {
      //retrieve list name and set to context state
      listNamesRef
        .where('userToken', '==', token)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            setListName(doc.data().listName);
          });
        })
        .catch(function (error) {
          console.log('Error getting cached document:', error);
        });

      let unsubscribe = itemsRef.where('userToken', '==', token).onSnapshot(
        (querySnapshot) => {
          let tempItems = [];
          querySnapshot.forEach(function (doc) {
            // logic to check if item has been purchased in last x number of days
            const lastPurchased = doc.data().lastPurchased;
            const isPurchased = lastPurchased
              ? setPurchased(lastPurchased.seconds)
              : false;

            // logic to estimate time remaining until purchase
            const timeUntilPurchase = timeUntilNextPurchase(
              lastPurchased,
              doc.data().lastEstimate,
              doc.data().dateCreated,
              doc.data().numberOfPurchases,
            );

            tempItems.push({
              ...doc.data(),
              isPurchased: isPurchased,
              ...timeUntilPurchase,
              id: doc.id,
            });
          });
          setUserList(tempItems);
        },
        (error) => {
          console.log('Error getting documents: ', error);
        },
      );
      //Trying to unsubsribe from onSnapshot to avoid memory leak error
      return function cleanup() {
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ListContext.Provider
      value={{
        userList,
        listName,
        token,
        itemsRef,
        updateToken,
        generateNewList,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
