import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';

const ViewList = () => {
  const currentList = useContext(ListContext);

  // If the list is empty, add a prompt and link to Add Items

  return (
    <div>
      <h1>View List</h1>
      <ul>
        {currentList.userList.length > 0 ? (
          currentList.userList.map((element, index) => (
            <li key={index}> {element.itemName} </li>
          ))
        ) : (
          <div>
            <p> You don't have any items</p>
            <Link to="/add-items">Add your first item!</Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ViewList;
