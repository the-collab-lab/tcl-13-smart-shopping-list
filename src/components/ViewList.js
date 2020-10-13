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
    itemsRef
      .where('userToken', '==', 'token')
      .get()
      .then(function (querySnapshot) {
        let tempItems = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          tempItems.push(doc.data());
        });
        setItems(tempItems);
      })
      .then(function () {
        console.log(items);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });

    // setItems(query);
  }, []);

  return (
    <div>
      <h1>View List</h1>
      <ul>
        {items.map((element, index) => (
          <li key={index}> {element.itemName} </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewList;
