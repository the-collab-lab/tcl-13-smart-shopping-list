import React, { createContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase';

export const ListContext = createContext();

const ListContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userList, setUserList] = useState([]);

  //references the doc we are updating and changing
  const itemsRef = db.collection('items');

  // updates context token on every re-render
  useEffect(() => {
    updateToken();
  }, []);

  //function to update token in context, called by context re-render, creating a new list, or joining an existing list
  const updateToken = () => {
    const tempToken = localStorage.getItem('tcl13-token');
    setToken(tempToken);
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

    /* remove console logs?
    console.log('days until purchase is :  ', daysUntilPurchase);
    console.log(typeof daysUntilPurchase); */

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
  }, [token]);

  return (
    <ListContext.Provider value={{ userList, token, itemsRef, updateToken }}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
