const firebase = require('firebase/app');
const firestore = require('firebase/firestore');

//CONFIG
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCW_4CKCfT7pOFVscvM-2YE5iSViS9RaQo',
  authDomain: 'tcl-13-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-13-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-13-smart-shopping-list',
  storageBucket: 'tcl-13-smart-shopping-list.appspot.com',
  messagingSenderId: '1010512914119',
  appId: '1:1010512914119:web:6e5b311a81fe89114f00e2',
});

//Instantiate DB
const db = firebaseApp.firestore();

//Writing to DB
db.collection('groceries')
  .doc('fruit')
  .set({
    name: 'blueberries',
    price: 2.5,
    quantity: 0,
  })
  .then(function () {
    console.log('document successfully written!');
  })
  // catches & logs any errors
  .catch(function (error) {
    console.error('error writing document', error);
  });

//Reading from DB
db.collection('groceries')
  .doc('fruit')
  .get()
  .then((doc) => {
    const data = doc.data();
    console.log(data, 'document successfully read!');
  });

module.exports = db;
