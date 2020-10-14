import React from 'react';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';

export default function NewList() {
  const newList = () => {
    // Saving randomly generated token to a variable
    const token = getToken();
    // Sending the token variable to local storage for use
    localStorage.setItem('token', token);
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
