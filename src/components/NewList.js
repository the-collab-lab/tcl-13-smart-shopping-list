import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';

export default function NewList() {
  let currentList = useContext(ListContext);

  const newList = () => {
    // Saving randomly generated token to a variable
    const token = getToken();
    // Sending the token variable to local storage for use
    localStorage.setItem('tcl13-token', token);
    currentList.updateToken();
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
