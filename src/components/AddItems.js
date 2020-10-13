import React, { useState, useEffect } from 'react';
import db from '../firebase/firebase';

const AddItems = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    //put function here
  };

  return (
    <div>
      <h1>Add your items!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item-name"> Item Name:</label>
        <input type="text" />
        <br />
        <br />
        <fieldset className="fieldset-1">
          <legend>Time Frame</legend>
          <label htmlFor="time-frame"> How soon will you buy this again?</label>
          <br />
          <input type="radio" id="Soon" name="time-frame" defaultChecked />
          <label htmlFor="soon"> Soon</label>
          <br />
          <input type="radio" id="Kinda Soon" name="time-frame" />
          <label htmlFor="kinda-soon"> Kinda Soon</label>
          <br />
          <input type="radio" id="Not Soon" name="time-frame" />
          <label htmlFor="not-soon">Not Soon</label>
          <br />
        </fieldset>
        <input type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default AddItems;
