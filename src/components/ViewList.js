import React, { useContext, useState, useEffect } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';

const ViewList = () => {
  // If the list is empty, add a prompt and link to Add Items
  let currentList = useContext(ListContext);

  const handleCheck = async (e) => {
    e.persist();
    const item = e.target.name;
    const isChecked = e.target.checked;
    updateDatabase(e);
  };

  const updateDatabase = (e) => {
    let docId = e.target.id;
    let currentRef = currentList.itemsRef.doc(docId);

    return currentRef
      .update({
        lastPurchased: new Date(),
      })
      .then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };

  return (
    <div>
      <h1>View List</h1>
      <ul>
        {currentList.userList.length > 0 ? (
          currentList.userList.map((element, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={element.itemName}
                id={element.id}
                value={element.itemName}
                className="purchased"
                onChange={handleCheck}
                checked={element.isPurchased}
              ></input>
              <li> {element.itemName} </li>
            </div>
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
