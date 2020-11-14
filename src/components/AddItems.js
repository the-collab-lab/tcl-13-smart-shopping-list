import React, { useState, useContext } from 'react';
import { ListContext } from '../context/ListContext';
import './AddItems.css';

const AddItems = () => {
  const listContext = useContext(ListContext);
  const formStarter = {
    itemName: '',
    lastEstimate: 7,
    lastPurchased: null,
    userToken: listContext.token,
    dateCreated: new Date(),
    numberOfPurchases: 0,
  };

  const [formData, setFormData] = useState(formStarter);

  const [errorMessage, setErrorMessage] = useState(null);

  const itemsRef = listContext.itemsRef;

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
        item.itemName.replace(/[^A-Z0-9]+/gi, '').toLowerCase() ===
        currentItem.replace(/[^A-Z0-9]+/gi, '').toLowerCase(),
    );
    return matches.length < 1;
  };

  // submits state to database
  const handleSubmit = (event) => {
    event.preventDefault();
    parseInt(formData.lastEstimate);

    if (formData.itemName !== '') {
      if (compareItems(formData.itemName)) {
        itemsRef
          .add(formData)
          .then(function () {
            setFormData({ formStarter });
            alert('submitted');
          })
          // catches & logs any errors
          .catch(function (error) {
            console.error('error adding item to the database!', error);
          });
      } else {
        //TODO: change error messages to just one item in state.
        setErrorMessage('This item already exists in the database!');
      }
    } else {
      setErrorMessage('Please enter an item');
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
          className={errorMessage ? 'error' : ''}
          type="text"
          placeholder="Add your item here"
          name="itemName"
          value={formData.itemName}
          onChange={updateInput}
        />
        {errorMessage ? <p className="error">{errorMessage}</p> : null}
        <br />
        <br />
        <fieldset className="fieldset">
          <legend>Time Frame</legend>
          <label htmlFor="lastEstimate">
            {' '}
            How soon will you buy this again?
          </label>
          <br />
          <input
            type="radio"
            id="soon"
            name="lastEstimate"
            defaultChecked
            value="7"
            onChange={updateInput}
          />
          <label htmlFor="soon"> Soon</label>
          <br />
          <input
            type="radio"
            id="kinda-soon"
            name="lastEstimate"
            value="14"
            onChange={updateInput}
          />
          <label htmlFor="kinda-soon"> Kinda Soon</label>
          <br />
          <input
            type="radio"
            id="not-soon"
            name="lastEstimate"
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
