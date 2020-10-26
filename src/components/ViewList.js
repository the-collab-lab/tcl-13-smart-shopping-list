import React, { useContext, useState } from 'react';
import { ListContext } from '../context/ListContext';
import { db } from '../lib/firebase';

const ViewList = () => {
  let currentList = useContext(ListContext);
  let token = currentList.token;

  const [itemsPurchased, setItemsPurchased] = useState('');
  const [checked, setChecked] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();

    setItemsPurchased(e.target.value);
    setChecked(true);

    // currentList.itemsRef
    //   .where('userToken', '==', localStorage.getItem('tcl13-token'))
    //   .where('itemName', '==', itemsPurchased)
    //   .set({ lastPurchased: new Date() }, {merge: true})
    //   .then(function () {
    //     console.log('Document Updated Succesfully');
    //   })
    //   .catch(function (error) {
    //     console.error('Error Updating Document');
    //   });

    currentList.itemsRef.where('userToken', '==', token).onSnapshot(
      (querySnapshot) => {
        let tempItem = querySnapshot.docs;

        let updateItem = tempItem.filter(
          (item) => item.data().itemName === itemsPurchased,
        );

        console.log(updateItem);
      },
      (error) => {
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
                onChange={handleCheck}
                checked={checked}
              ></input>
              <li> {element.itemName} </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ViewList;
