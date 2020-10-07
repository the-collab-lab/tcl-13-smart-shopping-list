import React, { Component } from 'react';

export default class counter extends Component {
  constructor() {
    super();
    this.state = { currentCount: 0 };
  }

  handleChange = (event) => {};

  render() {
    return (
      <div>
        <button>count</button>
      </div>
    );
  }
}
