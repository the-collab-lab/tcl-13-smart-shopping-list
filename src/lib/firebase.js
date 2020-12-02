// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
var firebaseConfig = {
  apiKey: 'AIzaSyCW_4CKCfT7pOFVscvM-2YE5iSViS9RaQo',
  authDomain: 'tcl-13-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-13-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-13-smart-shopping-list',
  storageBucket: 'tcl-13-smart-shopping-list.appspot.com',
  messagingSenderId: '1010512914119',
  appId: '1:1010512914119:web:6e5b311a81fe89114f00e2',
};

let fb = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { fb, db };
