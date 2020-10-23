import React from 'react';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';

export default function NewList(props) {
  const newList = () => {
    // Saving randomly generated token to a variable
    const token = getToken();
    // Sending the token variable to local storage for use
    localStorage.setItem('tcl13-token', token);
    /*CONTEXT ERROR - need to update token context from here...
      1. Is there a method to set context state from here?
      2. Should the useEffect call that sets the token in ListContext be updated to run multiple times?
      3. Whatever solution is used here should be used similarly in new join list functionality
    */
    props.tokenCreatedHandler(token);
  };

  return (
    <div>
      <label htmlFor="newListName"> Enter New List Name</label>
      <input id="newListName" placeholder="List Name Here" type="text"></input>
      <button onClick={newList}>
        <Link to="/view-list">Save New List</Link>
      </button>
    </div>
  );
}
