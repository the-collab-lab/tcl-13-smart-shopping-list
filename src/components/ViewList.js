import React, { useContext, useState, useEffect } from 'react';
import { ListContext } from '../context/ListContext';

const ViewList = () => {
  let currentList = useContext(ListContext);
  let token = currentList.token;

  const [itemsPurchased, setItemsPurchased] = useState({});

  const handleCheck = async (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    await setItemsPurchased((prevItemsPurchased) => ({
      ...prevItemsPurchased,
      [item]: isChecked,
    }));
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

  useEffect(() => {
    const updateDatabase = () => {
      // let name = e.target.value
      // console.log(Object.keys(itemsPurchased).find(key => itemsPurchased[key] == name))
      //finds the current list
      currentList.itemsRef.where('userToken', '==', token).onSnapshot(
        function (querySnapShot) {
          querySnapShot.forEach(function (doc) {
            //finds the documents where the itemsPurchased exist
            if (itemsPurchased.hasOwnProperty(doc.data().itemName)) {
              //grabs the id
              const itemId = doc.id;
              //finds the document & sets the lastPurchased field to current date
              currentList.itemsRef
                .doc(itemId)
                .update({ lastPurchased: new Date().getTime() });
            }
          });
        },
        function (error) {
          console.log('Error getting documents: ', error);
        },
      );
    };

    updateDatabase();
  }, []);

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
                onChange={handleCheck}
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
