import React, { useState, useEffect } from 'react';

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
