import React from 'react';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';

export default function NewList() {
  const newList = () => {
    const token = getToken();
    localStorage.setItem('token', token);
  };

  return (
    <div>
      <input placeholder="name here" type="text"></input>
      <button onClick={newList}>
        <Link to="/view-list">Save New List</Link>
      </button>
    </div>
  );
}
