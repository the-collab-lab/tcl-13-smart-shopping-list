import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { useParams } from 'react-router-dom';

export default function ItemDetail(props) {
  let currentList = useContext(ListContext);

  let { id } = useParams();

  let currentItem = currentList.userList.find((item) => item.id == id);
  console.log(currentItem);

  return (
    <div>
      <ul>
        <li> Name: {currentItem.itemName} </li>
        {/* TODO: fix from seconds to Date and the if property*/}
        <li> Last Purchased Date: {'n/a' || currentItem.lastPurchased.t} </li>
        <li>
          {' '}
          Estimated Days Until Next Purchase: {
            currentItem.daysUntilPurchase
          }{' '}
        </li>
        <li> Number of Purchases: {currentItem.numberOfPurchases} </li>
      </ul>
    </div>
  );
}
