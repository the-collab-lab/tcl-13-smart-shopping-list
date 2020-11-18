import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { useParams, Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function ItemDetail() {
  let currentList = useContext(ListContext);

  let { id } = useParams();

  let currentItem = currentList.userList.find((item) => item.id == id);

  // determine number of days since last purchase date
  const timeNow = new Date().getTime() / 1000;
  console.log(timeNow);
  let timeSinceLastPurchase;
  // if lastPurchased dosen't exist, set daysUntilPurchase = today-date created
  if (currentItem.lastPurchased) {
    timeSinceLastPurchase = Math.ceil(
      (timeNow - currentItem.lastPurchased.seconds) / (24 * 60 * 60),
    );
  } else {
    timeSinceLastPurchase = 'N/A';
  }
  console.log(currentItem);

  return (
    <div>
      <Link to={'/view-list'}>
        <ArrowBackIcon />
      </Link>
      <ul>
        <li> Name: {currentItem.itemName} </li>
        {/* TODO: fix from seconds to Date and the if property*/}
        <li> Days Since Last Purchased: {timeSinceLastPurchase} </li>
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
