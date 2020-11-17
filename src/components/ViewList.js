import React, { useContext, useState, useEffect } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';

import './ViewList.css';

const ViewList = () => {
  // If the list is empty, add a prompt and link to Add Items
  let currentList = useContext(ListContext);

  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleCheck = async (e) => {
    const timeNow = new Date().getTime() / 1000;
    // retrieve event information
    let docId = e.target.id;
    let currentRef = currentList.itemsRef.doc(docId);

    //find context for current item
    const currentItem = currentList.userList.find((item) => {
      return item.id == docId;
    });

    // store current item data
    const numberOfPurchases = currentItem.numberOfPurchases
      ? currentItem.numberOfPurchases + 1
      : 1;
    let lastEstimate = parseInt(currentItem.lastEstimate);
    let latestInterval;
    let lastPurchased;

    // if item has been purchased more than two times, calculate the last interval
    if (numberOfPurchases > 1) {
      lastPurchased = currentItem.lastPurchased.seconds;
      latestInterval = Math.ceil((timeNow - lastPurchased) / (24 * 60 * 60));
    } else {
      latestInterval = parseInt(currentItem.lastEstimate);
    }

    lastEstimate = calculateEstimate(
      lastEstimate,
      latestInterval,
      numberOfPurchases,
    );

    return currentRef
      .update({
        lastPurchased: new Date(),
        lastEstimate: lastEstimate,
        numberOfPurchases: numberOfPurchases,
      })
      .then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };

  const handleClearClick = () => {
    setFilterValue('');
  };

  useEffect(() => {
    const sortedList = currentList.userList.sort((a, b) => {
      if (a.daysUntilPurchase < b.daysUntilPurchase) {
        return -1;
      }
      if (a.daysUntilPurchase > b.daysUntilPurchase) {
        return 1;
      }
      if (a.daysUntilPurchase === b.daysUntilPurchase) {
        if (a.itemName < b.itemName) {
          return -1;
        } else {
          return 1;
        }
      }
    });
    setFilteredList(sortedList);
  }, [currentList.userList]);

  const handleSearchChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleDelete = (e) => {
    //if you confirm the delete dialogue than it will delete from the db
    if (window.confirm('Would you like to delete your item?') == true) {
      currentList.itemsRef
        .doc(e.target.id)
        .delete()
        .then(function () {
          console.log('Document successfully deleted!');
        })
        .catch(function (error) {
          console.error('Error removing document: ', error);
        });
    }
  };

  useEffect(() => {
    let listFilter = currentList.userList;
    let filtered =
      listFilter &&
      listFilter.filter((item) => {
        return item.itemName.toLowerCase().includes(filterValue.toLowerCase());
      });
    setFilteredList(filtered);
  }, [filterValue]);

  return (
    <div>
      <h1>View List</h1>
      <label htmlFor="search">Type to Search</label>
      <input
        type="search"
        name="search"
        id="search"
        value={filterValue}
        onChange={handleSearchChange}
      />
      <label htmlFor="Clear" aria-label="Clear search bar"></label>
      <button onClick={handleClearClick}>Clear</button>

      <ul>
        {currentList.userList.length > 0 ? (
          filteredList.map((element, index) => (
            <li
              key={element.id}
              className={element.textEstimate}
              aria-label={`${element.itemName} needs to be purchased ${element.textEstimate}`}
            >
              <input
                type="checkbox"
                name={element.itemName}
                id={element.id}
                value={element.itemName}
                className="purchased"
                onChange={handleCheck}
                checked={element.isPurchased}
              ></input>{' '}
              {element.itemName} {element.itemName}
              <button onClick={handleDelete} id={element.id}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>
            <p> You don't have any items</p>
            <Link to="/add-items">Add your first item!</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ViewList;
