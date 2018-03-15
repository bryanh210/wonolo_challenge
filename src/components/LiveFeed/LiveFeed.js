import React, { Component } from 'react';
import './LiveFeed.css';
import LiveFeedHeader from './LiveFeed_Header';
import {WonoloToken, googleAPIkey} from '../config';
import axios from 'axios';



class LiveFeed extends Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <LiveFeedHeader/>
      </nav>
    );
  }
}

export default LiveFeed;
