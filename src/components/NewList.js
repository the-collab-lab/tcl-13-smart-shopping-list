import React from 'react';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';

export default function NewList() {
  const newList = () => {
    const token = getToken();
    localStorage.setItem('token', token);
  };
  // FAR - Do we need an aria-label for the input if the label is descriptive?
  return (
    <div>
      <label htmlFor="newListName"> Enter New List Name</label>
      <input id="newListName" placeholder="List Name Here" type="text"></input>
      {/* FAR - Save and View New List? */}
      <button onClick={newList}>
        <Link to="/view-list">Save New List</Link>
      </button>
    </div>
  );
}
