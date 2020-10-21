import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Router from './components/Router';
import CheckToken from './components/CheckToken';
import { db } from './lib/firebase';

function App() {
  const [token, setToken] = useState();
  const [userList, setUserList] = useState();

  //references the doc we are updating and changing
  const itemsRef = db.collection('items');

  // on component load...
  useEffect(() => {
    // get user token and set token state
    const tempToken = localStorage.getItem('tcl13-token');
    setToken(tempToken);

    // pull user list items from the database, set to state
    itemsRef
      .where('userToken', '==', tempToken)
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
  }, []);

  const itemAddedHandler = (newItem) => {
    setUserList([...userList, newItem]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to your Shopping List!</h1>
        </header>
        <CheckToken token={token} />
        <Router
          token={token}
          itemsRef={itemsRef}
          userList={userList}
          itemAddedHandler={itemAddedHandler}
        />
        <Nav />
      </div>
    </BrowserRouter>
  );
}

export default App;
