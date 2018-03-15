import React, { Component } from 'react';
import './LiveFeed.css';
import LiveFeedHeader from './LiveFeed_Header';
import {WonoloToken, googleAPIkey} from '../config';
import axios from 'axios';
import querystring from 'querystring';
import WonoloerSignUp from './LiveFeed_Businesses/Signup_individuals';


class LiveFeed extends Component {

    state = {
      city: '',
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


  componentWillMount() {
    let token = localStorage.getItem('Token');
    console.log(token)
  }

componentDidMount(){
  // get geoLocation
  if(navigator.geolocation){
    var getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
}


getPosition().
  then((position) =>{
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    // get the city name from long and lat
    console.log(googleAPIkey);
    const latlng = `${lat},${lng}`;
    let url = 'https://maps.googleapis.com/maps/api/geocode/json';
        console.log(latlng)
    let city;

    axios.get(url, {
      params: {
        latlng: latlng,
        key: googleAPIkey
      }
    }).then((response) =>{
        city = response.data.results[0]["address_components"][3]["long_name"];
          console.log(city)
        this.setState({
          gotlocation: true,
          city: city
        })
      })
      .catch(function (error) {
        console.log(`error is + ${error.response}`);
      });
  })

}


  render() {
    const {
      city,
      peoplesignup,
      wonoloer1,
      amount1,
      job1,
      wonoloer2,
      amount2,
      job2,
      activejob,
      business1,
      businesspay1,
      business2,
      businesspay2} = this.state;


    return (
      <nav className="navbar navbar-light bg-light">
        <LiveFeedHeader city={this.state.city}/>
        <WonoloerSignUp/>

      </nav>
    );
  }
}

export default LiveFeed;
