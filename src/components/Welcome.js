import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ListContext } from '../context/ListContext';
import './Welcome.css';

export default function Welcome() {
  const [userInputToken, setUserInputToken] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const currentList = useContext(ListContext);

  const handleChange = (e) => {
    setUserInputToken(e.target.value);
  };

  const handleJoinList = (e) => {
    e.preventDefault();
    currentList.itemsRef
      .where('userToken', '==', userInputToken)
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          setError(true);
          setErrorMessage('This token is not valid. Try again');
        } else {
          localStorage.setItem('tcl13-token', userInputToken);
          currentList.updateToken();
        }
      })
      .catch(function (error) {
        console.log('Error getting documents', error);
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
          className={error ? 'error' : ''}
          id="tokenField"
          placeholder="three word token"
          type="text"
          aria-label="Enter your three word token"
          value={userInputToken}
          onChange={handleChange}
        ></input>
        {errorMessage ? <p className="error">{errorMessage}</p> : null}
        <button type="submit">Join an existing list</button>
      </form>
    </div>
  );
}
