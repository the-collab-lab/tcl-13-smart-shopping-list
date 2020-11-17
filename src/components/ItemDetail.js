import React, { useContext, useEffect } from 'react';
import { ListContext } from '../context/ListContext';
import { BrowserRouter, useParams } from 'react-router-dom';

export default function ItemDetail(props) {
  let currentList = useContext(ListContext);
  // let currentItem = currentList.userList.filter(item => item.id = id)
  let { params } = useParams();
  console.log(props);

  // useEffect(() => {
  //   console.log(params)

  // }, [params])

  return <div>{/* {currentItem.itemName} */}</div>;
}
