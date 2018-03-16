import React, { Component } from 'react';
import LiveFeed from '../LiveFeed/LiveFeed/LiveFeed.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <LiveFeed />
        </div>
      </div>
    );
  }
}

export default App;
