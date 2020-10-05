import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">View List</Link>
        </li>
        <li>
          <Link to="/add-items">Add Items</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
