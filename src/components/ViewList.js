import React, { useState, useEffect } from 'react';

/*CONTEXT ERROR - need to consume list context in this component... 
  1. import useContext from react
  2. import ListContext component from context folder
  3. set ListContext to a variable
  4. map userList to render li
*/

const ViewList = (props) => {
  return (
    <div>
      <h1>View List</h1>
      <ul>
        {props.userList &&
          props.userList.map((element, index) => (
            <li key={index}> {element.itemName} </li>
          ))}
      </ul>
    </div>
  );
};

export default ViewList;
