import React, { Component } from 'react';
import './LiveFeed.css';
import LiveFeedHeader from './LiveFeed_Header'

class LiveFeed extends Component {
  state = {
    gotlocation: false,
    longitude: 0,
    latitude: 0,
    // area: '',
    peoplesignup: 0,
    wonoloer1: '',
    amount1: 0,
    job1: '',
    wonoloer2: '',
    amount2: 0,
    job2: '',
    activejob: 0,
    business1: '',
    businesspay1: 0,
    business2: '',
    businesspay2: 0,
  }



componentDidMount(){
  let getPosition = (options) => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

getPosition().
  then((position) =>{
    this.setState({
      gotlocation: true,
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    })

    console.log(position);
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);
  })
  // catch error here

}


  render() {
    // will replace in your area with live feed header
    return (
      <nav className="navbar navbar-light bg-light">
        <LiveFeedHeader/>
      </nav>
    );
  }
}

export default LiveFeed;
