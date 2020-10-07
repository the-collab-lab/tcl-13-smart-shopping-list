import React, { Component } from 'react';
import db from '../firebase/firebase';

export default class Counter extends Component {
  constructor() {
    super();
    //create state with a counter set to zero
    this.state = { currentCount: 0 };
  }

  //event handler function that adds count to state when the button is clicked
  handleChange = (event) => {
    event.preventDefault();

    this.setState((prevState) => ({
      currentCount: prevState.currentCount + 1,
    }));

    console.log(this.state.currentCount, 'the current state of the counter');
  };

  render() {
    return (
      <div>
        <button onClick={this.handleChange}> count</button>
      </div>
    );
  }
}
