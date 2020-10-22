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

  // on component load...
  useEffect(() => {
    // pull user list items from the database, set to state
    itemsRef
      .where('userToken', '==', token)
      .get()
      .then(function (querySnapshot) {
        let tempItems = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          tempItems.push(doc.data());
        });
        setUserList(tempItems);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }, [token]);

  useEffect(() => {
    // get user token and set token state
    const tempToken = localStorage.getItem('tcl13-token');
    setToken(tempToken);
  }, []);

  const itemAddedHandler = (newItem) => {
    setUserList([...userList, newItem]);
  };

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
