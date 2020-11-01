import React, { useContext, useState, useEffect } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';

const ViewList = () => {

  // If the list is empty, add a prompt and link to Add Items
  let currentList = useContext(ListContext);
  let token = currentList.token;

  const [itemsPurchased, setItemsPurchased] = useState({});

  const handleCheck = async (e) => {
    e.persist();
    const item = e.target.name;
    const isChecked = e.target.checked;
    await setItemsPurchased((prevItemsPurchased) => ({
      ...prevItemsPurchased,
      [item]: isChecked,
    }));
    updateDatabase(e);
  };

  useEffect(() => {
    const handleTiming = () => {
      let currentTime = Date.now();
      console.log(currentTime);

      const lastPurchasedTimeArray =
        currentList.userList &&
        currentList.userList.map((element) => {
          const container = {};
          container.itemName = element.itemName;
          container.t = element.lastPurchased;
          return container;
        });

      lastPurchasedTimeArray &&
        lastPurchasedTimeArray.forEach((element) => {
          if (element.t + 86400000 < currentTime) {
            setItemsPurchased((prevItemsPurchased) => ({
              ...prevItemsPurchased,
              [element.itemName]: false,
            }));
          } else
            setItemsPurchased((prevItemsPurchased) => ({
              ...prevItemsPurchased,
              [element.itemName]: true,
            }));
        });
    };
    handleTiming();
  }, []);

  const updateDatabase = (e) => {
    let docId = e.target.id;
    console.log(docId);

    let currentRef = currentList.itemsRef.doc(docId);
    console.log(currentRef);

    return currentRef
      .update({
        lastPurchased: new Date().getTime(),
        lastPurchasedDate: new Date(),
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
                checked={itemsPurchased[element.itemName] || false}
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
