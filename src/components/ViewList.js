import React, { useState, useEffect } from 'react';
import db from '../firebase/firebase';
const firebase = require('firebase/app');
require('firebase/firestore');

const ViewList = () => {
  const [items, setItems] = useState([]);

  //references the doc we are updating and changing
  let itemsRef = db.collection('items');

  //gets currentCount from database count number when mounting
  //sets state to db currentCount
  useEffect(() => {
    let query = itemsRef
      .where('userToken', '==', 'token')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          setItems([...items, doc.data().itemName]);
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });

    setItems(query);
  }, []);

  return (
    <div>
      <h1>View List</h1>
      {console.log(items)}
      <ul>{/* {items.map(
        item=><li>{item}</li>
      )} */}</ul>
    </div>
  );
};

export default ViewList;
