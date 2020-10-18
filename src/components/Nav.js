import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';

const Nav = () => {
  return (
    <div>
      <nav>
        <div>
          <NavLink
            to="/view-list"
            activeStyle={{
              fontWeight: 'bold',
            }}
          >
            View List
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/add-items"
            activeStyle={{
              fontWeight: 'bold',
            }}
          >
            Add Items
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
