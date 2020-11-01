import React, { createContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase';

export const ListContext = createContext();

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

  useEffect(() => {
    if (token != null) {
      let unsubscribe = itemsRef.where('userToken', '==', token).onSnapshot(
        (querySnapshot) => {
          let tempItems = [];
          querySnapshot.forEach(function (doc) {
            tempItems.push({ ...doc.data(), id: doc.id });
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
