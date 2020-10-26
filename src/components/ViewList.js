import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';

const ViewList = () => {
  let currentList = useContext(ListContext);

  return (
    <div>
      <h1>View List</h1>
      <ul>
        {currentList.userList ? (
          currentList.userList.map((element, index) => (
            <li key={index}> {element.itemName} </li>
          ))
        ) : (
          <div>
            <p> You don't have any items</p>
            <Link to="/add-items">Add your first item!</Link>
          </div>
        )}
        ;{/* // {currentList.userList && */}
        {/* //   currentList.userList.map((element, index) => (
        //     <li key={index}> {element.itemName} </li>
          // ))} */}
      </ul>
    </div>
  );
};

export default ViewList;

// Make it a ternerary operator so if the list exists, map through, if it doesn't maybe show a link to add items
