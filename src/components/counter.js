import React, { Component } from 'react';
import db from '../firebase/firebase';

export default class Counter extends Component {
  constructor() {
    super();
    //create state with a counter set to zero
    this.state = {
      currentCount: 0,
    };
  }

  //event handler function that adds count to state when the button is clicked, and saves count to databse
  handleChange = (event) => {
    event.preventDefault();

    this.setState((prevState) => ({
      currentCount: prevState.currentCount + 1,
    }));

    console.log(this.state.currentCount, 'the current state of the counter');

    //Writing to DB
    db.collection('counter')
      .doc('count')
      .set({
        number: this.state.currentCount,
      })
      .then(function () {
        console.log('updated count!');
      })
      // catches & logs any errors
      .catch(function (error) {
        console.error('error updating count!', error);
      });
  };

  // event handler to read current count from database
  handleGet = (e) => {
    db.collection('counter')
      .doc('count')
      .get()
      .then((doc) => {
        const data = doc.data();
        console.log('current count in database is', data);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleChange}>Count</button>

        <button onClick={this.handleGet}>Get Count</button>
      </div>
    );
  }
}
