import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';

export default function Welcome() {
  const [userInputToken, setUserInputToken] = useState(' ');

  let itemsRef = db.collection('items');

  // Handler function for setting the User Input Token in state
  const handleChange = (event) => {
    event.preventDefault();
    setUserInputToken(event.target.value);
    console.log('userInputToken');
  };

  // const checkToken = () => {
  //   const token = localStorage.getItem('tcl13-token');
  //   if (token !== null) {
  //     alert('Your list coming up!');
  //     return true;
  //   } else {
  //     alert(`You don't have a list!`);
  //     return false;
  //   }
  // };

  return (
    <div>
      <h1>Welcome to your Smart Shopping List!</h1>

      {/* For accessibility reasons this is a link, but can be styled as button */}

      <Link to="/new-list">Create a new List</Link>

      <p>- or -</p>

      <p>Join an existing shopping list by entering a three work token</p>

      <label htmlFor="tokenField"> Share Token </label>
      <input
        id="tokenField"
        placeholder="three word token"
        type="text"
        aria-label="Enter your three word token"
        value={userInputToken}
        onChange={handleChange}
      ></input>
      <button>Join an existing list</button>
    </div>
  );
}
