import React, { useState } from 'react';
import { db } from '../lib/firebase';
import './AddItems.css';

const AddItems = () => {
  //token to represent localStorage value
  const userToken = localStorage.getItem('tcl13-token');

  const [formData, setFormData] = useState({
    itemName: '',
    timeFrame: 7,
    lastPurchased: null,
    userToken: userToken,
    dateCreated: new Date(),
  });

  //references the doc we are updating and changing
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
        alert('submitted');
      })
      // catches & logs any errors
      .catch(function (error) {
        console.error('error adding item to the database!', error);
      });
  };

  return (
    <div>
      <h1>Add Your Items!</h1>
      <form onSubmit={handleSubmit}>
        <label className="label-1" htmlFor="item-name">
          {' '}
          Item Name:
        </label>
        <input
          type="text"
          placeholder="Add your item here"
          name="itemName"
          value={formData.itemName}
          onChange={updateInput}
        />
        <br />
        <br />
        <fieldset className="fieldset">
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
        <br />
        <input type="submit" value="Add Item" className="input-1" />
      </form>
    </div>
  );
};

export default AddItems;
