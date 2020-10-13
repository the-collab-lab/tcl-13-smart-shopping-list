import React, { useState, useEffect } from 'react';
import db from '../firebase/firebase';

const firebase = require('firebase/app');
require('firebase/firestore');
const userToken = 'token';

const AddItems = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    timeFrame: 7,
    lastPurchased: null,
    userToken: userToken,
    dateCreated: new Date(),
  });

  //references the doc we are updating and changing
  //let usersRef = db.collection('users').doc(userToken);
  const itemsRef = db.collection('items');

  // handle change of each form input, set state
  const updateInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submits state to database
  const handleSubmit = (event) => {
    event.preventDefault();

    itemsRef
      .add(formData)
      .then(function () {
        console.log('submitted!');
      })
      // catches & logs any errors
      .catch(function (error) {
        console.error('error updating count!', error);
      });
  };

  return (
    <div>
      <h1>Add your items!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item-name"> Item Name:</label>
        <input
          type="text"
          placeholder="Add your item here"
          name="itemName"
          value={formData.itemName}
          onChange={updateInput}
        />
        <br />
        <br />
        <fieldset className="fieldset-1">
          <legend>Time Frame</legend>
          <label htmlFor="timeFrame"> How soon will you buy this again?</label>
          <br />
          <input
            type="radio"
            id="soon"
            name="timeFrame"
            defaultChecked
            value="7"
            onChange={updateInput}
          />
          <label htmlFor="soon"> Soon</label>
          <br />
          <input
            type="radio"
            id="kinda-soon"
            name="timeFrame"
            value="14"
            onChange={updateInput}
          />
          <label htmlFor="kinda-soon"> Kinda Soon</label>
          <br />
          <input
            type="radio"
            id="not-soon"
            name="timeFrame"
            value="30"
            onChange={updateInput}
          />
          <label htmlFor="not-soon">Not Soon</label>
          <br />
        </fieldset>
        <input type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default AddItems;
