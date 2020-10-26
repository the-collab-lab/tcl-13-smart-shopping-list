import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';

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
          <p> No list </p>
        )}
        {/* // {currentList.userList && */}
        {/* //   currentList.userList.map((element, index) => (
        //     <li key={index}> {element.itemName} </li>
          // ))} */}
      </ul>
    </div>
  );
};

export default ViewList;

// Make it a ternerary operator so if the list exists, map through, if it doesn't maybe show a link to add items
