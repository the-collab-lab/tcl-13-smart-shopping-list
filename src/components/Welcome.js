import React from 'react';
import { Link } from 'react-router-dom';
import { storage } from 'firebase';

export default function Welcome() {
  return (
    <div>
      <h1>Welcome to your Smart Shopping List!</h1>
      <button>
        <Link to="/new-list">Create a new List</Link>
      </button>

      <p>- or -</p>

      <p>Join an existing shopping list by entering a three work token</p>

      <p>Share token</p>
      <input placeholder="three word token"></input>
      <button>Join an existing list</button>
    </div>
  );
}
