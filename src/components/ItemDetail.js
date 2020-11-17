import React, { useContext, useEffect } from 'react';
import { ListContext } from '../context/ListContext';
import { BrowserRouter, useParams } from 'react-router-dom';

export default function ItemDetail(props) {
  let currentList = useContext(ListContext);

  let { id } = useParams();

  let currentItem = currentList.userList.find((item) => item.id == id);
  console.log(currentItem);

  // useEffect(() => {
  //   console.log(params)

  // }, [params])

  return <div>{currentItem.itemName}</div>;
}
