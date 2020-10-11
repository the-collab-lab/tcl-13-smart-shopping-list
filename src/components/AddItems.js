import React from 'react';
import db from '../firebase/firebase';

const AddItems = () => {
  return (
    <div>
      <h1>Add your items!</h1>
      <form>
        <label for="item-name"> Item Name:</label>
        <input type="text" />
        <br />
        <br />
        <fieldset>
          <legend>Time Frame</legend>
          <label for="time-frame"> How soon will you buy this again?</label>
          <br />
          <input type="radio" id="Soon" name="time-frame" />
          <label for="soon"> Soon</label>
          <br />

          <input type="radio" id="Kinda Soon" name="time-frame" />
          <label for="kinda-soon"> Kinda Soon</label>
          <br />
          <input type="radio" id="Not Soon" name="time-frame" />
          <label for="not-soon">Not Soon</label>
          <br />
        </fieldset>
      </form>
    </div>
  );
};

export default AddItems;
