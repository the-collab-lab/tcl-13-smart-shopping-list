import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';

export default function Welcome() {
  const [userInputToken, setUserInputToken] = useState('');

  //references the collection where the items are stored
  let itemsRef = db.collection('items');

  // Handler function for setting the User Input Token state based on user input
  const handleChange = (event) => {
    event.preventDefault();
    setUserInputToken(event.target.value);
  };

  //Checks to see if userInputToken exists in db and adds user to existing list
  const handleJoinList = (event) => {
    event.preventDefault();

    itemsRef
      .where('userToken', '==', userInputToken)
      .get()
      .then(function (querySnapshot) {
        // if document is empty/ userToken != userInputToken
        //console log error message
        if (querySnapshot.empty) {
          console.log('User Token Does not Exist');
          alert('User Token Does Bot Exist. Try Again');
          //if userInputToken exists - set it so localStorage & console log items
        } else {
          localStorage.setItem('tcl13-token', userInputToken);
          querySnapshot.forEach(function (doc) {
            console.log(doc.id, ' => ', doc.data());
          });
        }
      })
      .catch(function (error) {
        console.log('User Token Does not exist', error);
      });
  };

  return (
    <div>
      <h1>Welcome to your Smart Shopping List!</h1>

      {/* For accessibility reasons this is a link, but can be styled as button */}

      <Link to="/new-list">Create a new List</Link>

      <p>- or -</p>

      <p>Join an existing shopping list by entering a three word token</p>

      <form onSubmit={handleJoinList}>
        <label htmlFor="tokenField"> Share Token </label>
        <input
          id="tokenField"
          placeholder="three word token"
          type="text"
          aria-label="Enter your three word token"
          value={userInputToken}
          onChange={handleChange}
        />
        <input type="submit" value="Join Existing List" />
      </form>
    </div>
  );
}

// Accessibility input labelling for buttons
