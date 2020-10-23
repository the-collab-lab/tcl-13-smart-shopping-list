import React, { useState, useContext } from 'react';
import { ListContext } from '../context/ListContext';
import './AddItems.css';

const AddItems = (props) => {
  const listContext = useContext(ListContext);

  const itemsRef = listContext.itemsRef;

  const [formData, setFormData] = useState({
    itemName: '',
    timeFrame: 7,
    lastPurchased: null,
    userToken: listContext.token,
    dateCreated: new Date(),
  });

  // handle change of each form input, set state
  const updateInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // function to compare new entry with existing entries
  const compareItems = (currentItem) => {
    const matches = listContext.userList.filter(
      (item) =>
        item.itemName.replace(/[^A-Z0-9]+/gi, '').toLowerCase() ==
        currentItem.replace(/[^A-Z0-9]+/gi, '').toLowerCase(),
    );
    console.log(matches);
    return matches.length < 1;
  };

  // submits state to database
  const handleSubmit = (event) => {
    event.preventDefault();

    if (compareItems(formData.itemName)) {
      itemsRef
        .add(formData)
        .then(function () {
          props.itemAddedHandler(formData);
          setFormData({ itemName: '' });
          alert('submitted');
        })
        // catches & logs any errors
        .catch(function (error) {
          console.error('error adding item to the database!', error);
        });
    } else {
      alert('this item already exists in the database!');
    }
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
