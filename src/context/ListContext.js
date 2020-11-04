import React, { createContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase';

export const ListContext = createContext();

//playing around with date dayjs
//dayjs.extend(utc)
//console.log(typeof dayjs().format());
//console.log(new Date());

const ListContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userList, setUserList] = useState([]);

  //references the doc we are updating and changing
  const itemsRef = db.collection('items');

  useEffect(() => {
    updateToken();
  }, []);

  const updateToken = () => {
    const tempToken = localStorage.getItem('tcl13-token');
    setToken(tempToken);
  };

  const setPurchased = (lastPurchased) => {
    console.log(
      'calculating last purchased from these seconds: ',
      lastPurchased,
    );
    // create variable that represents x days, in seconds
    const deltaSeconds = 2 * 24 * 60 * 60;
    // variable that represents now, in seconds
    const timeNow = new Date().getTime() / 1000;
    return timeNow - lastPurchased < deltaSeconds;
  };

  useEffect(() => {
    if (token != null) {
      let unsubscribe = itemsRef.where('userToken', '==', token).onSnapshot(
        (querySnapshot) => {
          let tempItems = [];
          querySnapshot.forEach(function (doc) {
            const lastPurchased = doc.data().lastPurchasedDate;
            let isPurchased = false;
            lastPurchased
              ? (isPurchased = setPurchased(lastPurchased.seconds))
              : (isPurchased = false);
            tempItems.push({
              ...doc.data(),
              isPurchased: isPurchased,
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
