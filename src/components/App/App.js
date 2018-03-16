import React, { Component } from 'react';
import LiveFeed from '../LiveFeed/LiveFeed/LiveFeed.js';
// import Header from '../Header/Header.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <div className="container">
              <LiveFeed />
        </div>
      </div>
    );
  }
}

export default App;
