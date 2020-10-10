import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            to="/view-list"
            activeStyle={{
              fontWeight: 'bold',
            }}
          >
            View List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-items"
            activeStyle={{
              fontWeight: 'bold',
            }}
          >
            Add Items
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
