import React, { useContext, useState } from 'react';
import { ListContext } from '../context/ListContext';

const ViewList = () => {
  let currentList = useContext(ListContext);
  let token = currentList.token;

  const [itemsPurchased, setItemsPurchased] = useState({});

  const handleCheck = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setItemsPurchased((prevItemsPurchased) => ({
      ...prevItemsPurchased,
      [item]: isChecked,
    }));
  };

  const updateDatabase = (e) => {
    handleCheck(e);
    //finds the current list
    currentList.itemsRef.where('userToken', '==', token).onSnapshot(
      function (querySnapShot) {
        querySnapShot.forEach(function (doc) {
          //finds the documents where the itemsPurchased exist
          if (doc.data().itemName === itemsPurchased) {
            //grabs the id
            const itemId = doc.id;
            //finds the document & sets the lastPurchased field to current date
            currentList.itemsRef
              .doc(itemId)
              .update({ lastPurchased: new Date() });
          }
        });
      },
      function (error) {
        console.log('Error getting documents: ', error);
      },
    );
  };

  return (
    <div>
      <h1>View List</h1>
      <ul>
        {currentList.userList &&
          currentList.userList.map((element, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={element.itemName}
                value={element.itemName}
                className="purchased"
                onChange={(e) => updateDatabase(e)}
                checked={itemsPurchased[element.itemName] || false}
              ></input>
              <li> {element.itemName} </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ViewList;
