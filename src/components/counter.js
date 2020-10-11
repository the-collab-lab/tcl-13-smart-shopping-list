import React, { useState, useEffect } from 'react';
import db from '../firebase/firebase';

const firebase = require('firebase/app');
require('firebase/firestore');

//Creates the functional component Counter
export default function Counter() {
  const [currentCount, setCurrentCount] = useState();

  //references the doc we are updating and changing
  let counterRef = db.collection('counter').doc('count');

  //gets currentCount from database count number when mounting
  //sets state to db currentCount
  useEffect(() => {
    counterRef
      .get()
      .then((doc) => {
        setCurrentCount(doc.data().number);
      })
      .catch(function (error) {
        console.error('error connecting to database', error);
      });
  }, [counterRef]);

  //handler function for "Count +" button which updates the database
  //and then updates the state
  const handleIncrement = () => {
    counterRef
      .update({
        number: firebase.firestore.FieldValue.increment(1),
      })
      .then(function () {
        setCurrentCount(currentCount + 1);
      })
      // catches & logs any errors
      .catch(function (error) {
        console.error('error updating count!', error);
      });
  };

  //handler function for "Count -" button which updates the database
  //and then updates the state
  const handleDecrement = () => {
    counterRef
      .update({
        number: firebase.firestore.FieldValue.increment(-1),
      })
      .then(function () {
        setCurrentCount(currentCount - 1);
      })
      // catches & logs any errors
      .catch(function (error) {
        console.error('error updating count!', error);
      });
  };

  // handler function to read and log current count from database
  const handleGet = () => {
    db.collection('counter')
      .doc('count')
      .get()
      .then((doc) => {
        const data = doc.data();
        console.log('current count in database is', data.number);
      });
  };

  return (
    <div>
      The current count is {currentCount}
      <br />
      <button onClick={handleIncrement}>Count + </button>
      <button onClick={handleDecrement}>Count - </button>
      <button onClick={handleGet}>Get Count from db</button>
    </div>
  );
}
