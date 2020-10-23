import React, { createContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase';

export const ListContext = createContext();

const ListContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userList, setUserList] = useState();

  //references the doc we are updating and changing
  const itemsRef = db.collection('items');

  useEffect(() => {
    const tempToken = localStorage.getItem('tcl13-token');
    setToken(tempToken);
  }, []);

  // WHEN TOKEN IS SET/UPDATED ---> pull user list items from the database, set to state

  /*CONTEXT ERROR - this database call is only happening on context mount, 
    but should happen each time an item is added to the database
      1. should this be updated to firebase's on snapshot?
      OR
      2. is there a way to set context state from the consumer?
    */
  useEffect(() => {
    itemsRef
      .where('userToken', '==', token)
      .get()
      .then(function (querySnapshot) {
        let tempItems = [];
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
          tempItems.push(doc.data());
        });
        setUserList(tempItems);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }, []);

  return (
    <ListContext.Provider value={{ userList, token, itemsRef }}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
