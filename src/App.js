import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Router from './components/Router';
import { db } from './lib/firebase';

function App() {
  const [token, setToken] = useState(null);
  const [userList, setUserList] = useState();

  //references the doc we are updating and changing
  const itemsRef = db.collection('items');

  // ON APP LOAD ---> get user token and set token state
  useEffect(() => {
    const tempToken = localStorage.getItem('tcl13-token');
    setToken(tempToken);
  }, []);

  // WHEN TOKEN IS SET/UPDATED ---> pull user list items from the database, set to state
  useEffect(() => {
    itemsRef
      .where('userToken', '==', token)
      .get()
      .then(function (querySnapshot) {
        let tempItems = [];
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
          tempItems.push(doc.data());
        });
        setUserList(tempItems);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }, [token]);

  // ADD ITEMS - pass this method to nested components to allow updating of item list
  const itemAddedHandler = (newItem) => {
    setUserList([...userList, newItem]);
  };

  // SET TOKEN - pass this method to nested components to set token to state
  const tokenCreatedHandler = (newToken) => {
    setToken(newToken);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to your Shopping List!</h1>
        </header>
        <Router
          token={token}
          itemsRef={itemsRef}
          userList={userList}
          itemAddedHandler={itemAddedHandler}
          tokenCreatedHandler={tokenCreatedHandler}
        />
        <Nav />
      </div>
    </BrowserRouter>
  );
}

export default App;
