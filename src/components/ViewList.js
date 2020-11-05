import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';

const ViewList = () => {
  // If the list is empty, add a prompt and link to Add Items
  let currentList = useContext(ListContext);

  const handleCheck = async (e) => {
    const timeNow = new Date().getTime() / 1000;
    // retrieve event informationt
    let docId = e.target.id;
    let currentRef = currentList.itemsRef.doc(docId);
    //filter context for current item
    const currentItem = currentList.userList.filter((item) => item.id == docId);
    // store current item data
    let numberOfPurchases = currentItem.numberOfPurchases++;
    let lastEstimate = currentItem.lastEstimate || currentItem.timeFrame;
    let latestInterval;
    console.log(
      currentItem.numberOfPurchases,
      currentItem.lastEstimate,
      currentItem.lastPurchased,
    );
    let lastPurchased;
    // if item has been purchased before, determine how much time has passed until now
    //TODO fix this if statement
    if (currentItem.lastPurchased) {
      lastPurchased = currentItem.lastPurchased;
      latestInterval = Math.ceil((timeNow - lastPurchased) / (24 * 60 * 60));
    } else {
      latestInterval = currentItem.lastEstimate || currentItem.timeFrame;
    }
    lastEstimate = calculateEstimate(
      lastEstimate,
      latestInterval,
      numberOfPurchases,
    );

    return currentRef
      .update({
        lastPurchased: timeNow,
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
