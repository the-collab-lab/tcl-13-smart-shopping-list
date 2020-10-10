import React, { useState, useEffect } from 'react';
import db from '../firebase/firebase';

export default function Counter() {
  //Setting state to zero
  // const dbCount = db.collection('counter').doc('count').get().then((doc) => { const data = doc.data() })

  const [currentCount, setCurrentCount] = useState();

  //Writing to DB
  useEffect(() => {
    db.collection('counter')
      .doc('count')
      .get()
      .then((doc) => {
        setCurrentCount(doc.data().number);
      });
  });

  const handleUpdate = (e) => {
    db.collection('counter')
      .doc('count')
      .set({
        number: currentCount,
      })
      .then(function () {
        console.log('updated count!');
      })
      // catches & logs any errors
      .catch(function (error) {
        console.error('error updating count!', error);
      });
  };

  // event handler to read current count from database
  const handleGet = (e) => {
    db.collection('counter')
      .doc('count')
      .get()
      .then((doc) => {
        const data = doc.data();
        console.log('current count in database is', data);
      });
  };

  return (
    <div>
      <button
        onClick={() => {
          setCurrentCount(currentCount + 1);
          console.log(`current count is ${currentCount}`);
        }}
      >
        Count
      </button>

      <button onClick={handleGet}>Get Count</button>
    </div>
  );
}
