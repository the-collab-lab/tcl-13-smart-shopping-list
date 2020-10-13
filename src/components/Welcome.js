import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div>
      <h1>Welcome to your Smart Shopping List!</h1>

      {/* For accessibility reasons (FAR), is this a button or a link that should be styled as a button? */}
      <button>
        <Link to="/new-list">Create a new List</Link>
      </button>

      <p>- or -</p>

      <p>Join an existing shopping list by entering a three work token</p>

      {/* FAR - Should this be a fieldset, or is it okay because it's only one input/submit button? */}
      <label htmlFor="tokenField"> Share Token </label>
      <input
        id="tokenField"
        placeholder="three word token"
        type="text"
        aria-label="Enter your three word token"
      ></input>
      <button>Join an existing list</button>
    </div>
  );
}
