import React, { Component } from 'react';
import './LiveFeed.css';
import LiveFeedHeader from './LiveFeed_Header';
import {WonoloToken} from '../config';
import WonoloerSignUp from './LiveFeed_Businesses/Signup_individuals';


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
  // create a server to store this
  console.log(WonoloToken);

  // get geoLocation
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
  })

}


  render() {
    const {gotlocation, longitude, latitude, peoplesignup, wonoloer1, amount1, job1, wonoloer2, amount2, job2, activejob, business1, businesspay1, business2, businesspay2 } = this.state;

    if(gotlocation === false){
      return(
        <div>
          Please wait a moment...
        </div>
      )
    }

    return (
      <nav className="navbar navbar-light bg-light">
        <LiveFeedHeader/>
      </nav>
    );
  }
}

export default LiveFeed;
